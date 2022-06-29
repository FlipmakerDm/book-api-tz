import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import styles from './homePage.module.css';
import Card from '../../components/CardItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPage,
  setBookItem,
  setLoading,
} from '../../components/Search/searchSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { page, loading, bookItems, category, totalItems, error } = useSelector(
    (state) => state.search,
  );

  const [filteredBookItems, setFilteredBookItems] = useState([]);

  useEffect(() => {
    if (category.value === 'all') {
      setFilteredBookItems(bookItems);
      return;
    }

    const filteredBookArr = bookItems.filter((bookItem) => {
      if (bookItem?.volumeInfo?.categories?.length) {
        return bookItem.volumeInfo.categories.some(
          (item) => item.toLowerCase() === category.value,
        );
      }
      return false;
    });
    setFilteredBookItems(filteredBookArr);
  }, [category, bookItems]);

  const loadMore = () => {
    dispatch(setLoading(false));
    dispatch(setPage(page + 1));
  };

  const openBook = (book) => {
    dispatch(setBookItem(book));
    navigate(`/book/${book.id}`);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {totalItems !== 0 && (
        <div className={styles.count}>
          <p>
            Results: {filteredBookItems.length} / {totalItems} books
          </p>
        </div>
      )}

      <div className={styles.cardContainer}>
        {loading && <Loader />}
        {filteredBookItems.map((book) => (
          <Card book={book} key={book.id} openBook={openBook} />
        ))}
      </div>

      {filteredBookItems.length !== 0 && (
        <button className={styles.load_btn} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default HomePage;
