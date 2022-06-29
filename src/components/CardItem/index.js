import React from 'react';
import defaultBook from '../../img/defaultBook.jpg';
import styles from './Card.module.css';
import propTypes from 'prop-types';

const Card = ({ book, openBook }) => {
  const cover = book?.volumeInfo?.imageLinks?.smallThumbnail || defaultBook;
  const categories = book?.volumeInfo?.categories?.join('\n');
  const title = book?.volumeInfo?.title;
  const authors = book?.volumeInfo?.authors?.join(',\n');

  return (
    <div className={styles.cardBook} onClick={() => openBook(book)}>
      <div className={styles.cover}>
        <img src={cover} alt="img" />
      </div>
      <div className={styles.volume}>
        <p className={styles.category}>{categories}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{authors}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  book: propTypes.object.isRequired,
  openBook: propTypes.isRequired,
};

export default Card;
