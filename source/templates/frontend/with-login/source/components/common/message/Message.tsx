import React, { useEffect, useState, FC, useCallback } from 'react';
import classnames from 'classnames';
import Alert, { AlertProps } from 'antd/lib/alert';
import 'antd/lib/alert/style';

import { useElementResizeObserver } from 'hooks';

export const Message: FC<MessageProps> = ({
  message,
  isOpen = true,
  className: passedClassName,
  type = 'error',
  marginTop = 0,
  marginBottom = 0,
  simple,
  ...rest
}) => {
  const [displayedNode, setDisplayedNode] = useState(message);
  const [nodeRef, messageHeight = 0] = useElementResizeObserver(
    useCallback(({ contentRect }) => (
      contentRect.height + marginTop + marginBottom
    ), [marginTop, marginBottom]),
  );

  useEffect(() => {
    if (message && displayedNode !== message) {
      setDisplayedNode(message);
    }
  }, [displayedNode, message]);

  const classNames = classnames(
    'message',
    isOpen ? 'open' : 'closed',
    simple && 'simple',
    passedClassName,
    type,
  );

  return (
    <div
      className={ classNames }
      style={ { height: isOpen ? messageHeight : 0 } }
        >
      <div
        className="inner"
        ref={ nodeRef }
        style={ {
          ...(marginTop && { marginTop }),
          ...(marginBottom && { marginBottom }),
        } }
            >
        { simple
          ? displayedNode
          : <Alert message={ displayedNode } type={ type } { ...rest } />
        }
      </div>
    </div>
  );
};

export interface MessageProps extends AlertProps {
    isOpen?: boolean;
    marginTop?: number;
    marginBottom?: number;
    simple?: boolean;
}
