import React, { useEffect } from 'react';
import defaultBook from '../../img/defaultBook.jpg';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookById } from '../../components/Search/searchSlice';
import Loader from '../../components/Loader';
import styles from './aboutPage.module.css';

const AboutPage = () => {
  const { id } = useParams();
  const { bookItem, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bookItem) {
      dispatch(fetchBookById(id));
    }
  }, []);

  const cover = bookItem?.volumeInfo?.imageLinks?.thumbnail || defaultBook;
  const categories = bookItem?.volumeInfo?.categories;
  const title = bookItem?.volumeInfo?.title;
  const authors = bookItem?.volumeInfo?.authors;
  const description = bookItem?.volumeInfo?.description;

  const getCategory = () => {
    return categories && categories.join('\n');
  };

  const getAuthor = () => {
    return authors && authors.join(',\n');
  };

  return (
    <div className={styles.pageContainer}>
      {loading && <Loader />}
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
