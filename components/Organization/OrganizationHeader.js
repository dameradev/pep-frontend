import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import icons from '../../utils/icons';
import { withRouter } from 'next/dist/lib/router';

const HeaderStyled = styled.div`
  /* margin: 10rem 0; */
  /* max-width: 120rem; */

  grid-column: full-start / full-end;
  display: grid;
  grid-template-columns: minmax(25rem, 1fr) minmax(25rem, 1fr) minmax(25rem, 1fr);
  grid-template-rows: 1fr min-content;
  background: #fff;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);

  .organization {
    &__cover {
      grid-row: 1 / 2;
      grid-column: 1/ 4;
      min-height: 20rem;
      background-image: url('https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1367&q=80');
      background-size: cover;

      /* filter: blur(0.1rem) contrast(-1rem); */
      transform: scaleX(-1);
      background-position: 0 28rem;
    }

    &__profile-picture {
      grid-row: 1/2;
      grid-column: 1/ 2;
      align-self: end;
      width: 12rem;
      height: 12rem;
      object-fit: contain;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      transform: translateY(50%) translateX(2.5rem);
      /* transform: translateY(-5rem); */
    }
    &__profile {
      padding: 8rem 0 3rem 2.5rem;
      z-index: 10;
      grid-column: 1 / 3;
      h3 {
        font-size: 3rem;
      }
      h4 {
        font-size: 1.6rem;
        color: #606060;
        font-weight: 200;
      }
    }

    &__contact {
      justify-self: end;
      padding: 3rem;
      font-size: 1.6rem;
      font-weight: 700;
      display: flex;
      flex-direction: column;

      button {
        margin-top: 1rem;
        border: none;
        border-radius: 5px;
        grid-column: 5 / 6;
        align-self: stretch;
        font-size: 1.2rem;
        padding: 1rem;
        background-color: #549bf0;
        color: #fff;
      }
    }

    &__nav {
      display: grid;
      grid-auto-flow: column;
      /* grid-gap: 1rem; */
      align-self: end;
      align-content: center;
      justify-content: start;
      align-items: center;
      grid-column: 1 / 3;
      /* justify-self: center; */
      margin: 0;
      li {
        padding: 1rem 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        cursor: pointer;
        span {
          margin-left: 2rem;
        }

        &:hover {
          color: #fff;
          background-color: #96c0d6;
        }
        &:active {
          transform: translateY(3px);
        }
      }
    }

    &__stats {
      grid-row: 3 /4;
      grid-column: 3 / 4;
      justify-self: end;
      padding: 2rem 2.5rem;
      font-size: 1.6rem;
      p {
        /* padding: 0.5rem 1rem;
        color: white;
        border-radius: 20px;
        background: #549bf0;
        margin-bottom: 0.5rem; */
      }
    }
  }
`;

const OrganizationHeader = (props) => {
  const { name, email, router } = props;
  console.log(props);
  return (
    <HeaderStyled>
      <div className="organization__cover">&nbsp;</div>
      <img
        className="organization__profile-picture"
        src="https://www.logogenie.net/download/preview/medium/5319421"
      />
      <div className="organization__profile">
        <h3>{name}</h3>
        <h4>Training and Networking Transnational Youth Initiatives Strategic Partnerships</h4>
      </div>

      <div className="organization__contact">
        <p>{email}</p>
        <button>View Website</button>
      </div>
      <ul className="organization__nav">
        <li>
          <Link
            href={{
              pathname: router.pathname,
              query: { id: router.query.id, path: 'about' },
            }}
          >
            <a>
              {icons.aboutOrganization}
              <span>About us</span>
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: router.pathname,
              query: { id: router.query.id, path: 'projects' },
            }}
          >
            <a>
              {icons.projectsOrganization}
              <span>Projects</span>
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: router.pathname,
              query: { id: router.query.id, path: 'history' },
            }}
          >
            <a>
              {icons.historyOrganization}
              <span>History</span>
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: router.pathname,
              query: { id: router.query.id, path: 'partner' },
            }}
          >
            <a>
              {icons.partnerOrganization}
              <span>Become a Partner</span>
            </a>
          </Link>
        </li>
      </ul>
      <div className="organization__stats">
        <p>2345 projects</p>
        <p>10+ upcoming projects</p>
      </div>
    </HeaderStyled>
  );
};

export default withRouter(OrganizationHeader);

{
  /* <div className="organization-description">
<div>
  <h3>About us</h3>
  <p>
    We are active in implementation of sport activities for kids, youth and adults and we
    operate both, on: INTERNATIONAL LEVEL - we cooperate with sport organisations and clubs
    from other countries and organize together various international sport events and
    projects, share together the best practices in sport and adapt international regulations
    and rules in sports. Examples of the projects are bellow. NATIONAL LEVEL – we organize
    various sport events in order to inspire people to live heathy life through sport. We
    also cooperate with local and international authorities, local sport clubs and provide
    support and know-how for teachers at school and outside of the school too. Slovak Sport
    Organisatio
  </p>
</div>
<div>
  <h3>Our goals</h3>
  <p>
    Our main goals are: - to encourage and stimulate people to be physically active; - to
    spread awareness of important role of sport in healthy lifestyle and as a prevention of
    non-communicative diseases (e.g. cardiovascular, cancer, depression etc.); - to promote
    education through sport and sport as important non-formal education tool; - to raise
    awareness of general EU principles like respect, tolerance and equality through sport.;
    - to eliminate social, cultural and other barriers, which can prevent people to be
    physically active; - to contribute to effective use of financial resources and grants
    intended for sport; - to initiate debate and support the development of sport
    infrastructure and facilities.
  </p>
</div>
</div> */
}
