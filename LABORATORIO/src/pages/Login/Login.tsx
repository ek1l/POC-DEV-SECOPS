/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import LoginPanel from '../../components/LoginPanel/LoginPanel';
import { getCurrentUser } from '../../redux/reducers/getCurrentuser';
import { useAppDispatch } from '../../redux/store';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const verifyUserLoggedIn = async () => {
    const response = await dispatch(
      getCurrentUser(localStorage.getItem('token')),
    );
    if (response.type === 'getCurrentUser/fulfilled') {
      navigate('/user');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyUserLoggedIn();
  }, [dispatch, navigate]);
  return (
    <main className={styles.main}>
      <LoginPanel />
    </main>
  );
};

export default Login;
