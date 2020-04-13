import React, { FC, useState, useEffect } from 'react';

export const MainPage: FC = () => {
  const [word, setWord] = useState('');

  useEffect(() => {
    setTimeout(() => setWord('😊 let\'s code! 😊'), 2000);
  }, []);

  return (
    <div className="app">
      ....I...say....
      <div>{ word }</div>
    </div>
  );
};
