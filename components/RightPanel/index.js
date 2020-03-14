import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

// import utils from '../../utils';

// import './index.scss';

const RightPanelMain = styled.aside`
position: sticky;
  top: 84px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 28.5%;
  height: ${props=> props.theme.containerMaxHeight};
  padding: 20px 0;
  `;

class RightPanel extends React.Component {

  render() {
    const { className, rightPanelOpen = true, handleCollapseRightPanel } = this.props;
    return (
      <RightPanelMain
        // className={classNames('right-panel', className)}
        // onMouseEnter={utils.disablePageScroll}
        // onMouseLeave={utils.enablePageScroll}
      >
        <div className="right-panel__content-container">
          
          {React.Children.map(this.props.children, child =>
            React.cloneElement(child)
            // console.log(childs)
          )}
        </div>
      </RightPanelMain>
    );
  }
}

export default RightPanel;