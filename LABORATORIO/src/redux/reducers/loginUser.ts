/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async (formData: any) => {
    try {
      const { data } = await api.post(`user/login`, formData);
      return data;
    } catch (error) {
      throw new Error('Login  User Error');
    }
  },
);

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default loginUserSlice.reducer;
