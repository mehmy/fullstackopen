import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      return action.payload;
    },
    resetError(state, action) {
      return '';
    },
  },
});

export const { setError, resetError } = errorSlice.actions;

export const setErrorTimeOut = (text, timeout) => {
  return (dispatch) => {
    dispatch(setError(text));
    setTimeout(() => {
      dispatch(resetError());
    }, timeout * 1000);
  };
};

export default errorSlice.reducer;
