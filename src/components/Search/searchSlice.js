import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const maxResult = 30;
const apiKey = process.env.REACT_APP_API_KEY || '';

export const fetchBooks = createAsyncThunk(
  'search/fetchBooks',
  async (_, { getState }) => {
    let { search } = getState();

    let startIndex = search.page * maxResult;

    const queries = `?q=${search.value}&maxResults=${maxResult}&key=${apiKey}&orderBy=${search.sort.value}&startIndex=${startIndex}`;

    const url = `https://www.googleapis.com/books/v1/volumes${queries}`;

    const response = await fetch(url);
    const res = await response.json();

    const totalItems = res.totalItems;
    console.log(totalItems);

    if (res?.items?.length) {
      const uniqItems = res.items.filter((item, itemIdx) => {
        if (!search.bookItems.length) {
          return res.items.findIndex((el) => el.id === item.id) === itemIdx;
        }
        return !search.bookItems.find((bookItem) => bookItem.id === item.id);
      });
      return uniqItems;
    }

    throw new Error('No result');
  },
);

const initialState = {
  value: '',
  category: { value: 'all', label: 'all' },
  sort: { value: 'relevance', label: 'relevance' },
  loading: false,
  page: 0,
  bookItems: [],
  counterBooks: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setBookItems: (state, action) => {
      state.bookItems = action.payload;
    },
    setCounterBooks: (state, action) => {
      state.counterBooks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.bookItems.push(...action.payload);
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  setValue,
  setCategory,
  setSort,
  setPage,
  setBookItems,
  setCounterBooks,
  totalItems,
} = searchSlice.actions;

export default searchSlice.reducer;
