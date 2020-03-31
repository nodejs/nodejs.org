---
title: Working with Different Filesystems
layout: docs.hbs
---

# Working with Different Filesystems

Node.js exposes many features of the filesystem. But not all filesystems are alike. The following are suggested best practices to keep your code simple and safe when working with different filesystems.

## Filesystem Behavior

Before you can work with a filesystem, you need to know how it behaves. Different filesystems behave differently and have more or less features than others: case sensitivity, case insensitivity, case preservation, Unicode form preservation, timestamp resolution, extended attributes, inodes, Unix permissions, alternate data streams etc.

Be wary of inferring filesystem behavior from `process.platform`. For example, do not assume that because your program is running on Darwin that you are therefore working on a case-insensitive filesystem (HFS+), as the user may be using a case-sensitive filesystem (HFSX). Similarly, do not assume that because your program is running on Linux that you are therefore working on a filesystem which supports Unix permissions and inodes, as you may be on a particular external drive, USB or network drive which does not.

The operating system may not make it easy to infer filesystem behavior, but all is not lost. Instead of keeping a list of every known filesystem and behavior (which is always going to be incomplete), you can probe the filesystem to see how it actually behaves. The presence or absence of certain features which are easy to probe, are often enough to infer the behavior of other features which are more difficult to probe.

Remember that some users may have different filesystems mounted at various paths in the working tree.

## Avoid a Lowest Common Denominator Approach

You might be tempted to make your program act like a lowest common denominator filesystem, by normalizing all filenames to uppercase, normalizing all filenames to NFC Unicode form, and normalizing all file timestamps to say 1-second resolution. This would be the lowest common denominator approach.

Do not do this. You would only be able to interact safely with a filesystem which has the exact same lowest common denominator characteristics in every respect. You would be unable to work with more advanced filesystems in the way that users expect, and you would run into filename or timestamp collisions. You would most certainly lose and corrupt user data through a series of complicated dependent events, and you would create bugs that would be difficult if not impossible to solve.

What happens when you later need to support a filesystem that only has 2-second or 24-hour timestamp resolution? What happens when the Unicode standard advances to include a slightly different normalization algorithm (as has happened in the past)?

A lowest common denominator approach would tend to try to create a portable program by using only "portable" system calls. This leads to programs that are leaky and not in fact portable.

## Adopt a Superset Approach

Make the best use of each platform you support by adopting a superset approach. For example, a portable backup program should sync btimes (the created time of a file or folder) correctly between Windows systems, and should not destroy or alter btimes, even though btimes are not supported on Linux systems. The same portable backup program should sync Unix permissions correctly between Linux systems, and should not destroy or alter Unix permissions, even though Unix permissions are not supported on Windows systems.

Handle different filesystems by making your program act like a more advanced filesystem. Support a superset of all possible features: case-sensitivity, case-preservation, Unicode form sensitivity, Unicode form preservation, Unix permissions, high-resolution nanosecond timestamps, extended attributes etc.

Once you have case-preservation in your program, you can always implement case-insensitivity if you need to interact with a case-insensitive filesystem. But if you forego case-preservation in your program, you cannot interact safely with a case-preserving filesystem. The same is true for Unicode form preservation and timestamp resolution preservation.

If a filesystem provides you with a filename in a mix of lowercase and uppercase, then keep the filename in the exact case given. If a filesystem provides you with a filename in mixed Unicode form or NFC or NFD (or NFKC or NFKD), then keep the filename in the exact byte sequence given. If a filesystem provides you with a millisecond timestamp, then keep the timestamp in millisecond resolution.

When you work with a lesser filesystem, you can always downsample appropriately, with comparison functions as required by the behavior of the filesystem on which your program is running. If you know that the filesystem does not support Unix permissions, then you should not expect to read the same Unix permissions you write. If you know that the filesystem does not preserve case, then you should be prepared to see `ABC` in a directory listing when your program creates `abc`. But if you know that the filesystem does preserve case, then you should consider `ABC` to be a different filename to `abc`, when detecting file renames or if the filesystem is case-sensitive.

## Case Preservation

You may create a directory called `test/abc` and be surprised to see sometimes that `fs.readdir('test')` returns `['ABC']`. This is not a bug in Node. Node returns the filename as the filesystem stores it, and not all filesystems support case-preservation. Some filesystems convert all filenames to uppercase (or lowercase).

## Unicode Form Preservation

*Case preservation and Unicode form preservation are similar concepts. To understand why Unicode form should be preserved , make sure that you first understand why case should be preserved. Unicode form preservation is just as simple when understood correctly.*

Unicode can encode the same characters using several different byte sequences. Several strings may look the same, but have different byte sequences. When working with UTF-8 strings, be careful that your expectations are in line with how Unicode works. Just as you would not expect all UTF-8 characters to encode to a single byte, you should not expect several UTF-8 strings that look the same to the human eye to have the same byte representation. This may be an expectation that you can have of ASCII, but not of UTF-8.

You may create a directory called `test/café` (NFC Unicode form with byte sequence `<63 61 66 c3 a9>` and `string.length === 5`) and be surprised to see sometimes that `fs.readdir('test')` returns `['café']` (NFD Unicode form with byte sequence `<63 61 66 65 cc 81>` and `string.length === 6`). This is not a bug in Node. Node.js returns the filename as the filesystem stores it, and not all filesystems support Unicode form preservation.

HFS+, for example, will normalize all filenames to a form almost always the same as NFD form. Do not expect HFS+ to behave the same as NTFS or EXT4 and vice-versa. Do not try to change data permanently through normalization as a leaky abstraction to paper over Unicode differences between filesystems. This would create problems without solving any. Rather, preserve Unicode form and use normalization as a comparison function only.

## Unicode Form Insensitivity

Unicode form insensitivity and Unicode form preservation are two different filesystem behaviors often mistaken for each other. Just as case-insensitivity has sometimes been incorrectly implemented by permanently normalizing filenames to uppercase when storing and transmitting filenames, so Unicode form insensitivity has sometimes been incorrectly implemented by permanently normalizing filenames to a certain Unicode form (NFD in the case of HFS+) when storing and transmitting filenames. It is possible and much better to implement Unicode form insensitivity without sacrificing Unicode form preservation, by using Unicode normalization for comparison only.

## Comparing Different Unicode Forms

Node.js provides `string.normalize('NFC' / 'NFD')` which you can use to normalize a UTF-8 string to either NFC or NFD. You should never store the output from this function but only use it as part of a comparison function to test whether two UTF-8 strings would look the same to the user.

You can use `string1.normalize('NFC') === string2.normalize('NFC')` or `string1.normalize('NFD') === string2.normalize('NFD')` as your comparison function. Which form you use does not matter.

Normalization is fast but you may want to use a cache as input to your comparison function to avoid normalizing the same string many times over. If the string is not present in the cache then normalize it and cache it. Be careful not to store or persist the cache, use it only as a cache.

Note that using `normalize()` requires that your version of Node.js include ICU (otherwise `normalize()` will just return the original string). If you download the latest version of Node.js from the website then it will include ICU.

## Timestamp Resolution

You may set the `mtime` (the modified time) of a file to `1444291759414` (millisecond resolution) and be surprised to see sometimes that `fs.stat` returns the new mtime as `1444291759000` (1-second resolution) or `1444291758000` (2-second resolution). This is not a bug in Node. Node.js returns the timestamp as the filesystem stores it, and not all filesystems support nanosecond, millisecond or 1-second timestamp resolution. Some filesystems even have very coarse resolution for the atime timestamp in particular, e.g. 24 hours for some FAT filesystems.

## Do Not Corrupt Filenames and Timestamps Through Normalization

Filenames and timestamps are user data. Just as you would never automatically rewrite user file data to uppercase the data or normalize `CRLF` to `LF` line-endings, so you should never change, interfere or corrupt filenames or timestamps through case / Unicode form / timestamp normalization. Normalization should only ever be used for comparison, never for altering data.

Normalization is effectively a lossy hash code. You can use it to test for certain kinds of equivalence (e.g. do several strings look the same even though they have different byte sequences) but you can never use it as a substitute for the actual data. Your program should pass on filename and timestamp data as is.

Your program can create new data in NFC (or in any combination of Unicode form it prefers) or with a lowercase or uppercase filename, or with a 2-second resolution timestamp, but your program should not corrupt existing user data by imposing case / Unicode form / timestamp normalization. Rather, adopt a superset approach and preserve case, Unicode form and timestamp resolution in your program. That way, you will be able to interact safely with filesystems which do the same.

## Use Normalization Comparison Functions Appropriately

Make sure that you use case / Unicode form / timestamp comparison functions appropriately. Do not use a case-insensitive filename comparison function if you are working on a case-sensitive filesystem. Do not use a Unicode form insensitive comparison function if you are working on a Unicode form sensitive filesystem (e.g. NTFS and most Linux filesystems which preserve both NFC and NFD or mixed Unicode forms). Do not compare timestamps at 2-second resolution if you are working on a nanosecond timestamp resolution filesystem.

## Be Prepared for Slight Differences in Comparison Functions

Be careful that your comparison functions match those of the filesystem (or probe the filesystem if possible to see how it would actually compare). Case-insensitivity for example is more complex than a simple `toLowerCase()` comparison. In fact, `toUpperCase()` is usually better than `toLowerCase()` (since it handles certain foreign language characters differently). But better still would be to probe the filesystem since every filesystem has its own case comparison table baked in.

As an example, Apple's HFS+ normalizes filenames to NFD form but this NFD form is actually an older version of the current NFD form and may sometimes be slightly different from the latest Unicode standard's NFD form. Do not expect HFS+ NFD to be exactly the same as Unicode NFD all the time.
