import React from 'react';
import styles from './ButtonWithIcon.module.css';

interface ButtonWithIconProps {
  text: string;
  iconUrl?: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ text, iconUrl }) => {
  return (
    <div>
          <button className={styles.linkButton}>{text}</button>
    </div>
  );
};

export default ButtonWithIcon;
