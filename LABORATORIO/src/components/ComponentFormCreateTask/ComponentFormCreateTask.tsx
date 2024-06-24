/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styles from './ComponentFormCreateTask.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';
import { sendNewTask } from '../../redux/reducers/sendNewTask';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../redux/reducers/getCurrentuser';
const ComponentFormCreateTask = () => {
  const { register, handleSubmit } = useForm();
  const [checkBox, setCheckBox] = useState(false);
  const dispatch = useAppDispatch();
  const onchangeCheckBox = () => {
    setCheckBox((prev) => !prev);
  };
  const submit = async (formdata: any) => {
    const newTask = {
      nomeTask: formdata.nomeTask,
      concluida: checkBox,
      token: localStorage.getItem('token'),
    };
    const response = await dispatch(sendNewTask(newTask));
    if (response.type === 'sendNewTask/fulfilled') {
      toast.success(`Tarefa criada com sucesso!`);
      dispatch(getCurrentUser(localStorage.getItem('token')));
    } else {
      toast.error(`Tarefa criada com sucesso!`);
    }
  };
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <div className={styles.titleFormContainer}>
          <h1>Criar Tarefa</h1>
        </div>
        <div className={styles.inputNameAndCheckbox}>
          <label className={styles.label}>
            <span> Nome da tarefa:</span>
            <input
              {...register('nomeTask')}
              type="nomeTask"
              placeholder="Nome da Tarefa"
            />
          </label>
          <h2> Concluída?</h2>
          <input onChange={onchangeCheckBox} type="checkbox" />
        </div>
        <button type="submit">Criar tarefa</button>
      </form>
    </section>
  );
};

export default ComponentFormCreateTask;
