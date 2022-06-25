---
date: 2022-06-24T16:00:00Z
category: Announcements
title: Enabling HSTS on the Node.js website
slug: hsts
layout: blog-post.hbs
author: Rich Trott
---

# Enabling HSTS on the Node.js website

We are enabling [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) on the Node.js website on or around July 13, 2022.

In [the words of Rod Vagg](https://github.com/nodejs/build/issues/2857#issuecomment-1163693008): "Hey, we're turning this on; it's not going to impact you though, so cool."

HSTS is a web security best practice. It helps prevent [MITM attacks](https://owasp.org/www-community/attacks/Manipulator-in-the-middle_attack) among other things.
