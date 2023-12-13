import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    resetUser(state, action) {
      return null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const setUserFunc = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
  };
};

export const resetUserFunc = () => {
  return (dispatch) => {
    dispatch(resetUser());
  };
};

export default userSlice.reducer;
