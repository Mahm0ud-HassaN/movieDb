import { configureStore, createSlice } from '@reduxjs/toolkit';
import en from '../../Locals/en';
import ar from '../../Locals/ar';

const langSlice = createSlice({
  name: 'lang',
  initialState: { lang: 'en', content: en },
  reducers: {
    toggleLang: (state) => {
      if (state.lang === 'en') {
        state.lang = 'ar';
        state.content = ar;
      } else {
        state.lang = 'en';
        state.content = en;
      }
    },
  },
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light' },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {  // Corrected here
    addToFavorites: (state, action) => {
      state.favorite.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorite = state.favorite.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { toggleLang } = langSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

const store = configureStore({
  reducer: {
    lang: langSlice.reducer,
    theme: themeSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
});

export default store;
