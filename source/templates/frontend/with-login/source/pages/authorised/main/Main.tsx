import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/common';
import { Button } from 'components/forms';

export const MainPage: FC<RouteComponentProps> = () => {
  const [word, setWord] = useState('');

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
      >
        This in my content
        <br />
        <br />
        Content could also be rendered using the <b><i>render</i></b> prop
      </Modal>
    </div>
  );
};
