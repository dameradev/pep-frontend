import styled from 'styled-components';
import { respondTo } from '../../../lib/respondTo';

const ApplicationFormConfigStyles = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  padding: 2rem;

  font-size: 1.6rem;

  ${respondTo.tabletMini`
    box-shadow: 0px 3px 6px 3px #00000029;
  `}
  h2 {
    color: ${(props) => props.theme.blue};
    font-weight: 400;
    font-size: 3rem;
    margin-bottom: 2rem;
    ${respondTo.tabletMini`
        font-size: 2.2rem;
    `}
  }
  h3 {
    font-weight: 400;
    font-size: 2.4rem;
    ${respondTo.tabletMini`
        font-size: 2rem;
    `}
  }

  .food-preference {
    ul {
      display: flex;
      gap: 2rem;
    }
    p {
      font-style: italic;
      font-size: 1.2rem;
    }
  }

  .questions {
    margin-top: 2rem;
  }

  .form {
    &__group {
      margin-top: 2rem;
      display: flex;
      align-items: flex-end;
      gap: 2rem;
    }
    &__input {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }

  .add-icon {
    margin-top: 2rem;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
  }

  .button {
    width: fit-content;
    padding: 1rem 2.5rem;
    background: ${(props) => props.theme.blue};
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1.6rem;
    text-transform: uppercase;
    align-self: flex-end;

    outline: none;
    &-view {
      background: #fff;
      border: 2px solid ${(props) => props.theme.blue};
      color: ${(props) => props.theme.blue};
    }
  }
`;

export default ApplicationFormConfigStyles;
