/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import RegisterPanel from '../../components/RegisterPanel/RegisterPanel';
import styles from './Register.module.scss';
import { useAppDispatch } from '../../redux/store';
import { getCurrentUser } from '../../redux/reducers/getCurrentuser';
import { useEffect } from 'react';
const Register = () => {
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
      <RegisterPanel />
    </main>
  );
};

export default Register;
