import React, { FC, useState, useEffect } from 'react';/* {{imports}} */

import { Modal } from 'components/common';
import { Button } from 'components/forms';

export const MainPage: FC/* {{props}} */ = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setWord('😊 let\'s code! 😊'), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      ....I...say....
      <div>{ word }</div>


      <Modal
        renderActions={ modal => <Button onClick={ modal.open }>Open modal</Button> }
        heading={ (
          <span>This is a<b>{ ' 😊 Modal 😊 ' }</b></span>
        ) }
        onOpen={ () => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1000);
        } }
        isLoading={ isLoading }
      >
        This in my content
        <br />
        <br />
        Content could also be rendered using the <b><i>render</i></b> prop
      </Modal>
    </div>
  );
};
