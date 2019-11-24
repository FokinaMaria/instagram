import React, { useState } from 'react';

import axios from 'axios';

const Signin = value => {
  const [user, setUser] = useState({
    userName: '',
    login: '',
    email: '',
    password: ''
  });

  const handleCloseModal = e => {
    value.closeModal();

    axios.post('/user', user).then(req => {
      console.log(req);
      if (req.data !== 'error') {
        window.localStorage.setItem('rr_login', req.data);
      }
    });
  };

  const redirectSignup = e => {
    value.closeModal();
    value.paramIsOpenSignup();
  };

  return (
    <div>
      <form onSubmit={handleCloseModal}>
        <div className="formModal_header">
          <p>Нет акаунт?</p>
          <button className="formModal_redirect" onClick={redirectSignup}>
            зарегестрируйтесь
          </button>
        </div>
        <div className="formModal_body">
          <h1>Вход</h1>
          <input
            type="text"
            placeholder="Имяпользователя или email"
            onChange={e => setUser({ ...user, login: e.target.value })}
          />
          <input
            type="text"
            placeholder="Пароль"
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
          <button>Войти</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
