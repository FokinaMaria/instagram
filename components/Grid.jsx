import React, { useState, useEffect } from 'react';
import Tape from './Tape';

import { getUsers } from 'source';

const Grid = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getUsers().then(({ data }) => setGallery(data));
  }, []);

  return (
    <div className="grid">
      {gallery.map(data => (
        <Tape data={data} key={data.id} />
      ))}
    </div>
  );
};

export default Grid;
