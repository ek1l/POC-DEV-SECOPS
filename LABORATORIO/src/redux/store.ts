import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createUserSlice from './reducers/registerUser';
import loginUserSlice from './reducers/loginUser';
import getCurrentUserSlice from './reducers/getCurrentuser';
import sendNewTaskSlice from './reducers/sendNewTask';
import atualizarTaskCheckTaskSlice from './reducers/atualizarCheckTask';
const store = configureStore({
  reducer: {
    createUserSlice: createUserSlice,
    loginUserSlice: loginUserSlice,
    sendNewTaskSlice: sendNewTaskSlice,
    getCurrentUserSlice: getCurrentUserSlice,
    atualizarTaskCheckTaskSlice: atualizarTaskCheckTaskSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
