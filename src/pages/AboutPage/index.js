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
  const categories = bookItem?.volumeInfo?.categories?.join('\n');
  const title = bookItem?.volumeInfo?.title;
  const authors = bookItem?.volumeInfo?.authors?.join('\n');
  const description = bookItem?.volumeInfo?.description;

  if (!bookItem) {
    return (
      <div className={styles.errorContainer}>
        <h2>BOOK NOT FOUND.</h2>
      </div>
    );
  }
  return (
    <div className={styles.pageContainer}>
      {loading && <Loader />}
      <div className={styles.aboutBookContainer}>
        <div className={styles.coverContainer}>
          <div className={styles.imgBox}>
            <img src={cover} alt="img" />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.categories}>
            <p>{categories}</p>
          </div>
          <div className={styles.title}></div>
          <h3>{title}</h3>
          <p>{authors}</p>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
