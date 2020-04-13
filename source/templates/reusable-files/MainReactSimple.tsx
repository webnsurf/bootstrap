import React, { FC, useState, useEffect } from 'react';/* {{imports}} */

export const MainPage: FC/* {{props}} */ = () => {
  const [word, setWord] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setWord('😊 let\'s code! 😊'), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      ....I...say....
      <div>{ word }</div>
    </div>
  );
};
