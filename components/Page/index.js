import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';
import { withRouter } from 'next/router';

const MuiTheme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
});

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
  containerMaxHeight: 'calc(100vh - 84px)',
};

const StyledPage = styled.div`
  background: #f5f5f5;
  position: relative;
  min-height: 100vh;
  color: ${(props) => props.theme.black};
  padding-top: ${(props) => props.router.route !== '/' && '70px'};
`;

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    /* font-family: 'Raleway' sans-serif; */

    /* @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,600;1,100;1,200&display=swap'); */
    font-family: 'Roboto', sans-serif;
    
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'); */


  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Roboto';
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 2;
    font-family: 'Roboto';
    color: #505050;
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
  /* button {  font-family: 'radnika_next'; } */
  ul {
    list-style: none;
    padding: 0;
  }

`;

// injectGlobal`
//   `;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={MuiTheme}>
          <StyledPage router={this.props.router}>
            <GlobalStyle />
            <Meta />
            <Header />
            {this.props.children}
            <Footer />
          </StyledPage>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}
export default withRouter(Page);
