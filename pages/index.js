import { useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';

import Icons from '../lib/icons';

import SearchBox from '../components/SearchBox';

import ButtonStyled from '../components/styles/ButtonStyled';

import { respondTo } from '../lib/respondTo';

const Hero = styled.div`
  width: 100%;

  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('https://res.cloudinary.com/dvvbls283/image/upload/v1607011525/hykvzkdzun6mjjjbltoq.webp');
  background-size: cover;
  background-position: bottom;
  .hero-inner {
    width: ${(props) => props.theme.maxWidth};
    height: 100%;
    width: 100%;

    min-height: 65vh;

    padding: 10rem 10% 0 10%;
    display: flex;
    justify-content: space-between;

    ${respondTo.tablet` 
      flex-direction: column;
      min-height: unset;
    `}

    ${respondTo.mobilePortrait` 
        padding: 10rem 0 0 0;
        
      `};

    .searchbox-container {
      height: fit-content;
      align-self: flex-end;
      max-width: 40rem;
      padding: 3rem;
      color: white;
      background: rgba(47, 93, 168, 0.5);
      text-align: center;
      overflow: hidden;

      display: flex;
      flex-direction: column;
      .form-input {
        margin: 0.5rem 0;
        border-color: #fff;
        text-align: left;
        label,
        svg,
        .MuiInputBase-input {
          color: #fff;
        }
        p {
          color: #8a8a8a;
        }
        .MuiInput-underline:before {
          color: #fff;
          border-color: #fff;
        }
      }
      /* align-items: flex-start; */
      ${respondTo.tablet` 
        width: 100%;
        align-self: center;
      `};

      h2 {
        align-self: flex-start;
        font-weight: 300;
        padding: 1rem 0;
      }
      select {
        display: block;
        width: 100%;
        height: 4rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        border-radius: 10px;
        border: none;
        color: ${(props) => props.theme.darkgrey1};
        padding: 0.5rem 1rem;
        box-shadow: 0px 3px 6px #00000029;
        background: #fff;

        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        appearance: none;
      }
    }
    .left-panel {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3rem;
      ${respondTo.tablet`
          flex-direction: row;
        `}
      ${respondTo.tabletMini`
          align-items: center;
          justify-content:center;
          h1 {
            text-align:center;
          }
        `}
      h1 {
        color: #fff;
        text-transform: capitalize;
        font-size: 4rem;
        font-weight: 400;
        ${respondTo.tablet`
          justify-self: center;
        `}
        ${respondTo.laptopSmall`
          font-size: 3rem;
        `}
      }
      .buttons-container {
        /* ${respondTo.tablet`
          display: none;
        `} */
        ${respondTo.tabletMini`
          display: none;
        `}
      }
      a {
        display: flex;
        flex-direction: column;
        button {
          width: 30rem;
        }
      }

      padding-bottom: 5rem;
      ${respondTo.mobilePortrait` 
        // display: none;
      `}
    }
  }
`;

const BubblesStyled = styled.div`
  /* height: 250px; */
  background: white;

  .MuiPaper-root {
    padding: 3rem;
  }

  .bubbles-list {
    width: ${(props) => props.theme.maxWidth};

    margin: 10rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${respondTo.tabletMini` 
      flex-direction: column;

    `}
    li {
      /* margin: 2rem 0; */
      width: 20rem;
      height: 25rem;
      display: grid;
      /* flex-direction: column; */
      align-items: center;
      justify-content: center;
      justify-items: center;
      font-size: 2rem;
      /* justify-content: space-between; */
      text-align: center;
      align-items: center;

      grid-template-columns: 1fr;
      /* grid-auto-flow: dense; */
      div {
        /* width: 80%; */
        /* display: flex;
        align-items: center;
        justify-content: center; */

        .bubbles-icon {
          align-self: center;
          svg {
            width: 10rem;
            height: 10rem;

            /* padding: 20px; */
          }
          /* padding: 20%; */
        }
      }
      p {
        /* width: 150px; */
        /* height: 50px; */
        color: ${(props) => props.theme.blue};
      }
    }
  }
`;

const FactsStyled = styled.div`
  /* height: 300px; */
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.blue};
  color: white;
  .facts-inner {
    width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    /* padding-top: 5rem; */
    text-align: center;
  }
`;

const Testamonials = styled.div`
  .testamonials-inner {
    width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    padding: 5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10rem;

    ${respondTo.tabletMini` 
      flex-direction: column;
      
    `}
    div {
      /* width: 45%; */
      padding: auto;
      i {
        font-size: 20rem;
        width: 200px;
      }
      p {
        text-align: justify;
        font-size: 1.3rem;
        font-style: italic;
        font-weight: 100;
      }
    }
    .image-container {
      text-align: right;
    }
  }
`;

const Home = (props) => {
  const [what, setWhat] = React.useState(false);
  const [how, setHow] = React.useState(false);
  const [faq, setFaq] = React.useState(false);

  const handleClickOpen = (dialog) => {
    switch (dialog) {
      case 'what':
        setWhat(true);
        break;
      case 'how':
        setHow(true);
        break;
      case 'faq':
        setFaq(true);
        break;
    }
  };
  const handleClose = () => {
    setWhat(false);
    setHow(false);
    setFaq(false);
  };
  return (
    <>
      <Hero>
        <div className="hero-inner">
          <div className="left-panel">
            <h1>Platoform for erasmus Projects</h1>
            <div className="buttons-container">
              <Link
                href={{
                  pathname: '/auth',
                  query: { path: 'register', user: 'organization' },
                }}
              >
                <a>
                  <ButtonStyled
                    className="button"
                    bgColor="blue"
                    padding="1rem 2rem"
                    hover={(props) => props.theme.hoverBlue}
                  >
                    Sign up as an Organization
                  </ButtonStyled>
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/auth',
                  query: { path: 'register', user: 'participant' },
                }}
              >
                <a>
                  <ButtonStyled
                    className="button"
                    bgColor="red"
                    padding="1rem 2rem"
                    margin="1rem 0 0 0"
                    hover={(props) => props.theme.hoverRed}
                  >
                    Sign up as a Participant
                  </ButtonStyled>
                </a>
              </Link>
            </div>
          </div>

          <SearchBox />
        </div>
      </Hero>
      {/* <Inner> */}
      <BubblesStyled>
        <ul className="bubbles-list">
          <li onClick={() => handleClickOpen('what')}>
            <div>
              <span className="bubbles-icon">{Icons.whatAbout}</span>
            </div>
            <p>What is PEP about?</p>
          </li>
          <li onClick={() => handleClickOpen('how')}>
            <div>
              <span className="bubbles-icon">{Icons.howItWorks}</span>
            </div>
            <p>How it works</p>
          </li>
          <li onClick={() => handleClickOpen('faq')}>
            <div>
              <span className="bubbles-icon">{Icons.questionMark}</span>
            </div>
            <p>FAQ</p>
          </li>
        </ul>
        <Dialog
          className="dialog"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={what}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            What is our platform about
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              "Platform for Erasmus Projects (PEP)" is a brand new online platform, established in
              2021, that provides services for connecting organizations and individuals, in order to
              make it easier for the organizations to find participants for their Erasmus+ projects
              and to help individuals to find the perfect project for themselves.
            </Typography>
            <Typography gutterBottom>
              It is available for all types of Erasmus+ projects. It is very simple to use, and it
              is the fastest way to find participants/projects and the best part... <br />
              <b>IT IS FREE OF CHARGE!</b>
            </Typography>
            <Typography gutterBottom></Typography>
          </DialogContent>
        </Dialog>
        <Dialog
          className="dialog"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={how}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            How it works
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              We are a place where organizations and individuals meet. On our platform, as an
              individual can just register and create your profile and then simply begin to look for
              a project that will become your best Erasmus+ experience.
            </Typography>
            <Typography gutterBottom>
              For organizations works the same way, with registration and creating your profile you
              can provide information about your organization and start publishing your projects and
              looking for potential participants.
            </Typography>
          </DialogContent>
        </Dialog>
        <Dialog
          className="dialog"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={faq}
        >
          Faq
        </Dialog>
      </BubblesStyled>
      <FactsStyled>
        <div className="facts-inner">
          <h1>Did you know?</h1>
          <p>
            Erasmus+, now already in its second year, has started delivering promising results,
            including a higher recognition rate for ECTS credits earned abroad by students, a higher
            quality of mobility with better linguistic preparation and better accessibility. By
            removing barriers to mobility,{' '}
          </p>
        </div>
      </FactsStyled>
      <Testamonials>
        <div className="testamonials-inner">
          <div>
            <h1>Social Impact Association</h1>
            <p>
              With the art of mosaic, we aim to raise the social entrepreneurship skills of young
              people and increase their cultural awareness. We will examine examples of mosaic art
              belonging to different civilizations in different countries. We will conduct a survey
              in the mosaic museums in our region. Our young people will prepare their own works
              with mosaic art.
            </p>
          </div>
          <div className="image-container">
            {/* <img src="https://seeklogo.com/images/O/organization-logo-5FDB60F08E-seeklogo.com.png" /> */}
          </div>
        </div>
      </Testamonials>
      {/* </Inner> */}
    </>
  );
};

export default Home;
