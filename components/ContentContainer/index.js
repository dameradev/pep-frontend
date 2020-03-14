import React from 'react';
import styled from "styled-components";
import { respondTo } from '../../utils/respondTo';
// import { connect } from 'react-redux';
// import { handleRightPanelOpen, selectRightPanelOpen } from '../../store/flags';

const ContentContainerMain = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1920px;
  min-height: ${props=> props.theme.containerMaxHeight};
  padding: 0 64px;
  margin: 0 auto;

  ${respondTo.desktopUltraLarge`
    max-width: 2364px;
    padding: 0 64px;
  `}

${respondTo.desktopExtraLarge`
    max-width: 2162px;
    padding: 0 128px;
  `}


  ${respondTo.desktop`
    max-width: 1770px;
    padding: 0 50px;
  `}


  ${respondTo.desktopSmall`
    max-width: 1520px;
    padding: 0 120px;
  `}

  ${respondTo.laptop`
    max-width: 1260px;
    min-height: calc(100vh - 114px);
    padding: 0 32px;
  `}

  @include respond-to(laptop) {
    max-width: 1260px;
    min-height: $container-max-height-laptop;
    padding: 0 32px;
  }

  @include respond-to(laptop-small) {
    max-width: 1024px;
  }

  @include respond-to(tablet) {
    max-width: 922px;
    padding: 0 10px;
  }

  @include respond-to(tablet-mini) {
    flex-direction: column;
    justify-content: flex-start;
    min-height: $container-max-height-tablet-mini;
    padding: 0 67px;
  }

  @include respond-to(mobile) {
    padding: 0 13px;
  }

  @include respond-to(mobile-small) {
    min-height: calc(100vh - 76px);
    padding: 0 10px;
  }

  

  /* @include respond-to(desktop-small) {
  
  } */

  `;

class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.scrollPosition = 0;
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.scrollHandler)
  // }

  componentWillUnmount() {
    // const { handleRightPanelOpen } = this.props;
    // handleRightPanelOpen(true);
    // window.removeEventListener('scroll', this.scrollHandler);
  }

  // scrollHandler = () => {
  //   const { rightPanelSticky, rightPanelOpen, handleRightPanelSticky, handleRightPanelOpen } = this.props;
  //   const offset = 25;
  //   const rightPanel = document.querySelector('.right-panel');
  //   const handlePoint = rightPanel.offsetTop + rightPanel.offsetHeight - 30;
  //
  //   if (
  //     !rightPanelSticky &&
  //     this.scrollPosition - offset > 0 &&
  //     this.scrollPosition - offset > window.pageYOffset &&
  //     window.pageYOffset > handlePoint
  //   ) {
  //     handleRightPanelSticky(true);
  //     this.scrollPosition = window.pageYOffset;
  //     if (window.pageYOffset > handlePoint) {
  //       handleRightPanelOpen(false);
  //     }
  //   } else if (
  //     rightPanelSticky &&
  //     this.scrollPosition + offset <= window.pageYOffset &&
  //     !rightPanelOpen
  //   ) {
  //     handleRightPanelSticky(false);
  //     this.scrollPosition = window.pageYOffset;
  //   } else if (rightPanelSticky && window.pageYOffset <= offset) {
  //     this.scrollPosition = window.pageYOffset;
  //     handleRightPanelSticky(false);
  //   }
  //
  //   if (Math.abs(this.scrollPosition - window.pageYOffset) >= offset) {
  //     this.scrollPosition = window.pageYOffset;
  //   }
  // };

  handleCollapseRightPanel = () => this.props.handleRightPanelOpen(!this.props.rightPanelOpen);

  render() {

    const { rightPanelOpen, className } = this.props;
    return (
      <ContentContainerMain
        // className={`content-container ${className ? className : ''}`}
        // onScroll={e => this.scrollHandler(e.target)}
      >
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child)
          // console.log(child)
        )}
      </ContentContainerMain>
    )
  }
}

export default ContentContainer;
// const mapStateToProps = state => ({
//   rightPanelOpen: selectRightPanelOpen(state)
// });

// const mapDispatchToProps = {
//   handleRightPanelOpen: handleRightPanelOpen
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ContentContainer);
