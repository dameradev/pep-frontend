import React, { Component } from "react";
import styled from "styled-components";

import Nav from "../Nav";
import Logo from "../Logo";

const LoginNav = styled.header`
  background: ${props => props.theme.blue};
  width: 100%;
  height: 20px;
  font-size: 1rem;
  color: white;

  nav {
    width: ${props => props.theme.maxWidth};
    text-align: right;
  }  
`;

const HeaderStyles = styled.header`
  height: 100px;
  /* border-bottom: 2px solid ${props => props.theme.blue}; */
  /* box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.08); */
  position: fixed;
  z-index:100;
  width:100%;
  
  .header {
    width:1000px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content:space-between;
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderStyles>
        {/* <LoginNav>
            <nav><p>For Organizations</p> <p>For Participants</p></nav>        
        </LoginNav> */}
        <div className="header">
          <Logo />
          <Nav />
        </div>
      </HeaderStyles>
    );
  }
}

export default Header;
