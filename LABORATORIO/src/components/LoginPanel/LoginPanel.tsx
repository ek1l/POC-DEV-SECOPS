import styles from './LoginPanel.module.scss';
import IMGLogo from '../../assets/img/logo.png';
import ComponentFormLogin from '../ComponentFormLogin/ComponentFormLogin';
const LoginPanel = () => {
  return (
    <section className={styles.loginPanel}>
      <div className={styles.containerLogin}>
        <img className={styles.img} src={IMGLogo} alt="logo" />
        <ComponentFormLogin />
      </div>
    </section>
  );
};

export default LoginPanel;
