import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  colors,
  Drawer,
  Divider,
  List,
  IconButton,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';
import { withRouter } from 'next/router';
import Nav from '../Nav';
const MuiTheme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: colors.blue[800],
    },
    // secondary: green,
  },
});

const theme = {
  whiteGray: '#f2f2f2',
  black: '#393939',
  grey: '#3A3A3A',
  blue: '#1565c0',
  red: '#FF5964',
  borderColorPrimary: '#ccc',
  lightGrey1: '#a0a0a0',
  offWhite: '#EDEDED',
  darkGrey1: '#606060',

  hoverBlue: '#11529c',
  hoverRed: '#b83d44',

  transitionAll: 'all 0.3s',

  maxWidth: '70%',
  bs: '0 1rem 3rem rgba(0, 0, 0, 0.1);',
  containerMaxHeight: 'calc(100vh - 70px)',
};

const StyledPage = styled.div`
  background: #f5f5f5;
  position: relative;
  min-height: 100vh;
  color: ${(props) => props.theme.black};
  padding-top: ${(props) => props.router.route !== '/' && '70px'};

  .mobile-nav {
    flex-direction: column;
    /* align-items: flex-start; */
    width: 100%;
    /* text-align: left; */
    /* padding: 2rem; */

    a {
      padding: 1rem 3rem;
      text-transform: uppercase;
      font-size: 1.6rem;
      text-decoration: none;
      color: grey;
      /* box-shadow: ${(props) => props.theme.bs}; */
      /* border-bottom: 1px solid ${(props) => props.theme.colorPrimary}; */
      &:last-of-type {
        /* margin-bottom: 1rem; */
      }
    }
    button {
      margin: 0;
      border-radius: 0;
      height: 5rem;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    
    /* font-family: 'Roboto', sans-serif; */
    font-family: 'Poppins', sans-serif;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    /* font-family: 'Roboto'; */
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 2;
    /* font-family: 'Roboto'; */
    font-family: 'Poppins', sans-serif;
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
    margin: 0;
  }

`;

const Page = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = (open) => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={MuiTheme}>
        <StyledPage router={props.router}>
          <GlobalStyle />
          <Meta />
          <Header handleDrawerToggle={handleDrawerToggle} drawerOpen={open} />
          <Drawer className="drawer" variant="persistent" anchor="right" open={open}>
            <div className="cancel-icon-container">
              <IconButton className="cancel-icon" onClick={() => handleDrawerToggle(open)}>
                <Cancel />
              </IconButton>
            </div>

            <Divider />
            <List>
              <Nav className="mobile-nav" />
            </List>
          </Drawer>
          {props.children}
          {/* <Footer /> */}
        </StyledPage>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};
export default withRouter(Page);
