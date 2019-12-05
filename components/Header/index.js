import React, { Component } from "react";
import { withRouter } from "next/router";
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
  background: ${props => props.router.route === "/" ? props.headerBgnColor ? props.theme.blue : "transparent" : props.theme.blue  };
  transition: background-color 0.5s ease-in-out;
  position: fixed;
  top: 0;
  z-index:100;
  width:100%;
  
  

  .header {
    width:1000px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content:space-between;

    .logo {
      color: ${props => props.headerBgnColor && "white"};
    }
  }
`;



class Header extends Component {
  
  state = {
    windowScroll: false
  }
  
  listenScrollEvent = (e) => {
      window.pageYOffset > 450 ? this.setState({windowScroll: true}) : this.setState({windowScroll: false});
  }

  componentDidMount() {
    
    window.addEventListener('scroll', this.listenScrollEvent, false);
  }  

  
  render() {
    const {router} = this.props;
    return (
      <HeaderStyles headerBgnColor={this.state.windowScroll} router={router} >
        {/* <LoginNav>
            <nav><p>For Organizations</p> <p>For Participants</p></nav>        
        </LoginNav> */}
        <div className="header" >
          <Logo />
          <Nav />
        </div>
      </HeaderStyles>
    );
  }
}

export default withRouter(Header);
