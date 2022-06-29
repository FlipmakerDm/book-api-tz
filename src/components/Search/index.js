import React, { useEffect } from 'react';
import iconSearch from '../../img/icons/iconSearch.svg';
import styles from './search.module.css';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import {
  setValue,
  setCategory,
  setSort,
  fetchBooks,
  setBookItems,
  setLoading,
} from './searchSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { value, category, sort, page } = useSelector((state) => state.search);

  const categoriesOptions = [
    { value: 'all', label: 'all' },
    { value: 'art', label: 'art' },
    { value: 'biography', label: 'biography' },
    { value: 'computers', label: 'computers' },
    { value: 'history', label: 'history' },
    { value: 'medical', label: 'medical' },
    { value: 'poetry', label: 'poetry' },
  ];

  const sortOptions = [
    { value: 'relevance', label: 'relevance' },
    { value: 'newest', label: 'newest' },
  ];

  const handleSubmit = (e) => {
    if (e.target[0].value.trim() !== '') {
      e.preventDefault();
      dispatch(setBookItems([]));
      dispatch(fetchBooks());
      navigate(`/`);
    }
  };

  useEffect(() => {
    if (page !== 0) {
      dispatch(fetchBooks());
    }
  }, [page]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.titleHeader}>Search for books</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="search book"
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
        />
        <button className={styles.searchBtn} type="submit">
          <img src={iconSearch} />
        </button>
      </form>
      <div className={styles.selectsContainer}>
        <div className={styles.selectBox}>
          <p>Catigories</p>
          <Select
            className={styles.select}
            value={category}
            options={categoriesOptions}
            onChange={(newValue) => dispatch(setCategory(newValue))}
          />
        </div>
        <div className={styles.selectBox}>
          <p>Sorting by</p>
          <Select
            className={styles.select}
            options={sortOptions}
            value={sort}
            onChange={(newValue) => dispatch(setSort(newValue))}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
