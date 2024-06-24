/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
  loggedIn: false,
};

export const atualizarTaskCheckTask = createAsyncThunk(
  'atualizarTaskCheckTask',
  async (tokenAndIdTask: any) => {
    const idTask = {
      id: tokenAndIdTask.idTask,
    };
    try {
      const { data } = await api.patch(`tasks/check`, idTask, {
        headers: {
          Authorization: `Bearer ${tokenAndIdTask.token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Get Current  User Error');
    }
  },
);

const atualizarTaskCheckTaskSlice = createSlice({
  name: 'atualizarTaskCheckTask',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(atualizarTaskCheckTask.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.loggedIn = false;
      })
      .addCase(atualizarTaskCheckTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.loggedIn = true;
      })
      .addCase(atualizarTaskCheckTask.rejected, (state) => {
        state.loading = false;
        state.data = [];
        state.loggedIn = false;
      });
  },
});

export default atualizarTaskCheckTaskSlice.reducer;
