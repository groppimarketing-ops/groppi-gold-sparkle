
## المشكلة الجوهرية

الـ Admin panel في `/admin/articles` يخزّن المقالات في Supabase (`articles` table)، لكن:
- `src/pages/Blog.tsx` → يقرأ من `blogArticles.ts` (static array)
- `src/pages/BlogArticle.tsx` → يقرأ من `blogArticles.ts` (static array)

المقالات التي تُكتب من الـ admin لا تظهر على الموقع أبداً. يجب ربط الصفحتين بـ Supabase + دمج المقالات الـ static الحالية مع الـ dynamic.

---

## خطة التنفيذ: 4 خطوات

### 1. `src/hooks/useBlogArticles.ts` (جديد)
Hook يجلب المقالات المنشورة من Supabase مع `useQuery` للـ caching:
- يجلب: `id, slug, title_{lang}, excerpt_{lang}, content_{lang}, featured_image, published_at, created_at`
- يفلتر: `published = true`
- يرتب: `published_at DESC`
- يدمج مع الـ `blogArticles` static (للخلف توافقاً مع المقالات القديمة)

### 2. `src/pages/Blog.tsx` (تعديل)
- استبدال `blogArticles` static بـ `useBlogArticles()` hook
- عرض loading skeleton أثناء الجلب
- المقال الأول = featured, الباقي = grid
- الصور: تدعم featured_image من Supabase + image من static

### 3. `src/pages/BlogArticle.tsx` (تعديل)
- يجلب المقال بـ slug من Supabase أولاً، لو مش موجود يرجع للـ static
- `useQuery(['article', slug])` — مع caching
- يعرض المحتوى بناءً على اللغة النشطة: `content_{lang}` أو fallback لـ `content_nl` ثم `content_en`
- Title وExcerpt بنفس الـ pattern اللغوي

### 4. `src/components/seo/ArticleStructuredData.tsx` (جديد - اختياري ضمن نفس التطبيق)
- إضافة `Article` JSON-LD schema على صفحة كل مقال من قاعدة البيانات
- يتضمن: `author`, `datePublished`, `dateModified`, `image`, `headline`

---

## الفائدة العملية

```
الحالة الحالية:
  Admin يكتب مقالة → تُحفظ في DB → لا تظهر على الموقع ❌

بعد التطبيق:
  Admin يكتب مقالة → تُحفظ في DB → تظهر فوراً على /blog ✅
  المقالات الـ static القديمة تستمر في الظهور ✅
  كل مقالة جديدة = صفحة /blog/[slug] مستقلة ✅
  كل صفحة تعرض المحتوى بلغة الزائر ✅
```

---

## ملاحظات تقنية
- RLS على `articles` table: `select` متاح لـ `anon` (published articles فقط) — يجب التأكد أو إضافة Policy تسمح بقراءة `published = true` بدون auth
- الـ ArticleEditor الحالي يدعم: title/content/excerpt لـ 6 لغات (en, ar, nl, fr, de, es) — سنعرضها بنفس الترتيب
- الصور: المقالات الـ static عندها `image` كـ ES6 import، المقالات الـ DB عندها `featured_image` كـ URL string — نتعامل مع الاثنين
