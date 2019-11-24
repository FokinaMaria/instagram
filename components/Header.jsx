import React, { useState } from 'react';
import ReactModal from 'react-modal';

import Signin from './Signin';
import Signup from './Signup';
import logo from './font/Instagram.png';

const Header = () => {
  const [showModalSignin, setModalSignin] = useState(false);
  const [showModalSignup, setModalSignup] = useState(false);

  const signinOpenModal = () => {
    setModalSignin(true);
  };
  const signinCloseModal = () => {
    setModalSignin(false);
  };
  const signupOpenModal = () => {
    setModalSignup(true);
  };
  const signupCloseModal = () => {
    setModalSignup(false);
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="buttonSignin">
        <button onClick={signinOpenModal}>Войти</button>
        <ReactModal
          isOpen={showModalSignin}
          contentLabel="onRequestClose Example"
          ariaHideApp={false}
          style={{
            overlay: {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.15)'
            },
            content: {
              position: 'absolute',
              background: '#fff',
              top: '20%',
              left: '39%',
              right: '39%',
              padding: 15,
              width: '393px',
              height: '440px',
              border: '0.5px solid #444'
            }
          }}
        >
          <Signin
            closeModal={signinCloseModal}
            paramIsOpenSignup={signupOpenModal}
          />
        </ReactModal>
      </div>

      <div className="buttonSignup">
        <button onClick={signupOpenModal}>Зарегестрироваться</button>
        <ReactModal
          isOpen={showModalSignup}
          contentLabel="onRequestClose Example"
          ariaHideApp={false}
          className="modalSignup"
          style={{
            overlay: {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.15)'
            },
            content: {
              position: 'absolute',
              background: '#fff',
              top: '20%',
              left: '39%',
              right: '39%',
              padding: 15,
              width: '393px',
              height: '440px'
            }
          }}
        >
          <Signup
            signupClose={signupCloseModal}
            paramIsOpen={signinOpenModal}
          />
        </ReactModal>
        <div className="buttonExit">
          <button onClick={e => window.localStorage.removeItem('rr_login')}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
