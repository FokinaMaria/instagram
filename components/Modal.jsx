import React, { useState, useEffect } from 'react';
import lik from './font/Liks.png';
import coment from './font/Comments.png';
const uuid = require('uuid/v4');
import { getImages } from '../sources/index';

import axios from 'axios';

const Modal = ({ history }) => {
  const data = history.location.state.data;

  const textInput = React.createRef();
  const [showButton, setshowButton] = useState(false);
  const [countComment, setCountComment] = useState(0);
  const [currentComment, setCurrentCommet] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    Promise.all([
      getImages().then(req => {
        data.comment = req.data[data.id].comment;
        setComments(data.comment);
        setCountComment(req.data[data.id].commentCount)
      })
    ])
      .then(() => {})
      .catch(ex => console.error(ex));
    ac.abort();
  }, []);

  const deleteComment = value => {
    axios.delete(`/deleteComment`, { params: { value } }).then(req => {
      setCountComment(countComment - 1);
      setComments(req.data);
    });
  };

  const addComment = e => {
    setCountComment(countComment + 1);
    let genUuid = uuid();
    setComments([
      ...comments,
      {
        id: data.id,
        autor: window.localStorage.getItem('rr_login'),
        text: currentComment,
        deleteBindId: genUuid
      }
    ]);
    axios
      .post('/comment', {
        id: data.id,
        autor: window.localStorage.getItem('rr_login'),
        text: currentComment,
        deleteBindId: genUuid
      })
      .then(() => {
        setCurrentCommet('');
      });
  };

  const clearEvant = e => {
    setCurrentCommet('');
  };

  const backEventModal = e => {
    e.stopPropagation();
    history.goBack();
    history.location.state.onClick(countComment);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          background: '#fff',
          top: 25,
          left: '10%',
          right: '10%',
          padding: 32,
          width: '1280px',
          height: '876px',
          border: '0.5px solid #444'
        }}
      >
        <div className="comentsColumn">
          <div className="picturModal">
            <img className="picturModalImg" src={data.image} />
            <label className="picturModalLabel">{data.caption}</label>
            <div className="picturModalButton_div">
              <button className="picturModalButton">
                <img className="picturModalButton_img_like" src={lik} />
                {history.location.state.like}
              </button>
              <button className="picturModalButton">
                <img className="picturModalButton_img_comment" src={coment} />
                {countComment}
              </button>
            </div>
          </div>

          <div className="commentModal">
            <div className="commentModal_firstComment">
              <ul className="commentModal_firstComment_ul">
                {comments.map((data, index) => {
                  return (
                    <li className="commentModal_firstComment_li" key={index}>
                      <label>
                        <span style={{ color: '#07319D', margin: '15px' }}>
                          {data.autor}
                        </span>
                        {' ' + data.text}
                      </label>
                      <button
                        className="commentModal_ferstComment_delet"
                        onClick={e => { deleteComment(data) }
                        }>X
                      </button>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="commentModal_NextComment">
              <label>autor</label>
              <input
                type="search"
                onClick={e => {
                  setshowButton(true);
                  e.target.value = window.localStorage.getItem('rr_login');
                  textInput.current.focus();
                }}
              />
              <label>comment</label>
              <input
                type="search"
                value={currentComment}
                ref={textInput}
                required
                onChange={e => setCurrentCommet(e.target.value)}
              />
              {showButton ? (
                <div>
                  <button
                    className="commentModal_NextComment_send"
                    onClick={addComment}
                  >
                    Отправить
                  </button>
                  <button
                    className="commentModal_NextComment_cancel"
                    onClick={clearEvant}
                  >
                    Отменить
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <button className="closeModal" onClick={backEventModal}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
export default Modal;
