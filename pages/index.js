import Link from 'next/link';
import styled from 'styled-components';
import Icons from '../utils/icons';

import SearchBox, { ButtonStyled } from '../components/SearchBox';

const Hero = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWptHL?ver=3e39&q=90&m=2&h=768&w=1024&b=%23FFFFFFFF&aim=true');
  background-size: cover;
  .hero-inner {
    width: ${props => props.theme.maxWidth};
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    div {
      width: 45%;
    }
    .buttons-container {
      padding-top: 5rem;
      a {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }

    .searchbox-container {
      height: 100%;
      padding: 20px;
      color: white;
      background: rgba(47, 93, 168, 0.5);
      text-align: center;
      select {
        display: block;
        width: 100%;
        height: 4rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      button {
        width: 50%;
        margin: 1rem auto;
        background: ${props => props.theme.red};
        border: 3px solid ${props => props.theme.red};
      }
    }
  }
`;

const BubblesStyled = styled.div`
  /* height: 250px; */
  background: white;

  .bubbles-list {
    width: ${props => props.theme.maxWidth};

    padding: 5rem 0 10rem 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      /* margin: 2rem 0; */
      width: 200px;
      display: flex;
      flex-direction: column;
      /* justify-content: space-between; */
      text-align: center;
      align-items: center;
      div {
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;

        .bubbles-icon {
          align-self: center;
          svg {
            width: 80%;
            padding: 20px;
          }
          /* padding: 20%; */
        }
      }
      p {
        /* width: 150px; */
        /* height: 50px; */
        color: ${props => props.theme.blue};
      }
    }
  }
`;

const FactsStyled = styled.div`
  height: 300px;
  background: ${props => props.theme.blue};
  color: white;
  .facts-inner {
    width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding-top: 5rem;
    text-align: center;
  }
`;

const Testamonials = styled.div`
  .testamonials-inner {
    width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 45%;
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

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const Home = props => {
  return (
    <div>
      <Hero>
        <div className="hero-inner">
          <SearchBox />
          <div className="buttons-container">
            <Link href="/organization">
              <a>
                <ButtonStyled className="button" btnColor={props => props.theme.blue}>
                  Sign up as an Organization
                </ButtonStyled>
              </a>
            </Link>
            <Link href="/projects">
              <a>
                <ButtonStyled className="button" btnColor={props => props.theme.red}>
                  Sign up as a Participant
                </ButtonStyled>
              </a>
            </Link>
          </div>
        </div>
      </Hero>
      {/* <Inner> */}
      <BubblesStyled>
        <ul className="bubbles-list">
          <li>
            <div>
              <span className="bubbles-icon">{Icons.whatAbout}</span>
            </div>
            <p>What is Youth Network about?</p>
          </li>
          <li>
            <div>
              <span className="bubbles-icon">{Icons.howItWorks}</span>
            </div>
            <p>How it works</p>
          </li>
          <li>
            <div>
              <span className="bubbles-icon">{Icons.questionMark}</span>
            </div>
            <p>Frequently Asked Questions</p>
          </li>
        </ul>
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
            <img src="https://seeklogo.com/images/O/organization-logo-5FDB60F08E-seeklogo.com.png" />
          </div>
        </div>
      </Testamonials>
      {/* </Inner> */}
    </div>
  );
};

export default Home;
