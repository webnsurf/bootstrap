import React, { Component, ReactNode, Fragment } from 'react';
import classnames from 'classnames';
import AntModal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import { Spinner } from '../spinner/Spinner';
import { Message } from '../message/Message';

const defaultCloseIcon = (
  <svg viewBox="0 0 40 40">
    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
);

export class Modal extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { isClosable, isOpen } = this.props;

    if (isOpen) {
      this.open();
    }

    if (isClosable !== false) {
      document.addEventListener('keydown', this.onEscClick);
    }
  }

  componentWillUnmount() {
    const { isClosable } = this.props;

    if (isClosable !== false) {
      document.removeEventListener('keydown', this.onEscClick);
    }
  }

  onEscClick = ({ key }: KeyboardEvent) => {
    const { isOpen } = this.state;

    if (isOpen && key === 'Escape') {
      this.close();
    }
  }

  open = () => {
    const { onOpen } = this.props;

    this.setState({ isOpen: true });

    if (onOpen) {
      onOpen();
    }
  }

  close = () => {
    const { isClosable, onClose } = this.props;

    if (isClosable !== false) {
      if (onClose) {
        onClose();
      }
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { isOpen } = this.state;
    const {
      className: passedClassName,
      children,
      isClosable,
      heading,
      isLoading = false,
      closeIcon = defaultCloseIcon,
      width = 550,
      visible,
      error,
      render,
      renderActions,
    } = this.props;

    const showModal = isOpen || visible;

    const className = classnames(
      'modal',
      showModal && 'open',
      passedClassName,
      heading && 'with-heading',
    );

    return (
      <Fragment>
        { renderActions && renderActions(this) }

        <AntModal
          visible={ showModal }
          wrapClassName={ className }
          className="modal-inner"
          closable={ isClosable }
          onCancel={ this.close }
          closeIcon={ closeIcon }
          width={ width }
          centered
          footer=""
        >
          { heading && (
            <div className="modal-heading">
              { heading }
            </div>
          ) }

          <div className="modal-content">
            <Message
              message={ error }
              isOpen={ !!error }
              marginBottom={ 15 }
              showIcon
            />

            { render ? render(this) : children }
          </div>

          <Spinner className="modal-spinner" visible={ isLoading } />
        </AntModal>
      </Fragment>
    );
  }
}

interface ModalProps {
  className?: string;
  isOpen?: boolean;
  visible?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
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
}
