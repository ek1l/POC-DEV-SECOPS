/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '../../redux/store';
import IMGTrash from '../../assets/img/trash.png';
import styles from './ComponentGetTasksContainer.module.scss';
import { atualizarTaskCheckTask } from '../../redux/reducers/atualizarCheckTask';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../redux/reducers/getCurrentuser';

const ComponentGetTasksContainer = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.getCurrentUserSlice);
  const getIdTaskAndChecked = async (id: string) => {
    const response = await dispatch(
      atualizarTaskCheckTask({
        idTask: id,
        token: localStorage.getItem('token'),
      }),
    );
    if (response.type === 'atualizarTaskCheckTask/fulfilled') {
      toast.success(`Tarefa atualizada com sucesso!`);
      dispatch(getCurrentUser(localStorage.getItem('token')));
    } else {
      toast.error(`Tarefa atualizada com sucesso!`);
    }
    console.log(response);
  };
  return (
    <section className={styles.section}>
      {data.Task.length > 0 ? (
        <ul>
          {data.Task.filter((task: any) => task.nomeTask.length > 0).map(
            (task: any) => (
              <li key={task.id}>
                {task.nomeTask}
                <div className={styles.checkAndDelete}>
                  <img src={IMGTrash} alt="Trash" />
                  <button
                    style={{
                      backgroundColor: task.concluida ? 'green' : 'red',
                    }}
                    onClick={() => getIdTaskAndChecked(task.id)}
                    className={styles.checked}
                  ></button>
                </div>
              </li>
            ),
          )}
        </ul>
      ) : null}
    </section>
  );
};

export default ComponentGetTasksContainer;
