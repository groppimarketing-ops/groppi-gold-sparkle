/**
 * TASK 5E — Translate contact + blog sections for zh/hi/bn
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const LOCALES_DIR = resolve(__dirname, '../i18n/locales');

function deepSet(obj: any, path: string[], value: any) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!cur[path[i]] || typeof cur[path[i]] !== 'object') cur[path[i]] = {};
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
}

function deepGet(obj: any, path: string[]): any {
  let cur = obj;
  for (const k of path) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = cur[k];
  }
  return cur;
}

// ─── CONTACT section translations ───
const contactZh: Record<string, string> = {
  "contact.title": "联系我们",
  "contact.subtitle": "交流合作",
  "contact.intro": "您有项目想法或希望提升数字化影响力？联系我们进行免费咨询。",
  "contact.mobileLabel": "手机",
  "contact.officeLabel": "办公室",
  "contact.hoursLabel": "营业时间",
  "contact.hoursValue": "周一至周五：上午9:00 - 下午6:00",
  "contact.description": "我们期待您的来信。填写表单，我们将尽快回复。",
  "contact.name": "姓名",
  "contact.email": "电子邮箱",
  "contact.phone": "电话号码",
  "contact.company": "公司名称",
  "contact.subject": "主题",
  "contact.message": "您的留言",
  "contact.send": "发送",
  "contact.sending": "发送中...",
  "contact.success": "消息发送成功！我们将尽快与您联系。",
  "contact.error": "出现错误。请重试或致电联系我们。",
  "contact.address": "地址",
  "contact.phoneLabel": "电话",
  "contact.emailLabel": "邮箱",
  "contact.landline": "固定电话",
  "contact.mobile": "手机",
  "contact.rateLimited": "请求过于频繁，请稍后再试。",
};

const contactHi: Record<string, string> = {
  "contact.title": "संपर्क करें",
  "contact.subtitle": "बात करें",
  "contact.intro": "क्या आपके मन में कोई प्रोजेक्ट है या आप अपनी डिजिटल उपस्थिति मजबूत करना चाहते हैं? बिना किसी बाध्यता के हमसे संपर्क करें।",
  "contact.mobileLabel": "मोबाइल",
  "contact.officeLabel": "कार्यालय",
  "contact.hoursLabel": "कार्य समय",
  "contact.hoursValue": "सोम - शुक्र: सुबह 9:00 - शाम 6:00",
  "contact.description": "हम आपसे सुनना चाहते हैं। फॉर्म भरें और हम जल्द से जल्द संपर्क करेंगे।",
  "contact.name": "नाम",
  "contact.email": "ईमेल पता",
  "contact.phone": "फ़ोन नंबर",
  "contact.company": "कंपनी",
  "contact.subject": "विषय",
  "contact.message": "आपका संदेश",
  "contact.send": "भेजें",
  "contact.sending": "भेजा जा रहा है...",
  "contact.success": "संदेश सफलतापूर्वक भेजा गया! हम जल्द से जल्द संपर्क करेंगे।",
  "contact.error": "कुछ गलत हो गया। कृपया पुनः प्रयास करें या फ़ोन से संपर्क करें।",
  "contact.address": "पता",
  "contact.phoneLabel": "फ़ोन",
  "contact.emailLabel": "ईमेल",
  "contact.landline": "लैंडलाइन",
  "contact.mobile": "मोबाइल",
  "contact.rateLimited": "बहुत अधिक अनुरोध। कृपया बाद में पुनः प्रयास करें।",
};

const contactBn: Record<string, string> = {
  "contact.title": "যোগাযোগ করুন",
  "contact.subtitle": "কথা বলুন",
  "contact.intro": "আপনার কি কোনো প্রকল্প আছে বা ডিজিটাল উপস্থিতি শক্তিশালী করতে চান? বিনামূল্যে পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন।",
  "contact.mobileLabel": "মোবাইল",
  "contact.officeLabel": "অফিস",
  "contact.hoursLabel": "কার্যকালীন সময়",
  "contact.hoursValue": "সোম - শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০",
  "contact.description": "আমরা আপনার কথা শুনতে চাই। ফর্মটি পূরণ করুন এবং আমরা যত তাড়াতাড়ি সম্ভব উত্তর দেব।",
  "contact.name": "নাম",
  "contact.email": "ইমেইল ঠিকানা",
  "contact.phone": "ফোন নম্বর",
  "contact.company": "কোম্পানি",
  "contact.subject": "বিষয়",
  "contact.message": "আপনার বার্তা",
  "contact.send": "পাঠান",
  "contact.sending": "পাঠানো হচ্ছে...",
  "contact.success": "বার্তা সফলভাবে পাঠানো হয়েছে! আমরা যত তাড়াতাড়ি সম্ভব যোগাযোগ করব।",
  "contact.error": "কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন বা ফোনে যোগাযোগ করুন।",
  "contact.address": "ঠিকানা",
  "contact.phoneLabel": "ফোন",
  "contact.emailLabel": "ইমেইল",
  "contact.landline": "ল্যান্ডলাইন",
  "contact.mobile": "মোবাইল",
  "contact.rateLimited": "অনেক বেশি অনুরোধ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
};

// ─── Small blog section (line ~1373 in en.json) ───
const blogSmallZh: Record<string, string> = {
  "title": "洞察与技巧",
  "subtitle": "保持关注",
  "readMore": "阅读更多",
  "publishedOn": "发布于",
  "by": "作者",
};
const blogSmallHi: Record<string, string> = {
  "title": "अंतर्दृष्टि और सुझाव",
  "subtitle": "अपडेट रहें",
  "readMore": "और पढ़ें",
  "publishedOn": "प्रकाशित",
  "by": "द्वारा",
};
const blogSmallBn: Record<string, string> = {
  "title": "অন্তর্দৃষ্টি ও পরামর্শ",
  "subtitle": "আপডেট থাকুন",
  "readMore": "আরও পড়ুন",
  "publishedOn": "প্রকাশিত",
  "by": "লেখক",
};

// ─── Large blog section (line ~2680) — UI keys ───
const blogUiZh: Record<string, string> = {
  "title": "洞察与策略",
  "subtitle": "关于数字增长、营销和在线表现的实用见解。",
  "badge": "博客",
  "metaTitle": "博客 | 比利时企业数字营销技巧",
  "metaDescription": "面向比利时中小企业的实用营销技巧：网站优化、SEO、社交媒体和广告投放。阅读我们的免费指南。",
  "featured": "精选",
  "readArticle": "阅读文章",
  "minRead": "分钟阅读",
  "backToArticles": "返回文章列表",
  "shareArticle": "分享文章",
  "contactUs": "联系我们",
  "relatedArticles": "相关文章",
  "relatedServices": "相关服务",
};
const blogUiHi: Record<string, string> = {
  "title": "अंतर्दृष्टि और रणनीतियाँ",
  "subtitle": "डिजिटल विकास, मार्केटिंग और ऑनलाइन प्रदर्शन पर व्यावहारिक जानकारी।",
  "badge": "ब्लॉग",
  "metaTitle": "ब्लॉग | बेल्जियम के व्यवसायों के लिए डिजिटल मार्केटिंग टिप्स",
  "metaDescription": "बेल्जियम के SMEs के लिए व्यावहारिक मार्केटिंग सुझाव: वेबसाइट ऑप्टिमाइज़ेशन, SEO, सोशल मीडिया और विज्ञापन। हमारे मुफ्त गाइड पढ़ें।",
  "featured": "विशेष",
  "readArticle": "लेख पढ़ें",
  "minRead": "मिनट पढ़ने का समय",
  "backToArticles": "लेखों पर वापस जाएं",
  "shareArticle": "यह लेख साझा करें",
  "contactUs": "संपर्क करें",
  "relatedArticles": "संबंधित लेख",
  "relatedServices": "संबंधित सेवाएं",
};
const blogUiBn: Record<string, string> = {
  "title": "অন্তর্দৃষ্টি ও কৌশল",
  "subtitle": "ডিজিটাল প্রবৃদ্ধি, মার্কেটিং এবং অনলাইন পারফরম্যান্স সম্পর্কে ব্যবহারিক তথ্য।",
  "badge": "ব্লগ",
  "metaTitle": "ব্লগ | বেলজিয়ামের ব্যবসার জন্য ডিজিটাল মার্কেটিং টিপস",
  "metaDescription": "বেলজিয়ামের এসএমই-দের জন্য ব্যবহারিক মার্কেটিং পরামর্শ: ওয়েবসাইট অপটিমাইজেশন, SEO, সোশ্যাল মিডিয়া এবং বিজ্ঞাপন। আমাদের বিনামূল্যে গাইড পড়ুন।",
  "featured": "বিশেষ",
  "readArticle": "নিবন্ধ পড়ুন",
  "minRead": "মিনিট পড়ার সময়",
  "backToArticles": "নিবন্ধে ফিরে যান",
  "shareArticle": "এই নিবন্ধটি শেয়ার করুন",
  "contactUs": "যোগাযোগ করুন",
  "relatedArticles": "সম্পর্কিত নিবন্ধ",
  "relatedServices": "সম্পর্কিত সেবা",
};

// ─── Blog articles translations (titles, excerpts, meta — NOT full content) ───
const articleKeysZh: Record<string, string> = {
  "articles.websiteSalesTool.title": "为什么您的网站是2025年最强大的销售工具",
  "articles.websiteSalesTool.excerpt": "您的网站不仅是数字名片。在2025年，它是您最重要的销售资产。以下是原因及应对策略。",
  "articles.websiteSalesTool.metaTitle": "网站作为销售工具 | 比利时企业建议",
  "articles.websiteSalesTool.metaDescription": "了解为什么网站是您的比利时企业最重要的销售工具。关于速度、结构和转化的实用建议。",
  "articles.socialMediaManagement.title": "社交媒体管理：企业真正需要什么",
  "articles.socialMediaManagement.excerpt": "社交媒体不是追求粉丝数量。而是策略、一致性和真实互动。以下是对企业真正有效的方法。",
  "articles.socialMediaManagement.metaTitle": "企业社交媒体管理 | 有效的策略",
  "articles.socialMediaManagement.metaDescription": "了解企业在社交媒体管理中真正需要什么：策略优先于虚荣指标，一致性优先于潮流。",
  "articles.seoExplained.title": "SEO简明解析：客户如何在网上找到您",
  "articles.seoExplained.excerpt": "SEO不是魔法或操纵。它是让您的企业在人们搜索时容易被找到。以下是其真正运作方式。",
  "articles.seoExplained.metaTitle": "为中小企业解析SEO | 在比利时被找到",
  "articles.seoExplained.metaDescription": "面向比利时企业主的SEO简明解释。了解本地SEO的运作方式以及为何长期策略胜过快速技巧。",
  "articles.paidAdvertising.title": "精准广告投放：如何构建高效营销活动",
  "articles.paidAdvertising.excerpt": "付费广告不是盲目推广帖子。而是构建可预测、可衡量结果的系统。",
  "articles.paidAdvertising.metaTitle": "Google和Meta广告零浪费 | 比利时营销活动建议",
  "articles.paidAdvertising.metaDescription": "了解如何为比利时中小企业构建有效的付费广告活动。预算控制、数据驱动，系统化运营。",
  "articles.onlineReputation.title": "在线声誉：为什么评论比您想象的更重要",
  "articles.onlineReputation.excerpt": "您的在线声誉对购买决策的影响超过大多数营销手段。以下是评论的重要性及管理方法。",
  "articles.onlineReputation.metaTitle": "在线声誉与评论管理 | 中小企业指南",
  "articles.onlineReputation.metaDescription": "了解为什么在线评论对比利时企业至关重要，以及如何有效管理和提升您的声誉。",
};

const articleKeysHi: Record<string, string> = {
  "articles.websiteSalesTool.title": "2025 में आपकी वेबसाइट सबसे शक्तिशाली बिक्री उपकरण क्यों है",
  "articles.websiteSalesTool.excerpt": "आपकी वेबसाइट सिर्फ एक डिजिटल ब्रोशर नहीं है। 2025 में, यह आपकी सबसे महत्वपूर्ण बिक्री संपत्ति है।",
  "articles.websiteSalesTool.metaTitle": "वेबसाइट बिक्री उपकरण के रूप में | बेल्जियम के व्यवसायों के लिए सुझाव",
  "articles.websiteSalesTool.metaDescription": "जानें कि आपकी वेबसाइट आपके बेल्जियम व्यवसाय का सबसे महत्वपूर्ण बिक्री उपकरण क्यों है।",
  "articles.socialMediaManagement.title": "सोशल मीडिया प्रबंधन: व्यवसायों को वास्तव में क्या चाहिए",
  "articles.socialMediaManagement.excerpt": "सोशल मीडिया फॉलोअर्स के बारे में नहीं है। यह रणनीति, निरंतरता और वास्तविक जुड़ाव के बारे में है।",
  "articles.socialMediaManagement.metaTitle": "व्यवसायों के लिए सोशल मीडिया प्रबंधन | प्रभावी रणनीति",
  "articles.socialMediaManagement.metaDescription": "जानें कि व्यवसायों को सोशल मीडिया प्रबंधन में वास्तव में क्या चाहिए: वैनिटी मेट्रिक्स पर रणनीति, ट्रेंड पर निरंतरता।",
  "articles.seoExplained.title": "SEO सरल भाषा में: ग्राहक आपको ऑनलाइन कैसे ढूंढते हैं",
  "articles.seoExplained.excerpt": "SEO जादू या हेरफेर नहीं है। यह आपके व्यवसाय को खोज में आसानी से खोजने योग्य बनाने के बारे में है।",
  "articles.seoExplained.metaTitle": "SMEs के लिए SEO समझाया | बेल्जियम में ऑनलाइन खोजे जाएं",
  "articles.seoExplained.metaDescription": "बेल्जियम के व्यापार मालिकों के लिए SEO की सरल व्याख्या। जानें कि स्थानीय SEO कैसे काम करता है।",
  "articles.paidAdvertising.title": "बिना बर्बादी के पेड एडवरटाइजिंग: स्मार्ट कैंपेन कैसे बनाएं",
  "articles.paidAdvertising.excerpt": "पेड एडवरटाइजिंग पोस्ट बूस्ट करने और उम्मीद करने के बारे में नहीं है। यह पूर्वानुमेय, मापनीय परिणाम देने वाली प्रणालियों के बारे में है।",
  "articles.paidAdvertising.metaTitle": "बिना बर्बादी Google और Meta विज्ञापन | बेल्जियम कैंपेन सुझाव",
  "articles.paidAdvertising.metaDescription": "बेल्जियम SMEs के लिए प्रभावी पेड एडवरटाइजिंग कैंपेन बनाना सीखें। बजट नियंत्रण और डेटा-संचालित दृष्टिकोण।",
  "articles.onlineReputation.title": "ऑनलाइन प्रतिष्ठा: समीक्षाएं क्यों इतनी मायने रखती हैं",
  "articles.onlineReputation.excerpt": "आपकी ऑनलाइन प्रतिष्ठा खरीद निर्णयों को अधिकांश मार्केटिंग से अधिक प्रभावित करती है।",
  "articles.onlineReputation.metaTitle": "ऑनलाइन प्रतिष्ठा और समीक्षा प्रबंधन | SME गाइड",
  "articles.onlineReputation.metaDescription": "जानें कि बेल्जियम के व्यवसायों के लिए ऑनलाइन समीक्षाएं क्यों महत्वपूर्ण हैं और अपनी प्रतिष्ठा कैसे प्रबंधित करें।",
};

const articleKeysBn: Record<string, string> = {
  "articles.websiteSalesTool.title": "২০২৫ সালে আপনার ওয়েবসাইট কেন সবচেয়ে শক্তিশালী বিক্রয় হাতিয়ার",
  "articles.websiteSalesTool.excerpt": "আপনার ওয়েবসাইট শুধু একটি ডিজিটাল ব্রোশিউর নয়। ২০২৫ সালে, এটি আপনার সবচেয়ে গুরুত্বপূর্ণ বিক্রয় সম্পদ।",
  "articles.websiteSalesTool.metaTitle": "বিক্রয় হাতিয়ার হিসেবে ওয়েবসাইট | বেলজিয়ামের ব্যবসার জন্য পরামর্শ",
  "articles.websiteSalesTool.metaDescription": "জানুন কেন আপনার ওয়েবসাইট আপনার বেলজিয়ামের ব্যবসার সবচেয়ে গুরুত্বপূর্ণ বিক্রয় হাতিয়ার।",
  "articles.socialMediaManagement.title": "সোশ্যাল মিডিয়া ম্যানেজমেন্ট: ব্যবসার আসলে কী দরকার",
  "articles.socialMediaManagement.excerpt": "সোশ্যাল মিডিয়া ফলোয়ারদের নিয়ে নয়। এটি কৌশল, ধারাবাহিকতা এবং প্রকৃত এনগেজমেন্ট নিয়ে।",
  "articles.socialMediaManagement.metaTitle": "ব্যবসার জন্য সোশ্যাল মিডিয়া ম্যানেজমেন্ট | কার্যকর কৌশল",
  "articles.socialMediaManagement.metaDescription": "ব্যবসার সোশ্যাল মিডিয়া ম্যানেজমেন্টে আসলে কী দরকার তা জানুন: ভ্যানিটি মেট্রিক্সের চেয়ে কৌশল।",
  "articles.seoExplained.title": "SEO সহজ ভাষায়: গ্রাহকরা আপনাকে অনলাইনে কীভাবে খুঁজে পায়",
  "articles.seoExplained.excerpt": "SEO জাদু বা কারসাজি নয়। এটি মানুষ খোঁজার সময় আপনার ব্যবসাকে সহজে খুঁজে পাওয়ার বিষয়।",
  "articles.seoExplained.metaTitle": "এসএমই-দের জন্য SEO ব্যাখ্যা | বেলজিয়ামে অনলাইনে পাওয়া যান",
  "articles.seoExplained.metaDescription": "বেলজিয়ামের ব্যবসার মালিকদের জন্য SEO-এর সহজ ব্যাখ্যা। স্থানীয় SEO কীভাবে কাজ করে তা জানুন।",
  "articles.paidAdvertising.title": "অপচয়হীন পেইড বিজ্ঞাপন: স্মার্ট ক্যাম্পেইন কীভাবে তৈরি করবেন",
  "articles.paidAdvertising.excerpt": "পেইড বিজ্ঞাপন পোস্ট বুস্ট করে আশা করা নয়। এটি পূর্বানুমানযোগ্য, পরিমাপযোগ্য ফলাফল দেওয়ার সিস্টেম তৈরি।",
  "articles.paidAdvertising.metaTitle": "অপচয়হীন Google ও Meta বিজ্ঞাপন | বেলজিয়াম ক্যাম্পেইন টিপস",
  "articles.paidAdvertising.metaDescription": "বেলজিয়ামের SME-দের জন্য কার্যকর পেইড বিজ্ঞাপন ক্যাম্পেইন তৈরি করতে শিখুন।",
  "articles.onlineReputation.title": "অনলাইন সুনাম: রিভিউ কেন আপনার ধারণার চেয়ে বেশি গুরুত্বপূর্ণ",
  "articles.onlineReputation.excerpt": "আপনার অনলাইন সুনাম ক্রয় সিদ্ধান্তকে বেশিরভাগ মার্কেটিংয়ের চেয়ে বেশি প্রভাবিত করে।",
  "articles.onlineReputation.metaTitle": "অনলাইন সুনাম ও রিভিউ ম্যানেজমেন্ট | এসএমই গাইড",
  "articles.onlineReputation.metaDescription": "বেলজিয়ামের ব্যবসার জন্য অনলাইন রিভিউ কেন গুরুত্বপূর্ণ এবং কীভাবে আপনার সুনাম পরিচালনা করবেন তা জানুন।",
};

// We keep article content in English (too long for translation here) — only translate UI-visible short strings

function applyTranslations(locale: string, contactMap: Record<string, string>, blogSmall: Record<string, string>, blogUi: Record<string, string>, articleKeys: Record<string, string>) {
  const filePath = resolve(LOCALES_DIR, `${locale}.json`);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Apply contact
  for (const [dotPath, value] of Object.entries(contactMap)) {
    const parts = dotPath.split('.');
    deepSet(data, parts, value);
  }

  // The "blog" key that's a sibling of "gallery" (small one) — it's the top-level blog at same nesting as gallery
  // We need to find it. In the JSON it's after gallery which is after the services block.
  // Actually both are top-level "blog" keys — JSON only keeps the last one. Let me check.
  // In en.json there appear to be TWO "blog" keys at the top level. JSON spec says last one wins.
  // So the small blog (line 1373) gets overwritten by the large one (line 2680).
  // Let's just apply translations to data.blog which is the surviving one.

  // Ensure blog exists
  if (!data.blog || typeof data.blog !== 'object') data.blog = {};

  // Apply blog UI keys
  for (const [key, value] of Object.entries(blogUi)) {
    data.blog[key] = value;
  }

  // Apply article keys
  for (const [dotPath, value] of Object.entries(articleKeys)) {
    const parts = dotPath.split('.');
    deepSet(data.blog, parts, value);
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  return data;
}

function flatKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flatKeys(v as any, p));
    } else {
      keys.push(p);
    }
  }
  return keys;
}

describe('Translate contact + blog sections', () => {
  it('zh.json — contact + blog translated', () => {
    const data = applyTranslations('zh', contactZh, blogSmallZh, blogUiZh, articleKeysZh);
    expect(data.contact.title).toBe('联系我们');
    expect(data.blog.title).toBe('洞察与策略');
    expect(data.blog.articles.websiteSalesTool.title).toContain('2025');
  });

  it('hi.json — contact + blog translated', () => {
    const data = applyTranslations('hi', contactHi, blogSmallHi, blogUiHi, articleKeysHi);
    expect(data.contact.title).toBe('संपर्क करें');
    expect(data.blog.badge).toBe('ब्लॉग');
  });

  it('bn.json — contact + blog translated', () => {
    const data = applyTranslations('bn', contactBn, blogSmallBn, blogUiBn, articleKeysBn);
    expect(data.contact.title).toBe('যোগাযোগ করুন');
    expect(data.blog.badge).toBe('ব্লগ');
  });
});
