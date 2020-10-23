import React, { Component } from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';

const LogoStyles = styled.div`
  /* width: 60px; */

  .logo {
    color: ${(props) => (props.router.route !== '/' ? 'white' : props.theme.blue)};
    /* font-style: italic; */
    font-family: inherit;
    text-transform: uppercase;
    font-weight: 100;
    background: ${(props) => props.pathname};
  }
  img {
    width: 100%;
  }
`;

class Logo extends Component {
  render() {
    return (
      <LogoStyles router={this.props.router}>
        <h1 className="logo">PEP</h1>
        {/* <img src="../../static/logo.png" /> */}
      </LogoStyles>
    );
  }
}

export default withRouter(Logo);
