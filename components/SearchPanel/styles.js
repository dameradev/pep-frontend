import styled from 'styled-components';
import { respondTo } from '../../lib/respondTo';

export const Panel = styled.div`
  margin-top: 2rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 7px;
  min-height: 80vh;
  /* padding: 20px; */

  ${respondTo.tabletMini` 
  // height: 20rem !important;
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
  .filters {
    padding: 2rem;
    display: grid;
    grid-gap: 2rem;
    &__location {
      min-width: 20rem;
    }
  }
`;
