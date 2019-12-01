import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

const Navigation = styled.nav`
  
  display:flex;
  align-items:center;
  a {
    padding-left: 2rem;
    font-size: 1.2rem;
  }
`;

class Nav extends Component {
  render() {
    return (
      <Navigation>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </Navigation>
    );
  }
}

export default Nav;
