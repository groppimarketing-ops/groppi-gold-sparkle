import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const LOCALES_DIR = resolve(__dirname, '../i18n/locales');

const HI_CONTACT = {
  title: "संपर्क करें",
  subtitle: "आइए बात करें",
  intro: "क्या आपके पास कोई प्रोजेक्ट है या अपनी डिजिटल उपस्थिति मजबूत करना चाहते हैं? बिना किसी बाध्यता के हमसे बात करें।",
  mobileLabel: "मोबाइल",
  officeLabel: "कार्यालय",
  hoursLabel: "कार्य समय",
  hoursValue: "सोम - शुक्र: सुबह 9:00 - शाम 6:00",
  description: "हमें आपसे सुनकर खुशी होगी। फॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।",
  name: "नाम",
  email: "ईमेल पता",
  phone: "फोन नंबर",
  company: "कंपनी",
  subject: "विषय",
  message: "आपका संदेश",
  send: "भेजें",
  sending: "भेज रहे हैं...",
  success: "संदेश सफलतापूर्वक भेजा गया! हम जल्द से जल्द आपसे संपर्क करेंगे।",
  error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें या फोन द्वारा संपर्क करें।",
  address: "पता",
  phoneLabel: "फोन",
  emailLabel: "ईमेल",
  landline: "लैंडलाइन",
  mobile: "मोबाइल",
  rateLimited: "बहुत अधिक अनुरोध। कृपया बाद में पुनः प्रयास करें।",
};

const HI_FRANCHISE = {
  title: "फ्रैंचाइज़ी",
  subtitle: "फ्रैंचाइज़ी बनें",
  description: "क्या आप GROPPI के साथ साझेदारी करना चाहते हैं? साथ मिलकर बढ़ने की संभावनाएं खोजें।",
  benefits: {
    title: "फ्रैंचाइज़ी के लाभ",
    items: {
      "0": "सिद्ध प्रक्रियाओं और पद्धतियों तक पहुंच",
      "1": "हमारी अनुभवी टीम का समर्थन",
      "2": "संयुक्त मार्केटिंग प्रयास",
      "3": "ज्ञान साझा और प्रशिक्षण",
    },
  },
  requirements: {
    title: "हम क्या खोजते हैं",
    items: {
      "0": "डिजिटल मार्केटिंग या संबंधित क्षेत्र में अनुभव",
      "1": "उद्यमी मानसिकता और विकास सोच",
      "2": "गुणवत्ता और ग्राहक संतुष्टि के प्रति प्रतिबद्धता",
      "3": "दीर्घकालिक सहयोग की इच्छा",
    },
  },
  cta: "अधिक जानकारी के लिए संपर्क करें",
  apply: "अभी आवेदन करें",
  call: "हमें कॉल करें",
};

const BN_CONTACT = {
  title: "যোগাযোগ করুন",
  subtitle: "আসুন কথা বলি",
  intro: "আপনার কি কোনো প্রজেক্ট আছে বা আপনার ডিজিটাল উপস্থিতি শক্তিশালী করতে চান? বাধ্যবাধকতা ছাড়াই আমাদের সাথে কথা বলুন।",
  mobileLabel: "মোবাইল",
  officeLabel: "অফিস",
  hoursLabel: "কর্মঘণ্টা",
  hoursValue: "সোম - শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০",
  description: "আমরা আপনার কথা শুনতে চাই। ফর্ম পূরণ করুন এবং আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করব।",
  name: "নাম",
  email: "ইমেইল ঠিকানা",
  phone: "ফোন নম্বর",
  company: "কোম্পানি",
  subject: "বিষয়",
  message: "আপনার বার্তা",
  send: "পাঠান",
  sending: "পাঠানো হচ্ছে...",
  success: "বার্তা সফলভাবে পাঠানো হয়েছে! আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করব।",
  error: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন বা ফোনে যোগাযোগ করুন।",
  address: "ঠিকানা",
  phoneLabel: "ফোন",
  emailLabel: "ইমেইল",
  landline: "ল্যান্ডলাইন",
  mobile: "মোবাইল",
  rateLimited: "অনেক বেশি অনুরোধ। পরে আবার চেষ্টা করুন।",
};

const BN_FRANCHISE = {
  title: "ফ্র্যাঞ্চাইজ",
  subtitle: "ফ্র্যাঞ্চাইজি হন",
  description: "GROPPI-এর সাথে অংশীদারিত্বে আগ্রহী? একসাথে বেড়ে ওঠার সুযোগগুলো জানুন।",
  benefits: {
    title: "ফ্র্যাঞ্চাইজের সুবিধা",
    items: {
      "0": "প্রমাণিত প্রক্রিয়া এবং পদ্ধতিতে অ্যাক্সেস",
      "1": "আমাদের অভিজ্ঞ দলের সহায়তা",
      "2": "যৌথ মার্কেটিং প্রচেষ্টা",
      "3": "জ্ঞান ভাগাভাগি এবং প্রশিক্ষণ",
    },
  },
  requirements: {
    title: "আমরা কী খুঁজি",
    items: {
      "0": "ডিজিটাল মার্কেটিং বা সংশ্লিষ্ট ক্ষেত্রে অভিজ্ঞতা",
      "1": "উদ্যোক্তা মানসিকতা এবং প্রবৃদ্ধি চিন্তা",
      "2": "গুণমান এবং গ্রাহক সন্তুষ্টির প্রতি প্রতিশ্রুতি",
      "3": "দীর্ঘমেয়াদী সহযোগিতার ইচ্ছা",
    },
  },
  cta: "আরো তথ্যের জন্য যোগাযোগ করুন",
  apply: "এখনই আবেদন করুন",
  call: "আমাদের কল করুন",
};

function applyTranslations(data: any, section: string, translations: any) {
  if (!data[section]) data[section] = {};
  for (const [key, value] of Object.entries(translations)) {
    if (typeof value === 'object' && value !== null) {
      if (!data[section][key]) data[section][key] = {};
      for (const [k2, v2] of Object.entries(value as any)) {
        if (typeof v2 === 'object' && v2 !== null) {
          if (!data[section][key][k2]) data[section][key][k2] = {};
          Object.assign(data[section][key][k2], v2);
        } else {
          data[section][key][k2] = v2;
        }
      }
    } else {
      data[section][key] = value;
    }
  }
}

describe('Translate contact+franchise for hi and bn', () => {
  it('applies Hindi translations', () => {
    const filePath = resolve(LOCALES_DIR, 'hi.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    applyTranslations(data, 'contact', HI_CONTACT);
    applyTranslations(data, 'franchise', HI_FRANCHISE);
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    expect(data.contact.title).toBe("संपर्क करें");
    expect(data.franchise.title).toBe("फ्रैंचाइज़ी");
  });

  it('applies Bengali translations', () => {
    const filePath = resolve(LOCALES_DIR, 'bn.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    applyTranslations(data, 'contact', BN_CONTACT);
    applyTranslations(data, 'franchise', BN_FRANCHISE);
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    expect(data.contact.title).toBe("যোগাযোগ করুন");
    expect(data.franchise.title).toBe("ফ্র্যাঞ্চাইজ");
  });
});
