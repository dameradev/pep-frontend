import styled from 'styled-components';

export const OrganizationStyles = styled.div`
  display: grid;

  grid-template-columns:
    [full-start]
    minmax(6rem, 1fr) [center-start]repeat(8, [col-start] minmax(min-content, 18rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];

  grid-gap: 3rem;
  .organization {
    &__sidebar {
      grid-row: 2 / 3;
    }

    &__similar {
    }
  }
  .organization-details {
    display: flex;
    flex-direction: column;

    border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
    padding-bottom: 3rem;
    margin-bottom: 3rem;

    .organization-header {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name-details {
        display: flex;
        align-items: center;
      }
      img {
        margin-right: 1.5rem;
      }
    }

    .organization-description {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      text-align: justify;
      div {
        width: 45%;
      }
    }
  }

  .projects-title {
    text-align: center;
  }

  .project-details {
    .project-header {
      padding-bottom: 2rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
    }
    .description {
      width: 60%;
      h5 {
        font-size: 1.5rem;
      }
      p {
        text-align: justify;
        font-size: 1.3rem;
      }
    }

    &__container {
      display: flex;
      justify-content: space-between;
      .location-date {
        p {
          font-style: italic;
          text-align: right;
          font-size: 1.2rem;
        }
      }
    }
  }

  .project-rightpanel {
    /* min-height: 80vh; */

    border: 1px solid ${(props) => props.theme.borderColorPrimary};
    &__header {
      button {
        width: 50%;
        outline: none;
        padding: 2rem;
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
        color: white;
        background: ${(props) => props.theme.red};
        font-size: 1.3rem;
        font-weight: 200;
        &:first-of-type {
          border-right: 1px solid ${(props) => props.theme.borderColorPrimary};
          background: ${(props) => props.theme.blue};
        }
      }
    }
  }

  .rightpanel-title {
    padding-top: 1rem;
    text-align: center;
  }

  .tab {
    grid-column: col-start 2 / col-end 6;
    div {
      padding: 0;
    }
  }

  /* width: 80%;
  margin: 0 auto; */
  ul {
    /* padding: 20px; */
  }
`;

export const HeaderStyled = styled.div`
  /* margin: 10rem 0; */
  /* max-width: 120rem; */

  grid-column: center-start / center-end;
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
      border: 1px solid ${(props) => props.theme.borderColorPrimary};
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
        color: ${(props) => props.theme.darkGrey1};
        font-weight: 200;
      }
    }

    &__contact {
      grid-row: 2/3;
      grid-column: 3/4;
      justify-self: start;
      padding: 3rem;
      font-size: 1.6rem;
      font-weight: 700;
      display: flex;
      display: none;
      flex-direction: column;

      button {
        margin-top: 1rem;
        border: none;
        border-radius: 5px;
        grid-column: 5 / 6;
        align-self: stretch;
        font-size: 1.2rem;
        padding: 1rem;
        background-color: ${(props) => props.theme.blue};
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
      grid-row: 3 / 4;
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
          background-color: ${(props) => props.theme.blue};
        }
        &:active {
          transform: translateY(3px);
        }
      }
    }

    &__stats {
      grid-row: 2/3;
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

export const SidebarStyled = styled.aside`
  grid-row: 2 / 3;
  grid-column: center-start/ col-end 1;
  /* box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1); */
  border: 1px solid ${(props) => props.theme.borderColorPrimary};
  background: #fff;
  border-radius: 10px;
  /* margin-top: 2.5rem; */
  padding: 1.5rem 3rem;

  h1 {
    padding: 1rem 0 2rem 0;
    margin-bottom: 1.5rem;
    font-weight: 100;
    border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
  }
  /* color: #808080; */
  ul {
    margin: 0;
    li {
      /* text-transform: uppercase; */
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      h3 {
        color: ${(props) => props.theme.darkGrey1};
        font-weight: 100;
        font-size: 1.6rem;
      }

      /* align-items: center; */
    }
  }
`;

export const SimilarOrganizationStyled = styled.aside`
  grid-column: col-start 7 / center-end;
  h1 {
    font-weight: 100;
    font-size: 2rem;
    width: 100%;
    white-space: nowrap;
    text-transform: uppercase;
  }
  .similar_organizations {
    display: grid;

    grid-gap: 2rem;
    &__item {
      display: grid;
      grid-template-columns: max-content max-content;
      grid-row-gap: 1rem;
      grid-column-gap: 2rem;
      align-items: end;
      justify-content: start;

      img {
        border-radius: 50%;
        width: 8rem;
        height: 8rem;
        grid-row: 1/3;
        box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
      }

      h3 {
        line-height: 1.8rem;
        font-size: 2rem;
        font-weight: 100;
        align-self: end;
      }
      p {
        align-self: start;
        line-height: 1.8rem;
        font-size: 1.6rem;
        color: ${(props) => props.theme.lightGrey1};
      }
    }
  }
`;
