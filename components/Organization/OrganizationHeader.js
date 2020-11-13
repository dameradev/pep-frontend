import React from 'react';
import Link from 'next/link';

import { HeaderStyled } from './styles';
import { Tabs, Tab, TextField } from '@material-ui/core';

// import icons from '../../utils/icons';

// const a11yProps = (index) => {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// };

const OrganizationHeader = (props) => {
  const { id, name, email, edit: editValue, slogan, handleChange, handleTabChange, value } = props;
  // console.log(editValue, 'damae');
  return (
    <HeaderStyled className={props.className}>
      <div className="organization__cover">&nbsp;</div>
      <img
        className="organization__profile-picture"
        src="https://www.logogenie.net/download/preview/medium/5319421"
      />
      <div className="organization__profile">
        {editValue === 'false' ? (
          <h3>{name ? name : 'Your name here'}</h3>
        ) : (
          <TextField
            className="form__input"
            type="text"
            onChange={(e) => handleChange(e)}
            value={name}
            name="name"
            placeholder="Organization name"
            label="Organization name"
            variant="outlined"
          />
        )}
        {editValue === 'false' ? (
          <h4>{slogan ? slogan : 'Your slogan here'}</h4>
        ) : (
          <TextField
            className="form__input"
            type="text"
            onChange={(e) => handleChange(e)}
            value={slogan}
            name="slogan"
            placeholder="Your slogan"
            label="Your slogan"
            variant="outlined"
          />
        )}
      </div>

      <div className="organization__contact">
        <p>{email ? email : 'Your email here'}</p>
        {console.log(email, 'email')}
        <button>View Website</button>
      </div>

      {/* <AppBar position="static" color="primary"> */}
      <Tabs
        className="organization__nav"
        value={value}
        onChange={handleTabChange}
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

      <div className="organization__stats">
        <p>2345 projects</p>
        <p>10+ upcoming projects</p>
      </div>

      {editValue === 'false' ? (
        <Link
          href={{
            pathname: `/organization`,
            query: { id, edit: editValue === 'false' ? true : false },
          }}
        >
          <a className="organization__edit">
            {editValue === 'true' ? 'Save changes' : 'Edit page'}
          </a>
        </Link>
      ) : (
        <button className="organization__edit">Save page</button>
      )}
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
