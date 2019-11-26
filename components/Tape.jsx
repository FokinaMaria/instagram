import React, { useState } from 'react';
import like from './font/Liks.png';
import coment from './font/Comments.png';
import like_img from './font/Like_img.png';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Tape = props => {
  const [countLike, setCountLike] = useState(props.data.likeCount);
  const [countComment, setCountComment] = useState(props.data.commentCount);
  const [hasLike, setIsLike] = useState(false);
  const key = props.data.id;

  const handleLike = e => {
    console.log(key);
    if (window.localStorage.getItem('rr_login') !== null) {
      if (hasLike) setIsLike(false);
      else setIsLike(true);

      axios.post('/images', props.data).then(req => {
        setCountLike(req.data.likeCount);
        setCountComment(req.data.commentCount);
      });
    } else {
      null;
    }
  };

  const showModal = value => {
    setCountComment(value);
  };

  return (
    <div className="tile">
      <img className="tileImg" src={props.data.image} alt={props.data.name} />
      <img className={hasLike ? 'like like_event' : 'like'} src={like_img} />
      <label className="tileLabel">{props.data.caption}</label>
      <button className="tile_button" onClick={handleLike}>
        <img className="tile_img_like" src={like} /> {countLike}
      </button>
      <Link
        key={props.data.id}
        to={{
          pathname: `/img/${props.data.id}`,
          state: {
            modal: true,
            data: props.data,
            like: countLike,
            onClick: showModal
          }
        }}
      >
        <button className="tile_button">
          <img className="tile_img_comment" src={coment} />
          {countComment}
        </button>
      </Link>
    </div>
  );
};

export default Tape;
