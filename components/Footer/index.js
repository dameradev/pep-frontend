import React, { Component } from 'react';
import styled from 'styled-components';

const FooterStyled = styled.div`
  height: 200px;
  background: ${props => props.theme.blue};
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 20px;
  position: absolute;
  /* left: 0; */
  bottom: 0;
  width: 100%;
`;

export default class Footer extends Component {
  render() {
    return (
      <FooterStyled>
        <div className="footer-inner">
          <h1>Footer</h1>
        </div>
      </FooterStyled>
    );
  }
}
