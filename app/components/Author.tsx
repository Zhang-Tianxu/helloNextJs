import React from 'react';
import styles from './Author.module.css';

interface AuthorProps {
  name: string;
  superscript?: string | number;
  link?: string;
}

const Author: React.FC<AuthorProps> = ({ name, superscript, link }) => {
  const content = (
    <>
      {name}
      {superscript && <sup className={styles.superscript}>{superscript}</sup>}
    </>
  );
  return link ? (
    <a href={link} className={styles.author} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <span className={styles.author}>{content}</span>
  );
};

export default Author;
