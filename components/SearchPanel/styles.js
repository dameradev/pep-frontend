import styled from 'styled-components';
import { respondTo } from '../../lib/respondTo';

export const SearchPanelStyles = styled.div`
  margin-top: 2rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 7px;
  min-height: 80vh;
  width: 30rem;
  color: #6b6b6b;

  ${respondTo.tabletMini` 
    margin-top: 0;
    min-height: unset;
    width: 100%;
  `}

  .Header {
    position: fixed;
    width: 30rem;
    ${respondTo.tabletMini` 
      position: static;
      width: 100%;
    `}

    h3 {
      text-transform: uppercase;
      border-bottom: 2px solid #95989d;
      font-size: 2.5rem;
      font-weight: 300;
      width: 100%;
      /* margin: 0 -2rem; */
      padding: 2rem;
    }
  }
  .form-input {
    label {
      font-size: 2rem;
    }
    .MuiSelect-select {
      margin-top: 1rem;
    }
  }
  .filters {
    padding: 2rem;
    display: grid;
    grid-gap: 2rem;
    min-width: 25rem;
    button {
      width: fit-content;
      margin-left: auto;
    }
  }
`;
