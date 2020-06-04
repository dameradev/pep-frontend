import styled, { keyframes } from 'styled-components';
import { respondTo } from '../../utils/respondTo';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  width: 50vw;
  margin: 0 auto;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  /* background: rgba(0, 0, 0, 0.02); */
  border: 5px solid white;
  padding: 5rem;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  border-radius: 5px;
  text-align: center;

  display: grid;
  grid-template-columns: minmax(25rem, 40rem);
  grid-template-rows: 1fr;
  grid-row-gap: 3rem;
  justify-items: center;
  justify-content: center;

  fieldset {
    border: none;
    width: 100%;

    &[disabled] {
      opacity: 0.5;
    }
    &::after {
      /* background-color: blue; */
      height: 10px;
      width: 100%;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #549bf0 0%, #30619c 50%, #549bf0 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }

  label {
    width: 100%;
  }

  input,
  textarea,
  select {
    border: none;
    width: 100%;
  }

  input,
  select {
    padding: 1.5rem 2.25rem;
    font-size: 1.6rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 25px;
    appearance: none;
    border: 1px solid transparent;
    transition: all 0.3s;

    &:focus {
      outline: none;
      box-shadow: 0 1rem 2rem rgba($color-black, 0.1);
      border: 1px solid #2f5db7;

      borde &:invalid {
        border-bottom: 3px solid $color-secondary-dark;
      }
    }
  }
  button {
    border: none;
    border-radius: 20px;

    font-size: 2rem;
    padding: 1.25rem 2rem;
    background-color: #549bf0;
    color: #fff;
  }

  .links-container {
    display: flex;
    flex-direction: column;
  }
`;

/* 
  ${respondTo.mobilePortrait`
    width: 400px;
    
  `}
  
/* 
  label {
    display: block;
    margin-bottom: 1rem;
    &:first-of-type {
      padding-top: 10px;
    }
  }
  .links-container {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    a {
      padding-bottom: 0.5rem;
      color: ${(props) => props.theme.blue};
      &:hover {
        cursor: pointer;
      }
    }
    padding-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.2rem;
    border: 1px solid black;

    &:focus {
      outline: 0;
      border-color: ${(props) => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  } */

export default Form;
