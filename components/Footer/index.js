import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from '../Logo';
import { TextField } from '@material-ui/core';
import icons from '../../lib/icons';
import { respondTo } from '../../lib/respondTo';

const FooterStyled = styled.div`
  /* height: 200px; */
  margin-top: 10rem;
  background: ${(props) => props.theme.blue};
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 2rem 5%;
  bottom: 0;
  width: 100%;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));

  justify-items: center;
  align-items: center;

  ${respondTo.laptop`
    grid-template-columns: repeat(auto-fit, minmax(39rem, 1fr));
  `}
  */

  ${respondTo.tabletMini`
    flex-direction: column;
    padding: 2rem 5rem;
  `}
  color: #fff;

  .nav-social {
    display: flex;
    align-items: flex-start;
    gap: 3rem;
    width: 60%;
    ${respondTo.tabletMini`
      flex-direction: column;
      align-items:center !important;
      width: 100%;
      margin-bottom: 3rem; 
    `}
  }

  .logo {
    color: #fff;
    line-height: 5rem;
    font-weight: 400;
    font-size: 2.4rem;
    text-transform: capitalize;
    ${respondTo.tabletMini`
      border-bottom: 1px solid #fff;
      margin: 0 -5rem;
      padding: 2rem 1rem;
    `}

    ${respondTo.mobileSmall`
      font-size: 2.2rem;
    `}
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: left;
    ${respondTo.tabletMini`
      text-align: center;
      ul {
        padding-top: 2rem;
      }
    `}
    width: 100%;
    a {
      color: #fff;
      font-size: 1.8rem;
    }
  }

  .social-media {
    ${respondTo.tabletMini`
      display: flex;
    
      span {
        display: none;
      }
      li {
        padding: 0 1rem;
      }
    `}
    li {
      display: flex;

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

  .contact {
    text-align: right;
    width: 40%;
    ${respondTo.tabletMini`
    width: 100%;
    text-align: center;
  `}
  }
`;

export default class Footer extends Component {
  render() {
    return (
      <FooterStyled>
        <div className="nav-social">
          <nav>
            <h3 className="logo">Platform for erasmus projects</h3>
            <ul>
              <li>
                <Link href="/organization">
                  <a>Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>About us</a>
                </Link>
              </li>

              <li>
                <Link href="/">
                  <a>FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>How it works</a>
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="social-media">
            <li>
              {icons.facebook} <span>Facebook</span>
            </li>
            <li>
              {icons.instagram} <span>Instagram</span>
            </li>
            <li>
              {icons.twitter} <span>Twitter</span>
            </li>
          </ul>
        </div>

        {/* <div className="contact"> */}
        {/* <div className="email">
          <label>Subscribe to our news letter</label>
          <input className="news-letter" placeholder="Email address" />
          <button>OK</button>
        </div> */}

        <div className="contact">
          <p>Heroja Bračiča 18, 2000 maribor</p>
          <p> +49 7531 8046845</p>
          <p> info@pep.com</p>
        </div>
        {/* </div> */}
      </FooterStyled>
    );
  }
}
