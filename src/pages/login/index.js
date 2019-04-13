import React from "react";
import LoginForm from './components/LoginForm'

import styles from './login.css';

class Login extends React.Component {
  render() {
    return(
      <div className={styles.container}>
      <div className={styles.content}>
          <div className={styles.top}>
            <h1> 问卷管理系统 </h1>
          </div>
          <div className={styles.main}>
            <LoginForm />
          </div>
      </div>
      </div>
    );
  }
}

export default Login;