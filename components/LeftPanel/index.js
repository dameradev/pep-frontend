import React from 'react';

// import './index.scss';
import styled from 'styled-components';

const LeftPanelMain = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 71.5%;
  height: 100%;
  padding: 20px 20px 20px 0;
  text-align: left;
  order: 0;
`;


export default class LeftPanel extends React.Component {
  render() {
    const { className, isContentContainer } = this.props;
    return (
      <LeftPanelMain>
        {isContentContainer ? (
          <div className="left-panel__content-container">
            {this.props.children}
          </div>
        ) : this.props.children
      }
      </LeftPanelMain>
    );
  }
}
