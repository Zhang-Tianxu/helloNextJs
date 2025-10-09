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
      <Link href="/image" className={styles.navLink}>
        {t('nav.image')}
      </Link>
      <Link href="/image-compare" className={styles.navLink}>
        {t('nav.image-compare')}
      </Link>
    </nav>
  );
}