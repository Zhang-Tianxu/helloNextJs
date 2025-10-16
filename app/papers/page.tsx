"use client";

import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import Author from '../components/Author';
import Organizations from '../components/Organizations';
import styles from './page.module.css';

// BibTeX文本常量
const BIBTEX_TEXT = `@inproceedings{zhang2024openworld,
  title={Open-World Reinforcement Learning over Long Short-Term Imagination},
  author={Zhang, Yuxin and Li, Yao and Chen, Tianyi and Zhang, Rui and Song, Shuyang and Wang, Yaliang and Song, Linfeng and Song, Dacheng and Zhang, Changshui},
  booktitle={International Conference on Learning Representations},
  year={2024}
}`;

// 复制按钮组件
function CopyButton() {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(BIBTEX_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(t('paper.copyFailed'), err);
    }
  }, [t]);

  return (
    <button 
      className={styles.copyButton}
      onClick={handleCopy}
      title={copied ? t('paper.copiedTitle') : t('paper.copyTitle')}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
      )}
      <span>{copied ? t('paper.copied') : t('paper.copy')}</span>
    </button>
  );
}

export default function Paper() {
  const { t } = useLanguage();
  return (
    <div className={styles.paperContainer}>
        <div className={styles.paperTitle}>
            <div>REINFORCEMENT LEARNING FROM DYNAMIC CRITIC FEEDBACK FOR FREE-FORM GENERATIONS</div>
        </div>
        <div className={styles.paperAuthors}>
          <div className={styles.peopleList}>
            <Author name="Mian Wu" superscript="†1" />
            <Author name="Gavin Zhang" superscript="2"/>
            <Author name="Sewon Min" superscript="2" />
            <Author name="Sergey Levine" superscript="2" />
            <Author name="Aviral Kumar" superscript="3" />
          </div>
          <div className={styles.organizationList}>
            <Organizations superscript={1} organizations={["Shanghai Jiao Tong University"]} />
            <Organizations superscript={2} organizations={["University of California","Berkeley"]} />
            <Organizations superscript={3} organizations={["Carnegie Mellon University"]} />
          </div>
        </div>
        <div className={styles.relatedLinks}>
            <button className={styles.linkButton}>{t('paper.links.paper')}</button>
            <button className={styles.linkButton}>{t('paper.links.arxiv')}</button>
            <button className={styles.linkButton}>{t('paper.links.code')}</button>
            <button className={styles.linkButton}>{t('paper.links.slides')}</button>
            <button className={styles.linkButton}>{t('paper.links.thread')}</button>
            <button className={styles.linkButton}>{t('paper.links.bilibili')}</button>
        </div>
        <div className={styles.paperAbstract}>
            <div>
                {t('paper.frameworkDescription')}
            </div>
            <div>{t('paper.abstract')}</div>
            <div>{t('paper.abstractContent')}</div>
        </div>
        <div className={styles.paperEvaluation}>
            <div>{t('paper.evaluation')}</div>
            <div className={styles.evaluationImages}>
                {/* <img src="/images/paper_eval3.png" alt="Evaluation 3" className={styles.evalImage}/> */}
            </div>
        </div>
        <div className={styles.paperBibtex}>
            <div className={styles.bibtexHeader}>
                <span>{t('paper.bibtex')}</span>
                <CopyButton />
            </div>
            <div className={styles.codeBlock}>
                <pre className={styles.bibtexCode}>
                    <code>{BIBTEX_TEXT}</code>
                </pre>
            </div>
        </div>    
    </div>
  );
}
