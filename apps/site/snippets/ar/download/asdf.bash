# لدى asdf خطوات تثبيت تختلف حسب نظام التشغيل.
# راجع الوثائق الرسمية: https://asdf-vm.com/guide/getting-started.html.
# يستخدم هذا المثال صيغة أوامر asdf v0.16+.

# تثبيت إضافة Node.js:
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# تحميل و تثبيت Node.js:
asdf install nodejs ${props.release.version}

# تعيين Node.js كإصدار افتراضي عام:
asdf set --home nodejs ${props.release.version}
