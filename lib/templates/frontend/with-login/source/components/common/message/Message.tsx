import React, { useEffect, useState, FC, useCallback, ReactNode } from 'react';
import classnames from 'classnames';

import { useElementResizeObserver } from 'hooks';

export const Message: FC<MessageProps> = ({
  message,
  isOpen = true,
  className: passedClassName,
  type = 'error',
  marginTop = 0,
  marginBottom = 0,
  simple,
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
          : <div className="message-body">{ displayedNode }</div>
        }
      </div>
    </div>
  );
};

export interface MessageProps {
  message: ReactNode;
  className?: string;
  type?: 'error' | 'success';
  isOpen?: boolean;
  marginTop?: number;
  marginBottom?: number;
  simple?: boolean;
}
