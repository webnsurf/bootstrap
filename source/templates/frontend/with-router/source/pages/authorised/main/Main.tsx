import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const MainPage: FC<RouteComponentProps> = () => {
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
