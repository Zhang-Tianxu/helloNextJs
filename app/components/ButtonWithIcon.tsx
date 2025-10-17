import React from 'react';
import styles from './ButtonWithIcon.module.css';

interface ButtonWithIconProps {
  text: string;
  iconUrl?: string;
}


const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ text, iconUrl }) => {
  return (
    <div>
      <button className={styles.linkButton}>
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
