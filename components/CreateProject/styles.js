import styled from 'styled-components';
import { respondTo } from '../../lib/respondTo';

export const ProjectFormWrapper = styled.div`
  /* background: black; */
  .guidelines {
    ${respondTo.tabletMini` 
      display: none;
    `}
  }
  .form {
    padding: 2rem;
    background: #eee;
    text-align: start;
    color: #505050;
    /* width: 100%; */
    /* height: 100vh; */
    ${respondTo.tabletMini` 
      background: unset;
    `}
    form {
      /* grid-column: full-start/ full-end; */
      width: 100%;
      display: grid;

      grid-template-columns:
        [full-start]
        minmax(6rem, 1fr) [center-start]repeat(8, [col-start] minmax(min-content, 18rem) [col-end])
        [center-end] minmax(6rem, 1fr) [full-end];

      ${respondTo.tabletMini` 
        display: flex;
        flex-direction: column;
      `}
    }
    h1 {
      grid-column: full-start / full-end;
    }

    label {
      text-transform: uppercase;
      color: ${(props) => props.theme.blue};
      font-weight: 600;
    }

    input,
    textarea,
    select {
      /* background: #eee;
      color: #050505; */
      /* transition: all 0.4s; */

      &::placeholder {
        /* color: currentColor; */
      }

      :focus {
        /* border: 1px solid #2f5db7; */
      }
    }

    &__input {
      width: 100%;
      padding-bottom: 2rem;

      label,
      input {
        font-size: 1.6rem;
      }
    }

    &__select {
      width: 100%;

      label {
        font-size: 1.4rem;
        margin-right: 1rem;
      }
      p {
        font-size: 1rem;
      }

      .MuiInput-input {
        font-size: 1.4rem;
        display: flex;
        align-items: center;
      }
    }

    &__description,
    &__costs {
      width: 100%;
    }

    &__input-group {
      grid-column: col-start 4 / full-end;
      padding: 2rem;
      margin-bottom: 3rem;
      /* box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1); */
      background: #fff;
      border-radius: 5px;
    }

    .basic-details {
      display: grid;
      /* grid-template-columns: minmax(30rem, 1fr) minmax(15rem, max-content); */
      grid-template-columns: repeat(3, 1fr);
      grid-auto-flow: column;
      grid-gap: 2rem;
      justify-items: top;
      /* align-content: start; */

      ${respondTo.tabletMini` 
        display: flex;
        flex-direction: column;
      `}

      &__title {
        /* color: blue; */
        width: 100%;
        grid-column: 1 / 3;
      }

      &__dates {
        display: flex;
        flex-direction: row;
        grid-column: 1 / 3;
        gap: 2rem;
        ${respondTo.tabletMini` 
        
        gap: 2rem;
      `}
      }

      &__start-date {
        grid-row: 2 / 3;
        grid-column: 1 / 2;

        width: 100%;
        margin: 0;
      }

      &__end-date {
        grid-row: 2 / 3;
        grid-column: 2 / 3;

        width: 100%;
        margin: 0;
      }

      &__type {
        grid-column: 3 / 4;
        width: 100%;
      }

      &__activity {
        width: 100%;
        grid-column: 3 / 4;
        grid-row: 2 / 3;
      }
    }
  }

  .publish {
    padding: 2rem 3rem;
    font-size: 2rem;
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme.blue};
    color: #fff;
    outline: none;
    grid-column: full-start / full-end;
    transition: all 0.2s;

    &:hover {
      background: #2f5db7;
    }

    &:active {
      transform: translateY(3px);
    }
  }
`;

export const FormWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  form {
    input,
    textarea,
    select {
      /* width: 100%;
      padding: 10px;
      margin: 5px 0;
      outline: none; */
      /* border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.5rem; */
    }

    button {
      color: ${(props) => props.theme.black};
      &:hover {
        color: white;
      }
    }

    .form-input__group {
      text-align: left;
    }
    .location-input {
      display: flex;
      gap: 2rem;
    }

    .type-participants {
      display: flex;
      justify-content: space-between;
      div {
        width: 30%;
      }
    }

    .project-window {
      &__location {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;

        &-selected {
          .geosuggest {
            &__suggests-wrapper {
              ul {
                display: none;
              }
            }
          }
        }

        &-search-wrapper {
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          div {
            height: 20%;
          }
        }

        &-search {
          width: 100%;
          position: relative;
          padding-top: 15px;

          &-input {
            width: 100%;
            font-size: 16px;
            padding: 5px;
            color: inherit;
          }

          .geosuggest {
            &__suggests-wrapper {
              ul {
                list-style-type: none;
                box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
                position: relative;
                top: 30px;

                li {
                  border-bottom: 1px solid grey;
                  padding: 5px;

                  mark {
                    text-decoration: underline;
                    background: none;
                    font-weight: 600;
                  }
                }
              }
            }

            &__item {
              background: white;
            }

            &__item--active {
              background: rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
    }
  }
`;
export const CountriesStyled = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 3rem;
  align-items: end;
  /* justify-items: center; */
  font-size: 1.4rem;
  .wrapper {
    grid-column: 2 / -1;

    width: 100%;

    ${respondTo.tabletMini` 
      grid-column: unset;
    `}
  }
  .total-participants {
    grid-column: 1 / 2;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
    height: 100%;

    &__input {
      max-width: 3rem;
      min-width: 3rem;
      input {
        padding: 0.5rem;
      }
    }

    & > * {
      width: 100%;
    }
  }

  .country-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
    label {
      font-size: 1.4rem;
      margin-right: 1rem;
    }
  }

  .country {
    width: 3rem;
    label {
    }
    input {
      padding: 0.5rem;
      display: flex;
      align-items: center;
    }
  }

  /* margin: 1rem 0; */

  /* text-align: left; */
  /* .wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .select-box {
    width: 45%;
    height: 20%;
  }
  .countries-block {
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: space-between;
    .country-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 1rem 0;
      .label {
        width: 40%;
      }
    }
  } */
`;

export const ErrorValidationMessageStyles = styled.p`
  color: ${(props) => props.theme.red};
`;
