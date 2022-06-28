import React from 'react';
import styles from './header.module.css';
import Search from '../Search';

const HeaderB = () => {
  return (
    <header className={styles.header}>
      <Search />
    </header>
  );
};

export default HeaderB;
