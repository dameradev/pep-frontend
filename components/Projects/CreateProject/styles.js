import styled from "styled-components";

export const FormWrapper = styled.div`
  width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  text-align: center;
  form {
    input,
    textarea,
    select {
      width: 100%;
      padding: 10px;
      margin: 5px 0;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.5rem;
    }

    button {
      color: ${props => props.theme.black};
      &:hover {
        color: white;
      }
    }

    .form-input__group {
      text-align: left;
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
  margin: 1rem 0;

  text-align: left;
  .wrapper {
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
  }
`;
