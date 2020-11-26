import styled from 'styled-components';
import { respondTo } from '../../../lib/respondTo';

const ProjectStyles = styled.div`
  /* margin: 2rem 10%; */
  padding: 2rem 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${respondTo.tabletMini` 
      padding: 0;
      .project-organization {
        order: 3;
      }
    `}
  .skeleton {
    display: grid;
    grid-template-columns: 1fr 35rem;
    gap: 3rem;
    ${respondTo.tabletMini` 
      grid-template-columns: 1fr;
    `}
    .organization-skeleton {
      ${respondTo.tabletMini` 
        margin: 0 5%;
        width: 90%;
      `}
    }
  }

  ${respondTo.tabletMini` 
    padding: 0;
  `}

  .top {
    display: flex;
    gap: 3rem;
    ${respondTo.tabletMini` 
      flex-direction:column;
      gap:0;
      
    `}
  }
  .project {
    &__details {
      width: 100%;
      height: max-content;
    }
    &__organization {
      width: 50rem;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0px 3px 6px #00000029;
      position: relative;

      display: flex;
      flex-direction: column;

      color: ${(props) => props.theme.darkGrey1};
      height: max-content;
      ${respondTo.tabletMini` 
        width: 100%;
        margin-top: 2rem;
        border-top: 2px solid #00000029;
        border-radius: 0;
        margin-bottom: 6rem;

      `}

      .configure-form-button {
        position: absolute;
        bottom: -5rem;
        height: max-content;
        width: 100%;
        font-size: 1.6rem;
        text-transform: uppercase;
        padding: 1rem 2.5rem;
        background: ${(props) => props.theme.blue};
        color: #fff;
        border: none;
        border-radius: 10px;
        outline: none;
        ${respondTo.tabletMini` 
          width: 80%;
          align-self: center;
        `}
      }

      .header {
        padding: 4rem 2rem 1rem 2rem;
        text-align: center;
        position: relative;
        &__hint {
          position: absolute;
          top: 0.5rem;
          left: 1.2rem;
          font-style: italic;
          color: ${(props) => props.theme.blue};
        }
        img {
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 50%;
          width: 15rem;
          height: 15rem;
          object-fit: cover;
        }
        h2 {
          font-weight: 200;
          font-size: 2.4rem;
        }
        p {
          font-size: 1.6rem;
        }
      }
      .contact {
        padding: 4rem 3rem;

        ${respondTo.tabletMini` 
          display:none;
        `}
        h3 {
          text-transform: uppercase;
          font-weight: 300;
          position: relative;

          &::after {
            content: '';
            background: ${(props) => props.theme.red};
            position: absolute;
            bottom: 0;
            left: 0;
            height: 0.5rem;
            width: 3rem;
          }
        }
        p {
          font-style: italic;
        }
        & > div {
          padding: 1rem 0;
        }
      }
      & > * {
        padding: 0 3rem;
      }

      .description {
        font-size: 1.4rem;
        margin: 1rem 0;
      }

      .buttons-container {
        margin-top: 2rem;
        width: 100%;
        padding: 0;
        display: flex;

        a {
          display: inline-block;
          width: 50%;
          padding: 1rem 2rem;
          font-size: 1.6rem;
          text-align: center;
          color: #fff;
          cursor: pointer;

          background: ${(props) => props.theme.red};
          &:not(:first-of-type) {
            background: ${(props) => props.theme.blue};
          }
        }
      }
    }
  }
  .form-wrapper {
    margin-top: 2rem;
    display: flex;
    gap: 3rem;
    display: none;
    &__dispalyed {
      display: block;
    }
  }

  .placeholder {
    width: 50rem;
    ${respondTo.tabletMini` 
      display: none;
    `}
  }

  .no-applicants-message {
    font-weight: 400;
    color: ${(props) => props.theme.red};
    ${respondTo.tabletMini` 
      padding: 0 2rem;
    `}
  }
  .applicant {
    box-shadow: 0px 3px 6px #00000029;
    padding: 2rem;
    margin-bottom: 1rem;
    background: #fff;
  }
  .application-form {
    padding: 3rem;
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    background: #fff;
    color: ${(props) => props.theme.darkGrey1};

    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    ${respondTo.tabletMini` 
      // margin: 2rem 5%;
      margin-top: 2rem;
      border-top: 2px solid #00000029;
      width: auto;
    `}

    h2 {
      padding-bottom: 1.8rem;
      color: ${(props) => props.theme.blue};
      font-weight: 400;
      ${respondTo.tabletMini` 

        font-size: 1.6rem;
      `}
    }

    h3 {
      font-weight: 300;
    }

    button {
      align-self: flex-end;
    }

    .textarea-input {
      padding: 2rem 0;
      width: 100%;
      padding-bottom: 3rem;
    }
    .error {
      color: red;
      font-size: 1.2rem;
    }

    &__diet {
      margin-bottom: 2rem;
    }

    &__food-preference {
      display: flex;
      flex-direction: row;
    }
  }

  .display-application-form {
    opacity: 1;
  }
`;
export default ProjectStyles;
