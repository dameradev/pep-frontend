import React, { Component } from 'react'
import styled from  "styled-components"

const FooterStyled = styled.div`
  height: 200px;
  background: ${props => props.theme.blue};
`;

export default class Footer extends Component {

  render() {
    return ( 
      <FooterStyled>
        <div className="footer-inner">
          <h1>Footer</h1>
        </div>
      </FooterStyled>
    )
  }
}
