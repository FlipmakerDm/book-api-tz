import React from 'react';
import Loader from '../../components/Loader';
import styles from './HomePage.module.css';
import Card from '../../components/CardItem';
import CounterBooks from '../../components/CounterBooks';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../components/Search/searchSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate();

  const { page, loading, bookItems, category, totalItems } = useSelector(
    (state) => state.search,
  );
  const dispatch = useDispatch();

  const loadMore = () => {
    dispatch(setPage(page + 1));
  };

  const openBook = (id) => {
    navigate(`/book/${id}`);
  };

  const getFiltredBooks = () => {
    if (category.value === 'all') {
      return bookItems;
    }

    return bookItems.filter((bookItem) => {
      if (bookItem?.volumeInfo?.categories?.length) {
        return bookItem.volumeInfo.categories.some(
          (item) => item.toLowerCase() === category.value,
        );
      }
      return false;
    });
  };

  // const counter = () => {
  //   counterBooks = totalItems;
  //   return counterBooks;
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardContainer}>
        {loading && <Loader />}
        <div className="count">
          <p>{totalItems}</p>
        </div>
        {/* <CounterBooks counterBooks={totalItems} /> */}
        {getFiltredBooks().map((book) => (
          <Card book={book} key={book.id} openBook={openBook} />
        ))}
      </div>
      {bookItems.length !== 0 && (
        <button className={styles.load_btn} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default HomePage;
