import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.div`
  margin: 10rem auto;
  max-width: 120rem;

  display: grid;
  grid-template-columns: minmax(25rem, 1fr) minmax(25rem, 1fr);
  grid-template-rows: 1fr min-content;

  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);

  color: #606060;
  .organization {
    &__cover {
      grid-row: 1 / 2;
      grid-column: 1/ 3;
      min-height: 20rem;
      background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2704&q=80');
      background-size: cover;
      background-position: 0;
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
  }
`;

const OrganizationHeader = (props) => {
  const { name, email } = props;
  return (
    <HeaderStyled>
      <div className="organization__cover">&nbsp;</div>
      <img
        className="organization__profile-picture"
        src="https://www.logogenie.net/download/preview/medium/5319421"
      />
      <div className="organization__profile">
        <h3>{name}</h3>
      </div>
      <div className="organization__contact">
        <p>{email}</p>
        <button>View Website</button>
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
