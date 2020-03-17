import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal, css } from 'styled-components';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';
import { withRouter } from 'next/router';

const theme = {
  red: '#FF5964',
  whiteGray: '#f2f2f2',
  black: '#393939',
  grey: '#3A3A3A',
  blue: '#2F5DA8',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  containerMaxHeight: 'calc(100vh - 84px)'
};

const StyledPage = styled.div`
  background: white;
  position: relative;
  min-height: 100vh;
  color: ${props => props.theme.black};
  padding-top: ${props => props.router.route !== '/' && '100px'};
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,200i,300,300i,400,600,600i&display=swap');
  }
  
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
  ul {
    list-style: none;
    padding: 0;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage router={this.props.router}>
          <Meta />
          <Header />
          {this.props.children}
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}
export default withRouter(Page);
