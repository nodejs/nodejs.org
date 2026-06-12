# لدى Docker تعليمات تثبيت محددة لكل نظام تشغيل.
# يرجى الرجوع إلى الوثائق الرسمية في https://docker.com/get-started/

# جلب صورة Node.js الخاصة بـ Docker:
docker pull node:${props.release.major}-slim

# أنشئ حاوية Node.js ثم فتح جلسة Shell داخلها
docker run -it --rm --entrypoint sh node:${props.release.major}-slim
