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
    secondary: {
      main: '#fff',
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
  orange: '#FFA63E',
  green: '#89D676',
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
  /* background: #f5f5f5; */
  /* position: relative; */
  min-height: 100vh;
  color: ${(props) => props.theme.black};
  padding-top: ${(props) => props.router.route !== '/' && '70px'};

  ${(props) =>
    props.open &&
    `&::after {
    content: '';
    background: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }`}

  .drawer {
    overflow: hidden !important;
  }
  .mobile-nav {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 15rem;

    a {
      padding: 0 2rem;
      text-transform: uppercase;
      font-size: 1.6rem;
      text-decoration: none;
      color: grey;
      margin-left: 0;
      width: 100%;
      text-align: left;

      display: flex;
      align-items: center;

      height: 4rem;
      border-bottom: none;
      position: relative;

      &.active {
        color: ${(props) => props.theme.red};
        &:after {
          content: '';
          height: 4rem;
          width: 1.5rem;
          background: ${(props) => props.theme.red};
          opacity: 0.6;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .signout-button {
      /* position: absolute; */
      margin: 0;
      margin-top: 2rem;
      /* bottom: 0; */
      /* left: 0; */
      width: 100%;
      height: max-content;
      text-transform: uppercase;
      border-radius: 0 !important;
      overflow: hidden;
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
        <StyledPage
          router={props.router}
          open={open}
          onClick={() => {
            if (open) {
              handleDrawerToggle(true);
            }
          }}
        >
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

            <Nav className="mobile-nav" />
          </Drawer>
          {props.children}
          <Footer />
        </StyledPage>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};
export default withRouter(Page);
