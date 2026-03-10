
## الإجابة المباشرة: نعم، كل اللغات الـ 15 ستبقى ظاهرة تمامًا

### لماذا؟

بعد مراجعة الكود الحالي في `src/i18n/config.ts`، لاحظت أن الـ code splitting **لم يُطبَّق بعد** في المحادثة السابقة — الملف لا يزال يحتوي على static imports لجميع اللغات الـ 15 (السطور 6–20).

يعني الخطة التي شُرحت في المحادثة السابقة لم تنفَّذ بعد في الكود الفعلي.

---

### ماذا سيحدث بعد التطبيق؟

```text
قائمة اللغات في الـ Header (languages array)
          ↓ (لا تتغير أبدًا)
  15 لغة ظاهرة للمستخدم دائمًا
          ↓
  المستخدم يضغط على "Français"
          ↓
  يتنقل لـ /fr
          ↓
  LanguageLayout.tsx يلاحظ targetLang = 'fr'
          ↓
  i18n.changeLanguage('fr') يطلق dynamic import تلقائيًا
          ↓
  fr.json يُحمَّل (~80KB) في <300ms
          ↓
  الصفحة تظهر بالفرنسية كاملة
```

**قائمة الـ 15 لغة** في الـ Header تأتي من مصفوفة `languages` في `config.ts` — وهذه لا تتغير إطلاقًا بعد الـ code splitting. فقط طريقة تحميل الترجمات تتغير (on-demand بدل upfront).

---

### ضمانات سلامة اللغات

| الضمان | الحالة |
|---|---|
| nl (الافتراضية) | محمّلة مسبقًا — صفر تأخير |
| en (fallback) | محمّلة مسبقًا — ضروري للـ parseMissingKeyHandler |
| 13 لغة أخرى | تُحمَّل عند الطلب فقط — تظهر بعد <300ms |
| RTL (ar, ur) | تعمل طبيعيًا — applyDocumentDirection يُطبَّق مع changeLanguage |
| brand name GROPPI | لا يتغير — محمي في كل ملفات الترجمة |

---

### ماذا سيُطبَّق

1. **`src/i18n/config.ts`**: حذف 13 static import وتحويلها لـ dynamic import عبر i18next-resources-to-backend. nl وen يبقيان pre-bundled.
2. **`src/components/layout/LanguageLayout.tsx`**: إضافة `Suspense`-style loading state خفيف خلال <300ms عند تغيير اللغة (مرة واحدة فقط per session).

لا تغيير في: قائمة اللغات، الـ Header، الـ routing، الـ SEO، أو أي ملف آخر.
