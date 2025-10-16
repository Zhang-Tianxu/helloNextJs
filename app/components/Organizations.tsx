import React from 'react';
import styles from './Organizations.module.css';

interface OrganizationsProps {
  organizations: string[];
  superscript?: string | number;
}

const Organizations: React.FC<OrganizationsProps> = ({ organizations, superscript }) => {
  return (
    <span className={styles.organizations}>
      {superscript && <sup className={styles.superscript}>{superscript}</sup>}
      {organizations.join(', ')}
    </span>
  );
};

export default Organizations;
