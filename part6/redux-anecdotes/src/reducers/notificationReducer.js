import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return '';
    },
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const setNotiTimeOut = (text, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
