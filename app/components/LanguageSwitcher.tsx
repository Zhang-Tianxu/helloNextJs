'use client';

import { useLanguage } from '../contexts/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="language-select" className={styles.label}>
        {t('language.switch')}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
        className={styles.select}
      >
        <option value="en">{t('language.english')}</option>
        <option value="zh">{t('language.chinese')}</option>
      </select>
    </div>
  );
}