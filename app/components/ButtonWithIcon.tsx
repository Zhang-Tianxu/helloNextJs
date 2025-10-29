import React from 'react';
import styles from './ButtonWithIcon.module.css';

interface ButtonWithIconProps {
  text: string;
  iconUrl?: string;
  onClick?: () => void;
}


const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ text, iconUrl, onClick }) => {
  return (
    <div>
      <button className={styles.linkButton} onClick={onClick}>
        {iconUrl && (
          <img
            src={iconUrl}
            alt="icon"
            style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }}
          />
        )}
        {text}
      </button>
    </div>
  );
};

export default ButtonWithIcon;
