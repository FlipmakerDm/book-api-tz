import React from 'react';
import defaultBook from '../../img/defaultBook.jpg';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './aboutPage.module.css';

const AboutPage = () => {
  const { bookItems } = useSelector((state) => state.search);

  let { id } = useParams();

  const book = bookItems.find((item) => item.id === id) || {};

  let cover = book?.volumeInfo?.imageLinks?.thumbnail || defaultBook;
  let categories = book?.volumeInfo?.categories;
  let title = book?.volumeInfo?.title;
  let authors = book?.volumeInfo?.authors;
  let description = book?.volumeInfo?.description;

  const getCategory = () => {
    return categories && categories.join('\n');
  };

  const getAuthor = () => {
    return authors && authors.join(',\n');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.coverContainer}>
        <div className={styles.imgBox}>
          <img src={cover} alt="img" />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.categories}>
          <p>{getCategory()}</p>
        </div>
        <div className={styles.title}></div>
        <h3>{title}</h3>
        <p>{getAuthor()}</p>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default AboutPage;
