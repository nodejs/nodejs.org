---
title: 여러 파일 시스템에서 작업하기
layout: docs.hbs
---

<!--
# Working with Different Filesystems

Node exposes many features of the filesystem. But not all filesystems are alike.
The following are suggested best practices to keep your code simple and safe
when working with different filesystems.
-->

# 여러 파일 시스템에서 작업하기

Node는 파일 시스템에서 다양한 기능을 제공합니다. 하지만 모든 파일 시스템이 같은 것은 아닙니다.
여러 파일 시스템에서 동작할 때 코드를 간단하고 안전하게 유지하기 위한 모범 예제를
아래에서 제시합니다.

<!--
## Filesystem Behavior

Before you can work with a filesystem, you need to know how it behaves.
Different filesystems behave differently and have more or less features than
others: case sensitivity, case insensitivity, case preservation, Unicode form
preservation, timestamp resolution, extended attributes, inodes, Unix
permissions, alternate data streams etc.

Be wary of inferring filesystem behavior from `process.platform`. For example,
do not assume that because your program is running on Darwin that you are
therefore working on a case-insensitive filesystem (HFS+), as the user may be
using a case-sensitive filesystem (HFSX). Similarly, do not assume that because
your program is running on Linux that you are therefore working on a filesystem
which supports Unix permissions and inodes, as you may be on a particular
external drive, USB or network drive which does not.

The operating system may not make it easy to infer filesystem behavior, but all
is not lost. Instead of keeping a list of every known filesystem and behavior
(which is always going to be incomplete), you can probe the filesystem to see
how it actually behaves. The presence or absence of certain features which are
easy to probe, are often enough to infer the behavior of other features which
are more difficult to probe.

Remember that some users may have different filesystems mounted at various paths
in the working tree.
-->

## 파일 시스템의 동작

파일 시스템을 사용하기 전에 파일 시스템이 어떻게 동작하는지 알아야 합니다. 다른 파일 시스템은
다르게 동작하고 파일 시스템마다 기능이 더 많거나 적거나 합니다. 예를 들어 대소문자 구분/비구분,
대소문자 유지, 유니코드 형식 보존, 타임스탬프 처리방법, 속성 확장, 아이노드, 유닉스 권한,
데이터 스트림 대안 등이 있습니다.

`process.platform`에서 파일 시스템의 동작을 추측하는 것을 주의해야 합니다. 예를 들어 사용자가
대소문자를 구별하는 파일 시스템(HFSX)를 사용할 수도 있으므로 프로그램이 Darwin에서 동작하고 있다고
대소문자를 구별하지 않는 파일 시스템(HFS+)을 사용한다고 가정해서는 안 됩니다. 유사하게 유닉스 권한이나
아이노드를 지원하지 않는 외장 드라이브나 USB, 네트워크 드라이브를 사용할 수도 있으므로 Linux에서
돌아가고 있다고 파일 시스템이 유닉스 권한이나 아이노드를 지원한다고 가정해서는 안 됩니다.

운영체제로 파일 시스템의 동작을 쉽게 예상할 수 없지만 모두 필요 없는 것은 아닙니다. 알려진 모든
파일 시스템과 동작의 목록을 관리하는 대신(절대 완료된 목록을 갖지 못할 것입니다.) 파일 시스템이
실제로 어떻게 동작하는지 확인할 수 있습니다. 쉽게 확인할 수 있는 특정 기능의 존재 여부 만으로도
확인하기 더 어려운 다른 기능의 동작을 예측하기에 대부분 충분합니다.

일부 사용자는 워킹 트리의 다양한 경로에 여러 가지 파일 시스템을 마운트해서
사용할 수도 있다는 것을 명심하세요.

<!--
## Avoid a Lowest Common Denominator Approach

You might be tempted to make your program act like a lowest common denominator
filesystem, by normalizing all filenames to uppercase, normalizing all filenames
to NFC Unicode form, and normalizing all file timestamps to say 1-second
resolution. This would be the lowest common denominator approach.

Do not do this. You would only be able to interact safely with a filesystem
which has the exact same lowest common denominator characteristics in every
respect. You would be unable to work with more advanced filesystems in the way
that users expect, and you would run into filename or timestamp collisions. You
would most certainly lose and corrupt user data through a series of complicated
dependent events, and you would create bugs that would be difficult if not
impossible to solve.

What happens when you later need to support a filesystem that only has 2-second
or 24-hour timestamp resolution? What happens when the Unicode standard advances
to include a slightly different normalization algorithm (as has happened in the
past)?

A lowest common denominator approach would tend to try to create a portable
program by using only "portable" system calls. This leads to programs that are
leaky and not in fact portable.
-->

## 최소 공통분모 접근 피하기

모든 파일명을 대문자로 정규화하고 모든 파일명을 NFC 유니코드 형식으로 정규화하고 파일의 타임스탬프를
1초 해상도로 정규화함으로써 파일 시스템의 최소 공통분모로 프로그램이 동작하게 하고 싶을 수도 있습니다.
이를 최소 공통분모 접근이라고 합니다.

이렇게 하면 안 됩니다. 모든 부분에서 최소 공통분모의 특성과 정확히 같은 파일 시스템에서만 안전하게
사용할 수 있을 것입니다. 더 향상된 파일 시스템에서는 사용자가 기대하는 방법으로 동작하지 않을 것이고
파일 시스템이나 타임스탭프 충돌이 발생할 것입니다. 복잡하게 의존하는 이벤트 사이에서 사용자 데이터를
잃어버리거나 훼손할 가능성이 아주 크고 해결할 수 없거나 어려운 버그를 만들 것입니다.

2초나 24시간 타임스탬프 해상도만 가진 파일 시스템을 나중에 지원해야 한다면 어떻게 할 것입니까?
유니코드 표준이 정규화 알고리즘과 약간 다른 내용을 포함하게 된다면(이런 일은 과거에도 일어났습니다.)
어떻게 할 것입니까?

최소 공통분모 접근은 "이식성 있는(portable)" 시스템 호출만 사용해서 이식성 있는 프로그램을 만들려고
하는 경향이 있습니다. 이는 누출되기 쉽고 실제로는 이식성이 없는 프로그램이 됩니다.

<!--
## Adopt a Superset Approach

Make the best use of each platform you support by adopting a superset approach.
For example, a portable backup program should sync btimes (the created time of a
file or folder) correctly between Windows systems, and should not destroy or
alter btimes, even though btimes are not supported on Linux systems. The same
portable backup program should sync Unix permissions correctly between Linux
systems, and should not destroy or alter Unix permissions, even though Unix
permissions are not supported on Windows systems.

Handle different filesystems by making your program act like a more advanced
filesystem. Support a superset of all possible features: case-sensitivity,
case-preservation, Unicode form sensitivity, Unicode form preservation, Unix
permissions, high-resolution nanosecond timestamps, extended attributes etc.

Once you have case-preservation in your program, you can always implement
case-insensitivity if you need to interact with a case-insensitive filesystem.
But if you forego case-preservation in your program, you cannot interact safely
with a case-preserving filesystem. The same is true for Unicode form
preservation and timestamp resolution preservation.

If a filesystem provides you with a filename in a mix of lowercase and
uppercase, then keep the filename in the exact case given. If a filesystem
provides you with a filename in mixed Unicode form or NFC or NFD (or NFKC or
NFKD), then keep the filename in the exact byte sequence given. If a filesystem
provides you with a millisecond timestamp, then keep the timestamp in
millisecond resolution.

When you work with a lesser filesystem, you can always downsample appropriately,
with comparison functions as required by the behavior of the filesystem on which
your program is running. If you know that the filesystem does not support Unix
permissions, then you should not expect to read the same Unix permissions you
write. If you know that the filesystem does not preserve case, then you should
be prepared to see `ABC` in a directory listing when your program creates `abc`.
But if you know that the filesystem does preserve case, then you should consider
`ABC` to be a different filename to `abc`, when detecting file renames or if the
filesystem is case-sensitive.
-->

## 슈퍼셋 접근 도입

슈퍼셋 접근으로 지원하는 각 플랫폼을 최상으로 사용하게 하세요. 예를 들어, 이식성 있는 백업 프로그램은
리눅스 시스템에서는 btimes을 지원하지 않더라도 윈도우 시스템에서 btimes(파일이나 폴더의 생성 시간)를
제대로 동기화해야 하고 btimes를 없애거나 바꾸지 않아야 합니다. 같은 이식성 있는 백업 프로그램은
리눅스 시스템에서 유닉스 권한을 제대로 동기화해야 하고 윈도우 시스템이 유닉스 권한을 지원하지 않더라도
유닉스 권한을 없애거나 바꾸면 안 됩니다.

더 진보된 파일 시스템처럼 동작하게 프로그램을 만들어서 여러 파일 시스템을 처리하세요. 대소문자 구별,
대소문자 유지, 유니코드 형식 구별, 유니코드 형식 보존, 유닉스 권한, 고행상도 나노초 타임스탬프,
확장 속성 등 가능한 모든 기능의 슈퍼셋을 지원하세요.

프로그램이 대소문자를 보존하고 있다면 대소문자를 구별하지 않는 파일 시스템을 사용해야 할 때 항상
대소문자를 구별하지 않도록 구현할 수 있습니다. 하지만 프로그램이 대소문자를 유지하지 않는다면 대소문자를
유지하는 파일 시스템에서 안전하게 사용할 수 없을 것입니다. 유니코드 형식 보존과 타임스탬프 해상도
보존에서도 마찬가지입니다.

파일 시스템에 대소문자가 섞인 파일명을 준다면 받은 그대로의 파일명을 유지하세요. 파일 시스템이
유니코드 형식이나 NFC, NFD(혹은 NFKC나 NFKD)가 섞인 파일명을 준다면 주어진 바이트 순서
그대로의 파일명을 유지하세요. 파일 시스템이 밀리 초 단위의 타임스탬프를 준다면 밀리 초단위의 해상도로
타임스탬프를 유지하세요.

프로그램이 돌아가는 파일 시스템의 동작에서 필요로 하는 기능과 비교해서 기능이 더 부족한 파일 시스템에서
동작할 때 언제나 적절하게 기능을 줄일 수 있습니다. 파일 시스템 유닉스 권한을 지원하지 않는 것을 알고
있다면 작성한 유닉스 권한과 같은 권한을 읽으려고 하면 안 됩니다. 파일 시스템이 대소문자를 보존하지
않는 것을 알고 있지만, 프로그램이 `ab`를 생성할 때 디렉터리 목록에서 `ABC`를 볼 대비를 해야 합니다.
하지만 파일 시스템이 대소문자를 유지하는 것을 알고 있다면 파일명 변경을 감지하거나 파일 시스템에
대소문자를 구별 하는 경우 `ABC`와 `abc`를 다른 파일명으로 간주해야 합니다.

<!--
## Case Preservation

You may create a directory called `test/abc` and be surprised to see sometimes
that `fs.readdir('test')` returns `['ABC']`. This is not a bug in Node. Node
returns the filename as the filesystem stores it, and not all filesystems
support case-preservation. Some filesystems convert all filenames to uppercase
(or lowercase).
-->

## 대소문자 보존

`test/abc`라는 디렉터리를 생성한 뒤 `fs.readdir('test')`가 `['ABC']`를 반환할 때 놀랄 수도
있습니다. 이는 Node의 버그가 아닙니다. Node는 파일 시스템이 저장한 파일명을 반환하고 모든
파일 시스템이 대소문자를 보존하는 것은 아닙니다. 어떤 파일 시스템은 모든 파일명을
대문자(혹은 소문자)로 바꿉니다.

<!--
## Unicode Form Preservation

*Case preservation and Unicode form preservation are similar concepts. To
understand why Unicode form should be preserved , make sure that you first
understand why case should be preserved. Unicode form preservation is just as
simple when understood correctly.*

Unicode can encode the same characters using several different byte sequences.
Several strings may look the same, but have different byte sequences. When
working with UTF-8 strings, be careful that your expectations are in line with
how Unicode works. Just as you would not expect all UTF-8 characters to encode
to a single byte, you should not expect several UTF-8 strings that look the same
to the human eye to have the same byte representation. This may be an
expectation that you can have of ASCII, but not of UTF-8.

You may create a directory called `test/café` (NFC Unicode form with byte
sequence `<63 61 66 c3 a9>` and `string.length === 5`) and be surprised to see
sometimes that `fs.readdir('test')` returns `['café']` (NFD Unicode form with
byte sequence `<63 61 66 65 cc 81>` and `string.length === 6`). This is not a
bug in Node. Node returns the filename as the filesystem stores it, and not all
filesystems support Unicode form preservation.

HFS+, for example, will normalize all filenames to a form almost always the same
as NFD form. Do not expect HFS+ to behave the same as NTFS or EXT4 and
vice-versa. Do not try to change data permanently through normalization as a
leaky abstraction to paper over Unicode differences between filesystems. This
would create problems without solving any. Rather, preserve Unicode form and use
normalization as a comparison function only.
-->

## 유니코드 형식 보존

*대소문자 보존과 유니코드 형식 보존은 비슷한 개념입니다. 유니코드 형식을 보존해야 하는 이유를
이해하려면 먼저 왜 대소문자를 보존해야 하는지를 확실히 이해해야 합니다. 제대로 이해한다면
유니코드 형식 보존은 아주 간단합니다.*

유니코드는 여러 가지 다른 바이트 순서를 사용해서 같은 문자를 인코딩할 수 있습니다. 여러 가지 문자열이
같아 보일 수 있지만 다른 바이트 순서를 가질 수 있습니다. UTF-8 문자열에서 줄과 관련해서 유니코드가
동작하는 방식에 대해서 조심해야 합니다. 모든 UTF-8 문자를 하나의 바이트로 인코딩되기를 기대하면
안 되듯이 사람 눈에는 같아 보이는 여러 가지 UTF-8 문자열이 같은 바이트 표현을 한다고 생각해서는
안 됩니다. ASCII에서는 이런 기대를 해도 되지만 UTF-8에서는 안 됩니다.

`test/café`라는 디렉터리(`<63 61 66 c3 a9>`의 바이트 순서와 `string.length === 5`를 가진
NFC 유니코드 형식)를 만들고 `fs.readdir('test')`가 `['café']`(`<63 61 66 65 cc 81>`의
바이트 순서와 `string.length === 6`를 가진 NFD 유니코드 형식)을 반환하면 놀랄 수도 있습니다.
이는 Node의 버그가 아닙니다. Node는 파일 시스템이 저장한 파일명을 반환하는데 모든 파일 시스템이
유니코드 형식을 보존하는 것은 아닙니다.

예를 들어 HFS+는 거의 항상 모든 파일명을 NFD 형식으로 정규화할 것입니다. HFS+가 NTFS나 EXT4처럼
동작하기를 기대해도 안 되고 그 반대를 기대해도 안 됩니다. 파일 시스템마다 다른 유니코드를 감추려고 취약한
추상화로 정규화함으로써 데이터를 항상 바꾸려고 하지 마세요. 이는 아무런 문제도 해결하지 못하고 문제를
만들어 낼 것입니다. 대신 유니코드 형식을 보존하고 비교함수처럼 정규화만 사용하세요.

<!--
## Unicode Form Insensitivity

Unicode form insensitivity and Unicode form preservation are two different
filesystem behaviors often mistaken for each other. Just as case-insensitivity
has sometimes been incorrectly implemented by permanently normalizing filenames
to uppercase when storing and transmitting filenames, so Unicode form
insensitivity has sometimes been incorrectly implemented by permanently
normalizing filenames to a certain Unicode form (NFD in the case of HFS+) when
storing and transmitting filenames. It is possible and much better to implement
Unicode form insensitivity without sacrificing Unicode form preservation, by
using Unicode normalization for comparison only.
-->

## 유니코드 형식 비구별

유니코드 형식을 비구별과 유니코드 형식 보존은 종종 헷갈리는 파일 시스템의 다른 두 가지 동작입니다.
때로 대소문자 비구별을 파일명을 저장하고 전송할 때 항상 대문자로 정규화하게 잘못 구현하듯이 유니코드
형식 비구별도 종종 파일명을 저장하고 전송할 때 파일명을 특정 유니코드 형식(HFS+의 경우 NFD)으로
항상 정규화하도록 잘못 구현하곤 합니다. 비교할 때만 유니코드를 정규화함으로써 유니코드 형식은
보존하면서도 유니코드 형식 비구별을 구현하는 것이 가능하고 이 방법이 훨씬 좋습니다.

<!--
## Comparing Different Unicode Forms

Node provides `string.normalize('NFC' / 'NFD')` which you can use to normalize a
UTF-8 string to either NFC or NFD. You should never store the output from this
function but only use it as part of a comparison function to test whether two
UTF-8 strings would look the same to the user.

You can use `string1.normalize('NFC') === string2.normalize('NFC')` or
`string1.normalize('NFD') === string2.normalize('NFD')` as your comparison
function. Which form you use does not matter.

Normalization is fast but you may want to use a cache as input to your
comparison function to avoid normalizing the same string many times over. If the
string is not present in the cache then normalize it and cache it. Be careful
not to store or persist the cache, use it only as a cache.

Note that using `normalize()` requires that your version of Node include ICU
(otherwise `normalize()` will just return the original string). If you download
the latest version of Node from the website then it will include ICU.
-->

## 다른 유니코드 형식의 비교

Node는 UTF-8 문자열을 NFC나 NFD로 정규화하는 데 사용할 수 있는
`string.normalize('NFC' / 'NFD')`를 제공합니다. 이 함수의 반환 값은 절대 저장하면 안 되고
두 UTF-8 문자열이 사용자에게 같아 보이는지 확인하는 비교 함수에서만 사용해야 합니다.

비교 함수로 `string1.normalize('NFC') === string2.normalize('NFC')`나
`string1.normalize('NFD') === string2.normalize('NFD')`를 사용할 수 있습니다.
어느 방법을 사용하든 상관없습니다.

정규화는 빠르지만 같은 문자열을 여러 번 정규화하는 것을 피하고자 비교함수의 입력값에 캐시를
사용하려고 할 수 있습니다. 캐시에 문자열이 없다면 정규화하고 이를 저장합니다. 캐시를 저장하거나
유지하지 않도록 조심하고 캐시로써만 사용해야 합니다.

`normalize()`를 사용하려면 사용하는 Node 버전에 ICU를 포함해야 합니다.(그렇지 않으면
`normalize()`가 원래의 문자열을 그냥 반환할 것입니다.) 웹사이트에서 최신 버전의 Node를
다운로드 했다면 ICU가 포함되어 있습니다.

<!--
## Timestamp Resolution

You may set the `mtime` (the modified time) of a file to `1444291759414`
(millisecond resolution) and be surprised to see sometimes that `fs.stat`
returns the new mtime as `1444291759000` (1-second resolution) or
`1444291758000` (2-second resolution). This is not a bug in Node. Node returns
the timestamp as the filesystem stores it, and not all filesystems support
nanosecond, millisecond or 1-second timestamp resolution. Some filesystems even
have very coarse resolution for the atime timestamp in particular, e.g. 24 hours
for some FAT filesystems.
-->

## 타임스탬프 해상도

파일의 `mtime`(수정시간)을 `1444291759414`(밀리 초 해상도)로 설정했는데 `fs.stat`가 mtime을
`1444291759000`(1초 해상도)나 `1444291758000`(2초 해상도)로 반환하는 것에 당황할 수도
있습니다. 이는 Node의 버그가 아닙니다. Node는 파일 시스템이 저장한 타임스탬프를 반환하고 모든
파일 시스템이 나노초, 밀리 초, 1초 타임스탬프 해상도를 지원하는 것은 아닙니다. 일부 파일 시스템은
atime 타임스탬프에 아주 거친 해상도를 쓰기도 합니다.(예를 들어 일부 FAT 파일 시스템은 24시간입니다.)

<!--
## Do Not Corrupt Filenames and Timestamps Through Normalization

Filenames and timestamps are user data. Just as you would never automatically
rewrite user file data to uppercase the data or normalize `CRLF` to `LF`
line-endings, so you should never change, interfere or corrupt filenames or
timestamps through case / Unicode form / timestamp normalization. Normalization
should only ever be used for comparison, never for altering data.

Normalization is effectively a lossy hash code. You can use it to test for
certain kinds of equivalence (e.g. do several strings look the same even though
they have different byte sequences) but you can never use it as a substitute for
the actual data. Your program should pass on filename and timestamp data as is.

Your program can create new data in NFC (or in any combination of Unicode form
it prefers) or with a lowercase or uppercase filename, or with a 2-second
resolution timestamp, but your program should not corrupt existing user data by
imposing case / Unicode form / timestamp normalization. Rather, adopt a superset
approach and preserve case, Unicode form and timestamp resolution in your
program. That way, you will be able to interact safely with filesystems which do
the same.
-->

## 정규화로 파일명과 타임스탬프를 훼손시키지 마세요.

파일명과 타임스탬프는 사용자 데이터입니다. 데이터를 대문자로 바꾸거나 `CRLF`나 `LF`같은 줄 끝 문자를
정규화해서 사용자 파일 데이터를 자동으로 재작성하지 말아야 하듯이 대소문자 / 유니코드 형식 / 타임스탬프
정규화로 파일명이나 타임스탬프를 절대 변경하거나 훼손시키지 않아야 합니다. 정규화는 비교할 때만 사용하고
데이터를 바꾸면 안 됩니다.

정규화는 효율적인 손실을 주는 해시 코드입니다. 어떤 종류든 동등한지 검사할 때 사용할 수 있지만(여러
문자열이 다른 바이트 순서를 가지고 있더라도 같아 보이는지 등) 실제 데이터를 교체하는 데 사용할 수는
없습니다. 프로그램은 있는 그대로의 파일명과 타임스탬프를 전달해야 합니다.

프로그램이 NFC(또는 선호하는 어떤 유니코드 형식의 조합이더라도)에서, 혹은 소문자나 대문자 파일명으로,
혹은 2초 해상도 타임스탬프로 새로운 데이터를 만들 수 있지만, 대소문자 / 유니코드 형식 / 타임스탬프
정규화를 적용해서 기존의 사용자 데이터를 훼손시키면 안됩니다. 대신 슈퍼셋 접근을 적용하고 프로그램에서
대소문자, 유니코드 형식, 타임스탬프 해상도를 보존하세요. 이 방법을 적용하면 같은 동작을 하는
파일 시스템을 안정하게 사용할 수 있습니다.

<!--
## Use Normalization Comparison Functions Appropriately

Make sure that you use case / Unicode form / timestamp comparison functions
appropriately. Do not use a case-insensitive filename comparison function if you
are working on a case-sensitive filesystem. Do not use a Unicode form
insensitive comparison function if you are working on a Unicode form sensitive
filesystem (e.g. NTFS and most Linux filesystems which preserve both NFC and NFD
or mixed Unicode forms). Do not compare timestamps at 2-second resolution if you
are working on a nanosecond timestamp resolution filesystem.
-->

## 정규화 비교 함수를 적절하게 사용하세요.

대소문자 / 유니코드 형식 / 타임스탬프 비교 함수를 적절하게 사용하세요. 대소문자를 구별하는
파일 시스템에서 동작한다면 대소문자를 구별하지 않는 파일명 비교 함수를 사용하지 말아야 합니다. 유니코드
형식을 구별하는 파일 시스템에서 동작한다면(예를 들어 NFC와 NFD를 둘 다 보존하거나 혼합된 유니코드
형식을 사용하는 NTFS와 대부분의 리눅스 파일 시스템) 유니코드 형식을 구별하지 않는 비교 함수를
사용하지 마세요. 나노초 타임스탬프 해상도를 가진 파일 시스템에서 동작한다면 2초 해상도로 타임스탬프를
비교하지 마세요.

<!--
## Be Prepared for Slight Differences in Comparison Functions

Be careful that your comparison functions match those of the filesystem (or
probe the filesystem if possible to see how it would actually compare).
Case-insensitivity for example is more complex than a simple `toLowerCase()`
comparison. In fact, `toUpperCase()` is usually better than `toLowerCase()`
(since it handles certain foreign language characters differently). But better
still would be to probe the filesystem since every filesystem has its own case
comparison table baked in.

As an example, Apple's HFS+ normalizes filenames to NFD form but this NFD form
is actually an older version of the current NFD form and may sometimes be
slightly different from the latest Unicode standard's NFD form. Do not expect
HFS+ NFD to be exactly the same as Unicode NFD all the time.
-->

## 비교함수에 있는 약간의 차이점에 대비하세요.

비교함수로 파일 시스템에서 일치 여부를 판단할 때는 주의해야 합니다.(또는 실제로 파일 시스템이 어떻게
비교하는지 볼 수 있다면 파일 시스템을 탐구해야 합니다.) 예를 들어 대소문자 구분없이 비교하는 것은 단순한
`toLowerCase()` 비교보다 훨씬 복잡합니다. 사실 `toUpperCase()`가 `toLowerCase()`보다
보통 더 좋습니다.(`toLowerCase()`가 특정 외국어 문자를 다르게 다루기 때문입니다.) 하지만 모든
파일 시스템은 자신만의 대소문자 비교 테이블을 가지고 있으므로 파일시스템을 탐구하는 것이 좋습니다.

예를 들어, Apple의 HFS+는 파일 이름을 NFD 형식으로 정규화 하지만 실제 이 NFD 형식은 현재 NFD 형식의
이전 버전이며 최신 유니코드 표준의 NFD 형식과는 조금 다를 수 있습니다. HFS+ NFD가 유니코드의 NFD와 항상
같을 거라고 기대하면 안 됩니다.
