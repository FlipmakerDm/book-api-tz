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

    if (res?.items?.length) {
      const uniqItems = res.items.filter((item, itemIdx) => {
        if (!search.bookItems.length) {
          return res.items.findIndex((el) => el.id === item.id) === itemIdx;
        }
        return !search.bookItems.find((bookItem) => bookItem.id === item.id);
      });
      return { totalItems: res.totalItems, bookItems: uniqItems };
    }

    throw new Error('Books not found');
  },
);

export const fetchBookById = createAsyncThunk(
  'search/fetchBookById',
  async (id) => {
    const queries = `?key=${apiKey}`;

    const url = `https://www.googleapis.com/books/v1/volumes/${id}${queries}`;
    const response = await fetch(url);
    const res = await response.json();
    if (res) {
      return res;
    }
    throw new Error('Book not found');
  },
);

const initialState = {
  value: '',
  category: { value: 'all', label: 'all' },
  sort: { value: 'relevance', label: 'relevance' },
  loading: false,
  page: 0,
  totalItems: 0,
  bookItems: [],
  bookItem: null,
  error: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
    setBookItem: (state, action) => {
      state.bookItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      if (state.error) {
        state.error = '';
      }
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.bookItems.push(...action.payload.bookItems);
      state.totalItems = action.payload.totalItems;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchBookById.pending, (state) => {
      if (state.error) {
        state.error = '';
      }
      state.loading = true;
    });
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      state.loading = false;
      state.bookItem = action.payload;
    });
    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  setValue,
  setLoading,
  setCategory,
  setSort,
  setPage,
  setBookItems,
  setBookItem,
} = searchSlice.actions;

export default searchSlice.reducer;
