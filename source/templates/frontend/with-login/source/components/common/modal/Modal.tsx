import React, { Component, createRef, Fragment, ReactNode } from 'react';
import classnames from 'classnames';

import { ScrollbarChecker } from './ScrollbarChecker';
import { Spinner } from '../spinner/Spinner';
import { Message } from '../message/Message';

const defaultCloseIcon = (
  <svg viewBox="0 0 40 40">
    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
);

const html = document.getElementsByTagName('html')[0];
const body = document.getElementsByTagName('body')[0];

const scroll = {
  disable(scrollBarWidth: number) {
    html.classList.add('noScroll');
    body.classList.add('noScroll');

    if (scrollBarWidth) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }
  },
  enable() {
    html.classList.remove('noScroll');
    body.classList.remove('noScroll');

    body.style.paddingRight = '';
  },
};

export class Modal extends Component<ModalProps, ModalState> {
  scrollBarChecker = createRef<ScrollbarChecker>();
  contentWrapper = createRef<HTMLDivElement>();
  innerContent = createRef<HTMLDivElement>();

  constructor(props: ModalProps) {
    super(props);

    this.state = {
      isOpen: false,
      isHidden: true,
    };
  }

  componentDidMount() {
    const { isClosable, isOpen } = this.props;
    const { current } = this.contentWrapper;

    this.setState({ isHidden: false }, () => {
      if (isOpen) {
        this.open();
      }
    });

    if (current && isClosable !== false) {
      document.addEventListener('keydown', this.onClickEscape);
      current.addEventListener('mousedown', this.onClickOutside);
      current.addEventListener('touchstart', this.onClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onClickEscape);
  }

  onClickOutside = ({ target }: MouseEvent | TouchEvent) => {
    const { current } = this.innerContent;

    if (current && !current.contains(target as Node)) {
      this.close();
    }
  }

  onClickEscape = ({ key }: KeyboardEvent) => {
    if (key === 'Escape' && this.state.isOpen) {
      this.close();
    }
  }

  open = () => {
    const { onOpen } = this.props;
    const scrollBarChecker = this.scrollBarChecker.current;

    this.setState({ isOpen: true });

    if (scrollBarChecker) {
      scroll.disable(scrollBarChecker.getScrollbarWidth());
    }

    if (onOpen) {
      onOpen();
    }
  }

  close = () => {
    const { onClose } = this.props;

    this.setState({ isOpen: false });

    scroll.enable();

    if (onClose) {
      onClose();
    }
  }

  render() {
    const { isOpen, isHidden } = this.state;
    const {
      className: passedClassName,
      children,
      isClosable,
      heading,
      isLoading = false,
      closeIcon = defaultCloseIcon,
      width = 550,
      error,
      render,
      renderActions,
    } = this.props;

    const classNames = classnames(
      'modal',
      isHidden && 'hidden',
      isOpen && 'open',
      passedClassName,
    );

    return (
      <Fragment>
        <ScrollbarChecker ref={ this.scrollBarChecker } />
        { renderActions && renderActions(this) }

        <div className={ classNames } ref={ this.contentWrapper }>
          <div
            className="modal-inner"
            ref={ this.innerContent }
            style={ width ? { width } : {} }
          >
            { isClosable !== false && (
              <button className="modal-close" onClick={ this.close }>
                { closeIcon }
              </button>
            ) }

            { heading && (
              <div className="modal-heading">
                { heading }
              </div>
            ) }

            <div className="modal-content">
              <Message
                isOpen={ !!error }
                message={ error }
                marginBottom={ 15 }
              />

              { render ? render(this) : children }
            </div>

            <Spinner className="modal-spinner" visible={ isLoading } />
          </div>
        </div>
      </Fragment>
    );
  }
}

interface ModalProps {
  className?: string;
  isOpen?: boolean;
  onOpen?: () => any;
  onClose?: () => any;
  isLoading?: boolean;
  isClosable?: boolean;
  heading?: string | JSX.Element;
  closeIcon?: ReactNode;
  error?: ReactNode;
  width?: number;
  render?: (modal: Modal) => ReactNode;
  renderActions?: (modal: Modal) => ReactNode;
}

interface ModalState {
  isOpen: boolean;
  isHidden: boolean;
}
