/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
  loggedIn: false,
};

export const getCurrentUser = createAsyncThunk(
  'getCurrentUser',
  async (token: string | null) => {
    try {
      const { data } = await api.get(`user/userAndTask`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Get Current  User Error');
    }
  },
);

const getCurrentUserSlice = createSlice({
  name: 'getCurrentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.loggedIn = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.loggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.data = [];
        state.loggedIn = false;
      });
  },
});

export default getCurrentUserSlice.reducer;
