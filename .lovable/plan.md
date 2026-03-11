
## المشكلتان اللي هحلهم في نفس الوقت:

### 1. Build Error — `@tiptap/extension-text-align` مش موجود
المكتبة دي مش مثبتة. الحل: **إزالة TextAlign تماماً** من الـ RichTextEditor لأنها مش ضرورية ومش موجودة في الـ dependencies الحالية، وإزالة أزرار الـ Alignment من الـ toolbar.

### 2. Password Reset Flow
مفيش أي صفحة reset كلها جديدة. هضيف:
- **"Forgot Password?" link** في صفحة Login — يفتح dialog صغير يطلب الإيميل
- **صفحة `/admin/reset-password`** — تظهر لما المستخدم يضغط على الرابط في الإيميل، فيها form لتغيير الباسوورد الجديد
- **Route** جديد في `App.tsx` لصفحة reset-password

### الخطوات:

1. **`src/components/admin/RichTextEditor.tsx`** — إزالة import الـ TextAlign وأزرار الـ Alignment (3 أزرار) وإزالته من extensions

2. **`src/pages/admin/Login.tsx`** — إضافة:
   - State جديد: `showForgotPassword`
   - Dialog بسيط فيه Input للإيميل وزر "Send Reset Link"
   - استدعاء `supabase.auth.resetPasswordForEmail()` مع `redirectTo: window.location.origin + '/admin/reset-password'`
   - رسالة نجاح: "Check your email for the reset link"
   - رابط "Forgot Password?" تحت زر Sign In

3. **`src/pages/admin/ResetPassword.tsx`** — صفحة جديدة:
   - تتحقق من `type=recovery` في الـ URL hash
   - فيها form لإدخال الباسوورد الجديد + confirm password
   - تستدعي `supabase.auth.updateUser({ password })`
   - بعد النجاح تحول المستخدم لـ `/admin/login`

4. **`src/App.tsx`** — إضافة route:
   ```
   <Route path="/admin/reset-password" element={<AdminResetPassword />} />
   ```
   (هذا route public — ما يحتاج ProtectedRoute)
