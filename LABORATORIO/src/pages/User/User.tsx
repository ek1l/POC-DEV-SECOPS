/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './User.module.scss';
import { getCurrentUser } from '../../redux/reducers/getCurrentuser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ComponentFormCreateTask from '../../components/ComponentFormCreateTask/ComponentFormCreateTask';
import ComponentGetTasksContainer from '../../components/ComponentGetTasksContainer/ComponentGetTasksContainer';
const User = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.getCurrentUserSlice);
  const navigate = useNavigate();

  const verifyUserLoggedIn = async () => {
    const response = await dispatch(
      getCurrentUser(localStorage.getItem('token')),
    );
    if (response.type === 'getCurrentUser/fulfilled') {
      toast.success(`Bem vindo !`);
    } else {
      navigate('/');
    }
  };
  const logout = () => {
    toast.success(`Logout efetuado com sucesso!`);
    localStorage.clear();
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  useEffect(() => {
    verifyUserLoggedIn();
  }, [dispatch]);
  return (
    <main className={styles.main}>
      {data.nome ? (
        <>
          <div className={styles.containerMain}>
            <header className={styles.header}>
              <h1 className={styles.titleBemVindo}>Bem vindo {data.nome} !</h1>
              <button onClick={logout}>Logout</button>
            </header>
            <ComponentFormCreateTask />
            <ComponentGetTasksContainer />
          </div>
        </>
      ) : null}
    </main>
  );
};

export default User;
