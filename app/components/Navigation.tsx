'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { t } = useLanguage();

  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.navLink}>
        {t('nav.home')}
      </Link>
      <Link href="/papers" className={styles.navLink}>
        {t('nav.papers')}
      </Link>
    </nav>
  );
}