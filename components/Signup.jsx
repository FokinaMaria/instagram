import React, { useState } from 'react';

import { putSignup } from '../sources/index';
//import axios from 'axios';

const Signup = params => {
  const [user, setUser] = useState({
    userName: '',
    login: '',
    email: '',
    password: ''
  });

  const signupCurrentCloseModal = e => {
    params.signupClose();
    putSignup(user).then(req => {});
    window.localStorage.setItem('rr_login', user.userName);
  };

  const redirectSignup = e => {
    params.signupClose();
    params.paramIsOpen();
  };

  return (
    <div>
      <form onSubmit={signupCurrentCloseModal}>
        <div className="formModal_header">
          <p>Уже зарегестрированы?</p>
          <button className="formModal_redirect" onClick={redirectSignup}>
            Войдите
          </button>
        </div>
        <div className="formModal_body">
          <h1>Регистрация</h1>
          <input
            type="text"
            placeholder="Полное имя"
            onChange={e => setUser({ ...user, userName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Имя пользователя"
            onChange={e => setUser({ ...user, login: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Пароль"
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
          <button>Зарегестрироваться</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
