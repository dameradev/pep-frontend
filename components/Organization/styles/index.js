import styled from 'styled-components';

import { respondTo } from '../../../lib/respondTo';

export const OrganizationStyles = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .tab {
    width: 100%;
  }
  .organization {
    &__header {
    }
    &__main {
      width: 100%;

      display: flex;
      margin: 2rem auto;
      padding: 0 5%;
      gap: 3rem;

      ${respondTo.tabletMini` 
        flex-direction:column;
      `}
    }

    &__about-us {
      ${respondTo.tabletMini` 
        margin-top:0;
      `}
    }
    &__sidebar {
    }
    &__similar {
      ${respondTo.laptopSmall` 
        
      `}
    }

    &__summary {
      width: 100%;
      textarea {
        padding: 1rem;
      }
    }

    &__info {
      max-width: 100%;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      padding: 0 4rem;
      border-radius: 10px;

      ${respondTo.tabletMini` 
        padding: 0;
        box-shadow:none;
      `}
    }
  }
`;

export const HeaderStyled = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  background: #fff;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);

  .form {
    &__input {
      margin-top: 2rem;

      .MuiOutlinedInput-root fieldset {
        border-color: #fff;
      }
      label {
        color: #fff;
      }
      input {
        color: #fff;
        border-color: #fff;
      }
      &:nth-of-type(2) {
        margin-left: 2rem;

        width: 30rem;
      }
    }
  }

  .header {
    &__profile {
      padding: 0 3rem;
      display: flex;
      align-items: flex-end;
      background: ${(props) => props.theme.blue};
      color: #fff;
      position: relative;
      ${respondTo.tabletMini` 
        flex-direction:column;
        align-items: center;
        text-align: center;
        padding: 1rem 0;
      `}

      h3 {
        font-size: 3rem;
        line-height: 3rem;
        font-weight: 400;
      }
      h4 {
        font-size: 1.6rem;
        font-weight: 200;
      }
    }
    &__profile-picture {
      width: 17rem;
      height: 17rem;
      object-fit: cover;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      bottom: -4rem;

      ${respondTo.tabletMini` 
        position: static;
      `}
    }

    &__profile-headers {
      padding: 10rem 0 1rem 19rem;

      ${respondTo.tabletMini` 
        padding: 2rem 0 4rem 0;
      `}
    }

    &__edit {
      width: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      border: 2px solid #fff;
      background: #fff;
      border-radius: 5px;
      transition: all 0.2s;
      position: absolute;
      top: 1rem;
      right: 2rem;
      &:active {
        transform: translateY(2px);
      }
    }
    &__bottom {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: #fafafa;
      box-shadow: 0px 3px 6px #00000029;
      height: max-content;
      ${respondTo.tabletMini` 
        justify-content: center;
      `}
    }
    &__nav {
      &__item {
        min-width: fit-content;
      }
    }
  }
`;

export const SectionStyles = styled.section`
  height: fit-content;

  padding: 2rem;
  border-radius: 5px;
  margin-bottom: 2rem;

  background: ${(props) => props.focusedOn && '#F7F7F7'};
  margin: ${(props) => props.focusedOn && '0 -2rem'};
  padding: ${(props) => props.focusedOn && '2rem 6rem'};

  h3 {
    padding-bottom: 1rem;
    margin-bottom: 2rem;

    font-weight: 500;
    font-size: 4rem;
    color: #585858;
    position: relative;
    z-index: 1;
    display: inline-block;
    &::before {
      content: '-';
      position: absolute;
      left: -3rem;
      ${respondTo.tabletMini`   
      left: 0;
    `}
    }
    &::after {
      content: '';
      background: ${(props) => props.theme.red};
      position: absolute;
      bottom: 2.2rem;
      z-index: -1;
      right: -1rem;
      height: 2rem;
      width: 10rem;
      opacity: 0.8;
    }
    ${respondTo.tabletMini`   
      padding:0 3rem;
    `}
  }
  p {
    color: #95989d;
  }

  ${respondTo.tabletMini`   
      background: #fff;
      margin: 0 -2rem;
      padding: 3rem 4rem;
      border-radius:0;
      background: ${(props) => props.focusedOn && '#F7F7F7'};
  `}
`;

export const SidebarStyled = styled.div`
  height: max-content;

  background: #fff;
  border-radius: 10px;
  box-shadow: -1px -1px 3px #ffffff29;

  padding: 1.5rem 3rem;

  h1 {
    padding: 1rem 0 2rem 0;
    margin-bottom: 1.5rem;
    font-weight: 100;
    border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
  }

  ul {
    margin: 0;
    li {
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      h3 {
        color: ${(props) => props.theme.darkGrey1};
        font-weight: 100;
        font-size: 1.6rem;
      }
    }
  }
`;

export const SimilarOrganizationStyled = styled.aside`
  /* grid-column: col-start 7 / center-end; */

  /* ${respondTo.tablet` 
    display:none;
  `} */
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

const ApplicantStyles = styled.li`
  padding: 1rem;
  margin: 1rem 0;

  .applicant-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: ${({ status }) =>
        status === 'ACCEPTED' ? 'green' : status === 'REJECTED' ? 'red' : 'orange'};
    }
  }
  .applicant-footer {
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    img {
      width: 12rem;
    }
    .read-more {
      text-align: right;
      color: ${(props) => props.theme.blue};
    }
  }
`;

const ParticipantStyles = styled.li`
  padding: 1rem;
  margin: 1rem 0;
`;

const ParticipatingCountires = styled.ul`
  margin: 1.5rem 0;
  padding: 20px;
  /* border: 1px solid #ccc; */
  width: fit-content;

  .participating-countries {
    &__title {
      color: ${(props) => props.theme.blue};
      font-size: 1.5rem;
      padding-bottom: 1rem;
    }

    &__country {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 250px;
      font-size: 1.3rem;
      /* vertical-align: center; */
      span {
        margin-right: 1rem;
        margin-top: 5px;

        svg {
          border: 0.3px solid ${(props) => props.theme.borderColorPrimary};
          width: 40px;
        }
      }
    }
  }
`;
