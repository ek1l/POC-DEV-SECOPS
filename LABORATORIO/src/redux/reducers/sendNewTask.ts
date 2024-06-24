/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const sendNewTask = createAsyncThunk(
  'sendNewTask',
  async (formData: any) => {
    const objSemToken = {
      nomeTask: formData.nomeTask,
      concluida: formData.concluida,
    };
    try {
      const { data } = await api.post(`tasks/create`, objSemToken, {
        headers: {
          Authorization: `Bearer ${formData.token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create  Task Error');
    }
  },
);

const sendNewTaskSlice = createSlice({
  name: 'sendNewTask',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendNewTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendNewTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(sendNewTask.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default sendNewTaskSlice.reducer;
