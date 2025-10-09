'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 导入语言文件
import enMessages from '../../locales/en.json';
import zhMessages from '../../locales/zh.json';

type Language = 'en' | 'zh';

interface Messages {
  [key: string]: any;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言消息映射
const messagesMap: Record<Language, Messages> = {
  en: enMessages,
  zh: zhMessages,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [messages, setMessages] = useState<Messages>(enMessages);

  // 翻译函数
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 如果找不到翻译，返回原始键
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // 设置语言
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setMessages(messagesMap[lang]);
    
    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // 从localStorage加载语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && messagesMap[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    messages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}