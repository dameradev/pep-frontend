import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from '../Logo';
import { TextField } from '@material-ui/core';
import icons from '../../utils/icons';

const FooterStyled = styled.div`
  height: 200px;
  margin-top: 10rem;
  background: ${(props) => props.theme.blue};
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 2rem 10%;
  bottom: 0;
  width: 100%;

  display: flex;
  justify-content: space-between;

  color: #fff;

  .logo {
    color: #fff;
    h1 {
      line-height: 3rem !important;
    }
  }

  nav {
    text-align: left;

    a {
      color: #fff;
      font-size: 1.8rem;
    }
  }

  .social-media {
    li {
      display: flex;
      /* align-items: center; */
      span {
        padding-left: 1rem;
      }
      svg {
        padding-right: 1rem;
        width: 3rem;
        height: 3rem;
      }
    }
  }

  .email {
    /* padding: 2rem 0; */
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 1.6rem;
    position: relative;
    min-width: 30rem;
    label {
      line-height: 3rem;
    }
    color: #fff;

    button {
      position: absolute;
      right: 0;
      top: 3rem;
      height: 5rem;
      width: 8rem;
      background: white;
      border: none;
      color: ${(props) => props.theme.blue};
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .news-letter {
    border: 1px solid #fff;
    background: transparent;
    height: 5rem;
    width: 100%;
    padding: 0 1rem;
    font-size: 1.8rem;
    border-radius: 5px;
    color: #fff;
    &::placeholder {
      color: #fff;
      /* padding: 0 1rem; */
    }
  }

  .contact {
    /* text-align: right; */
    width: 40%;
    /* align-self: flex-end; */
    p {
      width: fit-content;
      margin-left: auto;
    }
  }
`;

export default class Footer extends Component {
  render() {
    return (
      <FooterStyled>
        <Logo />
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>About us</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/organization">
                <a>Terms & Conditions</a>
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="social-media">
          <li>{icons.facebook} Facebook</li>
          <li>{icons.instagram} Instagram</li>
          <li>{icons.twitter} Twitter</li>
        </ul>
        <div className="email">
          <label>Subscribe to our news letter</label>
          <input className="news-letter" placeholder="Email address" />
          <button>OK</button>
        </div>

        <div className="contact">
          <p>Macairestraße 4, 78467 Konstanz, Germany</p>
          <p> +49 7531 8046845</p>
          <p> info@pep.com</p>
        </div>
      </FooterStyled>
    );
  }
}
