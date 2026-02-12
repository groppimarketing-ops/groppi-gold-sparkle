import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const LOCALES_DIR = resolve(__dirname, '../i18n/locales');

function applySection(data: any, section: string, translations: Record<string, any>) {
  if (!data[section]) data[section] = {};
  for (const [key, value] of Object.entries(translations)) {
    if (typeof value === 'object' && value !== null) {
      if (!data[section][key]) data[section][key] = {};
      Object.assign(data[section][key], value);
    } else {
      data[section][key] = value;
    }
  }
}

// ─── ZH ───
const zhFranchise = {
  title: "特许经营",
  subtitle: "成为合作伙伴",
  description: "您有兴趣与GROPPI合作吗？了解共同发展的机会。",
  benefits: { title: "合作优势", items: { "0": "使用经过验证的流程和方法", "1": "获得经验丰富团队的支持", "2": "联合营销推广", "3": "知识共享与培训" } },
  requirements: { title: "我们寻找的合作伙伴", items: { "0": "数字营销或相关领域的经验", "1": "创业思维和成长心态", "2": "对质量和客户满意度的承诺", "3": "愿意进行长期合作" } },
  cta: "联系我们了解更多", apply: "立即申请", call: "致电我们"
};
const zhFooter = {
  rights: "版权所有。", description: "自2016年以来的数字解决方案。总部位于比利时。",
  privacy: "隐私政策", terms: "服务条款", followUs: "关注我们", quickLinks: "快速链接",
  contact: "联系信息", planCall: "预约通话（30分钟）",
  newsletter: { title: "新闻通讯", description: "获取我们最新的洞察和技巧。", placeholder: "您的电子邮箱", button: "订阅", subscribed: "您已订阅！谢谢。", successTitle: "订阅成功！", successMessage: "您已成功订阅我们的新闻通讯。", errorTitle: "订阅失败", errorMessage: "出现错误，请稍后重试。" }
};
const zhCommon = { loading: "加载中...", error: "发生错误", retry: "重试", back: "返回", next: "下一步", previous: "上一步", close: "关闭", search: "搜索", noResults: "未找到结果", learnMore: "了解更多", getStarted: "开始使用", viewAll: "查看全部" };
const zhValidation = { required: "此字段为必填项", email: "请输入有效的电子邮箱地址", minLength: "最少需要 {{count}} 个字符", maxLength: "最多允许 {{count}} 个字符" };
const zhStats = { years: "行业经验", yearsValue: "9+", clients: "满意客户", clientsValue: "150+", projects: "完成项目", projectsValue: "500+", team: "团队成员", teamValue: "9+" };

// ─── HI ───
const hiFranchise = {
  title: "फ्रैंचाइज़", subtitle: "भागीदार बनें",
  description: "क्या आप GROPPI के साथ साझेदारी में रुचि रखते हैं? साथ मिलकर बढ़ने के अवसर खोजें।",
  benefits: { title: "साझेदारी के लाभ", items: { "0": "सिद्ध प्रक्रियाओं और पद्धतियों तक पहुंच", "1": "हमारी अनुभवी टीम का सहयोग", "2": "संयुक्त मार्केटिंग प्रयास", "3": "ज्ञान साझाकरण और प्रशिक्षण" } },
  requirements: { title: "हम क्या खोज रहे हैं", items: { "0": "डिजिटल मार्केटिंग या संबंधित क्षेत्र में अनुभव", "1": "उद्यमशील मानसिकता और विकास की सोच", "2": "गुणवत्ता और ग्राहक संतुष्टि के प्रति प्रतिबद्धता", "3": "दीर्घकालिक सहयोग की इच्छा" } },
  cta: "अधिक जानकारी के लिए संपर्क करें", apply: "अभी आवेदन करें", call: "हमें कॉल करें"
};
const hiFooter = {
  rights: "सर्वाधिकार सुरक्षित।", description: "2016 से डिजिटल समाधान। बेल्जियम में स्थित।",
  privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें", followUs: "हमें फॉलो करें", quickLinks: "त्वरित लिंक",
  contact: "संपर्क जानकारी", planCall: "कॉल बुक करें (30 मिनट)",
  newsletter: { title: "न्यूज़लेटर", description: "हमारी नवीनतम जानकारी और सुझावों से अपडेट रहें।", placeholder: "आपका ईमेल पता", button: "सदस्यता लें", subscribed: "आपने सदस्यता ले ली! धन्यवाद।", successTitle: "सदस्यता सफल!", successMessage: "आपने सफलतापूर्वक हमारे न्यूज़लेटर की सदस्यता ले ली है।", errorTitle: "सदस्यता विफल", errorMessage: "कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।" }
};
const hiCommon = { loading: "लोड हो रहा है...", error: "एक त्रुटि हुई", retry: "पुनः प्रयास करें", back: "वापस", next: "अगला", previous: "पिछला", close: "बंद करें", search: "खोजें", noResults: "कोई परिणाम नहीं मिला", learnMore: "और जानें", getStarted: "शुरू करें", viewAll: "सभी देखें" };
const hiValidation = { required: "यह फ़ील्ड आवश्यक है", email: "कृपया एक मान्य ईमेल पता दर्ज करें", minLength: "न्यूनतम {{count}} अक्षर आवश्यक हैं", maxLength: "अधिकतम {{count}} अक्षर अनुमत हैं" };
const hiStats = { years: "वर्षों का अनुभव", yearsValue: "9+", clients: "संतुष्ट ग्राहक", clientsValue: "150+", projects: "परियोजनाएं", projectsValue: "500+", team: "टीम सदस्य", teamValue: "9+" };

// ─── BN ───
const bnFranchise = {
  title: "ফ্র্যাঞ্চাইজ", subtitle: "অংশীদার হন",
  description: "আপনি কি GROPPI-এর সাথে অংশীদারিত্বে আগ্রহী? একসাথে বেড়ে ওঠার সুযোগগুলি আবিষ্কার করুন।",
  benefits: { title: "অংশীদারিত্বের সুবিধা", items: { "0": "প্রমাণিত প্রক্রিয়া এবং পদ্ধতিতে অ্যাক্সেস", "1": "আমাদের অভিজ্ঞ দলের সহায়তা", "2": "যৌথ মার্কেটিং প্রচেষ্টা", "3": "জ্ঞান ভাগাভাগি এবং প্রশিক্ষণ" } },
  requirements: { title: "আমরা যা খুঁজছি", items: { "0": "ডিজিটাল মার্কেটিং বা সম্পর্কিত ক্ষেত্রে অভিজ্ঞতা", "1": "উদ্যোক্তা মানসিকতা এবং প্রবৃদ্ধির চিন্তা", "2": "মান এবং গ্রাহক সন্তুষ্টির প্রতি প্রতিশ্রুতি", "3": "দীর্ঘমেয়াদী সহযোগিতার ইচ্ছা" } },
  cta: "আরও তথ্যের জন্য যোগাযোগ করুন", apply: "এখনই আবেদন করুন", call: "আমাদের কল করুন"
};
const bnFooter = {
  rights: "সর্বস্বত্ব সংরক্ষিত।", description: "২০১৬ সাল থেকে ডিজিটাল সমাধান। বেলজিয়ামে অবস্থিত।",
  privacy: "গোপনীয়তা নীতি", terms: "সেবার শর্তাবলী", followUs: "আমাদের অনুসরণ করুন", quickLinks: "দ্রুত লিংক",
  contact: "যোগাযোগের তথ্য", planCall: "কল বুক করুন (৩০ মিনিট)",
  newsletter: { title: "নিউজলেটার", description: "আমাদের সর্বশেষ অন্তর্দৃষ্টি এবং পরামর্শ পেতে আপডেট থাকুন।", placeholder: "আপনার ইমেইল ঠিকানা", button: "সাবস্ক্রাইব", subscribed: "আপনি সাবস্ক্রাইব করেছেন! ধন্যবাদ।", successTitle: "সাবস্ক্রিপশন সফল!", successMessage: "আপনি সফলভাবে আমাদের নিউজলেটারে সাবস্ক্রাইব করেছেন।", errorTitle: "সাবস্ক্রিপশন ব্যর্থ", errorMessage: "কিছু ভুল হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।" }
};
const bnCommon = { loading: "লোড হচ্ছে...", error: "একটি ত্রুটি ঘটেছে", retry: "আবার চেষ্টা করুন", back: "পিছনে", next: "পরবর্তী", previous: "পূর্ববর্তী", close: "বন্ধ করুন", search: "অনুসন্ধান", noResults: "কোনো ফলাফল পাওয়া যায়নি", learnMore: "আরও জানুন", getStarted: "শুরু করুন", viewAll: "সব দেখুন" };
const bnValidation = { required: "এই ক্ষেত্রটি প্রয়োজনীয়", email: "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা দিন", minLength: "সর্বনিম্ন {{count}} অক্ষর প্রয়োজন", maxLength: "সর্বোচ্চ {{count}} অক্ষর অনুমোদিত" };
const bnStats = { years: "বছরের অভিজ্ঞতা", yearsValue: "৯+", clients: "সন্তুষ্ট ক্লায়েন্ট", clientsValue: "১৫০+", projects: "প্রকল্প", projectsValue: "৫০০+", team: "দলের সদস্য", teamValue: "৯+" };

function process(locale: string, franchise: any, footer: any, common: any, validation: any, stats: any) {
  const fp = resolve(LOCALES_DIR, `${locale}.json`);
  const data = JSON.parse(readFileSync(fp, 'utf-8'));
  applySection(data, 'franchise', franchise);
  applySection(data, 'footer', footer);
  data.common = common;
  data.validation = validation;
  data.stats = stats;
  writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
  return data;
}

describe('Translate franchise/footer/common/validation/stats', () => {
  it('zh.json', () => {
    const d = process('zh', zhFranchise, zhFooter, zhCommon, zhValidation, zhStats);
    expect(d.franchise.title).toBe('特许经营');
    expect(d.footer.newsletter.button).toBe('订阅');
    expect(d.common.close).toBe('关闭');
    expect(d.stats.years).toBe('行业经验');
  });
  it('hi.json', () => {
    const d = process('hi', hiFranchise, hiFooter, hiCommon, hiValidation, hiStats);
    expect(d.franchise.title).toBe('फ्रैंचाइज़');
    expect(d.validation.required).toBe('यह फ़ील्ड आवश्यक है');
  });
  it('bn.json', () => {
    const d = process('bn', bnFranchise, bnFooter, bnCommon, bnValidation, bnStats);
    expect(d.franchise.title).toBe('ফ্র্যাঞ্চাইজ');
    expect(d.common.search).toBe('অনুসন্ধান');
  });
});
