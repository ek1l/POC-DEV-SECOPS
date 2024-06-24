/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const createUser = createAsyncThunk(
  'createUser',
  async (formData: any) => {
    try {
      const { data } = await api.post(`user/register`, formData);
 
      return data;

    } catch (error) {
      throw new Error('Create  User Error');
    }
  },
);

const createUserSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createUserSlice.reducer;
