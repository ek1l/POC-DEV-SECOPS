import styles from './RegisterPanel.module.scss';
import IMGLogo from '../../assets/img/logo.png';
import ComponentFormRegister from '../ComponentFormRegister/ComponentFormRegister';
const RegisterPanel = () => {
  return (
    <section className={styles.loginPanel}>
      <div className={styles.containerLogin}>
        <img className={styles.img} src={IMGLogo} alt="logo" />
        <ComponentFormRegister />
      </div>
    </section>
  );
};

export default RegisterPanel;
