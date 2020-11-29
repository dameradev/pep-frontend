import styled from 'styled-components';
import { respondTo } from '../../lib/respondTo';

export const SearchPanelStyles = styled.div`
  margin-top: 2rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 7px;
  min-height: 80vh;
  position: relative;
  /* padding: 20px; */

  ${respondTo.tabletMini` 
    margin-top: 0;
    min-height: unset;
  `}

  .Header {
    border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
    padding: 2rem;

    h3 {
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 300;
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
    margin-top: 2rem;
    padding: 2rem;
    display: grid;
    grid-gap: 2rem;
    position: fixed;
    min-width: 25rem;

    ${respondTo.tabletMini`
      position: static
    `}
  }
`;
