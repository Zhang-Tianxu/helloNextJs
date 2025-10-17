import React from 'react';
import { useState, useCallback } from 'react';
import styles from './CodeBlockWithCopyBtn.module.css';

interface CodeBlockWithCopyBtnProps {
  code: string;
}

// 复制按钮组件
const CopyButton: React.FC<CodeBlockWithCopyBtnProps> = ({code}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy Failed!", err);
    }
  });

  return (
    <button 
      className={styles.copyButton}
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy BibTex"}
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
      <span>{copied ? "Copied!": "Copy"}</span>
    </button>
  );
}


const CodeBlockWithCopyBtn: React.FC<CodeBlockWithCopyBtnProps> = ({ code }) => {
    return (
        <div className={styles.paperBibtex}>
            <div className={styles.bibtexHeader}>
                <span>BiTex</span>
                <CopyButton code={code} />
            </div>
            <div className={styles.codeBlock}>
                <pre className={styles.bibtexCode}>
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlockWithCopyBtn;
