import React, { FC, useState, useEffect } from 'react';

import { Modal } from 'components/common';
import { Button } from 'components/forms';

export const App: FC = () => {
  const [word, setWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setWord('😊 let\'s code! 😊'), 2000);
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
