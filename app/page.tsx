'use client';

import { useLanguage } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navigation from './components/Navigation';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      <LanguageSwitcher />
      <Navigation />
      <div style={{fontSize: '24px', fontWeight: 'bold', margin: '20px 0'}}>{t('site.title')}</div>
      <p style={{fontSize: '16px', color: '#666'}}>{t('site.description')}</p>
    </main>
  );
}
