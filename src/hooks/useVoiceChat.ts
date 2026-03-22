import { useState, useCallback, useRef, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

/** Map i18n locale codes to BCP-47 speech codes */
const SPEECH_LANG_MAP: Record<string, string> = {
  nl: 'nl-BE',
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  ar: 'ar-SA',
  es: 'es-ES',
  it: 'it-IT',
  pt: 'pt-PT',
  pl: 'pl-PL',
  tr: 'tr-TR',
  zh: 'zh-CN',
  hi: 'hi-IN',
  bn: 'bn-BD',
  ur: 'ur-PK',
  ru: 'ru-RU',
};

export function getSpeechLang(locale: string): string {
  return SPEECH_LANG_MAP[locale] || SPEECH_LANG_MAP.en;
}

interface UseVoiceChatOptions {
  onTranscript: (text: string) => void;
  lang?: string;
}

export function useVoiceChat({ onTranscript, lang = 'nl-BE' }: UseVoiceChatOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const supportsSTT = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const supportsTTS = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const startListening = useCallback(() => {
    if (!supportsSTT || isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.trim()) onTranscript(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [supportsSTT, isListening, lang, onTranscript]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!supportsTTS) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[#*_~`>[\]()!]/g, '').replace(/https?:\/\/\S+/g, '');
    if (!clean.trim()) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Actively select the best matching voice, preferring Belgian Dutch for nl-BE
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Exact lang match (e.g. nl-BE)
      let match = voices.find(v => v.lang === lang);
      // Fallback: same base language (e.g. nl)
      if (!match) {
        const base = lang.split('-')[0];
        match = voices.find(v => v.lang.startsWith(base));
      }
      if (match) utterance.voice = match;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [supportsTTS, lang]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  return {
    isListening,
    isSpeaking,
    autoSpeak,
    setAutoSpeak,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    supportsSTT,
    supportsTTS,
  };
}
