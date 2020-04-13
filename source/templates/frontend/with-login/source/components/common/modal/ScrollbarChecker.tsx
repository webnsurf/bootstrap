import React, { Component, createRef } from 'react';

export class ScrollbarChecker extends Component {
  scrollBarChecker = createRef<HTMLDivElement>();

  getScrollbarWidth() {
    const sbChecker = this.scrollBarChecker.current;

    if (!sbChecker) {
      return 0;
    }

    const widthWithSB = sbChecker.offsetWidth;

    sbChecker.setAttribute('style', 'width: 100vw');

    const widthWithoutSB = sbChecker.offsetWidth;

    sbChecker.removeAttribute('style');

    return widthWithoutSB - widthWithSB;
  }

  render() {
    return (
      <div className="scrollbar-checker" ref={ this.scrollBarChecker } />
    );
  }
}
