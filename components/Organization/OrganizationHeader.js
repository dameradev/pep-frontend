import React from 'react';
import Link from 'next/link';

import { HeaderStyled } from './styles';
import { Tabs, Tab, Paper, AppBar } from '@material-ui/core';

// import icons from '../../utils/icons';

// const a11yProps = (index) => {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// };

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

      {/* <AppBar position="static" color="primary"> */}
      <Tabs
        className="organization__nav"
        value={props.value}
        onChange={props.handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        // aria-label="full width tabs example"
      >
        <Tab className="active" label="About us" />
        <Tab label="Our projects" />
        <Tab label="History" />
      </Tabs>
      {/* </AppBar>/ */}
      <ul>
        <li>
          {/* <Link
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
          </Link> */}
        </li>
      </ul>
      <div className="organization__stats">
        <p>2345 projects</p>
        <p>10+ upcoming projects</p>
      </div>
    </HeaderStyled>
  );
};

export default OrganizationHeader;

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
