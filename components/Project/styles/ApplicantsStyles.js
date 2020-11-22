import styled from 'styled-components';
import { respondTo } from '../../../lib/respondTo';

const ApplicantsStyles = styled.div`
  margin-top: 2rem;
  color: #95989d;
  min-height: 80vh;

  display: grid;
  grid-template-columns: 40rem 1fr;
  grid-template-rows: 4rem 1fr;
  ${respondTo.tabletMini`
    grid-template-columns: 1fr;
    min-height: min-content;
  `}

  ${respondTo.mobileSmall`
    grid-template-rows: 8rem 1fr;
  `}

  .applicants {
    &__header {
      height: 3rem;
      grid-column: 1/3;
      display: flex;
      align-items: flex-end;
      padding: 0 2rem;
      ${respondTo.tabletMini`
        grid-column: 1/2;
      `}
      ${respondTo.mobileSmall`
        flex-direction: column;
        align-items: flex-start;
      `}

      h2 {
        color: ${(props) => props.theme.blue};
        font-weight: 400;
        margin-right: 2rem;
        line-height: 4rem;
      }
      p {
        text-transform: uppercase;
      }
    }
    &__list {
      padding: 6rem 3rem;
      background: #fff;
      box-shadow: 0px 3px 6px #00000029;
      z-index: 2;

      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;

      ${respondTo.tabletMini`
        padding: 2rem 2rem;
        box-shadow: none;
      `}

      &-item {
        padding: 1rem 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        position: relative;

        ${respondTo.tabletMini`
          
          &.selected {
            margin-bottom: 0;
            z-index: 10;
            box-shadow: none !important;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            
            .expand {
              &-less {
                display: block;
              }
              &-more {
                display: none;
              }
            }
          }
        `};
        h3 {
          font-weight: 400;
          color: ${(props) => props.theme.blue};
        }
        p {
          text-transform: lowercase;
          font-size: 1.2rem;

          &::first-letter {
            text-transform: capitalize;
          }
        }

        .expand {
          position: absolute;
          bottom: 0.5rem;
          right: 1rem;
          text-transform: uppercase;
          /* color: ${(props) => props.theme.blue}; */
          width: 3rem;
          height: 3rem;
          &-less {
            display: none;
          }
        }

        &.pending {
          box-shadow: 0px 3px 2px ${(props) => props.theme.orange};
        }
        &.accepted {
          box-shadow: 0px 3px 2px ${(props) => props.theme.green};
        }
        &.rejected {
          box-shadow: 0px 3px 2px ${(props) => props.theme.red};
        }
        &.selected {
          background: ${(props) => props.theme.blue};
          color: #fff;
          h3 {
            color: #fff;
          }
        }
      }
    }
  }

  .selected-applicant {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 3rem;
    background: #f7f7f7;
    box-shadow: 0px 3px 6px #00000029;

    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;

    ${respondTo.tablet`
        grid-template-columns: 1fr;
    `}

    ${respondTo.tabletMini`
        grid-template-columns: 1fr 1fr;
        border-top-right-radius: 0;
        margin-top: -1rem;
        transform: translateY(-100%);
        opacity: 0;
        height: 0;
        padding: 0;
        transition: all 0.5s;
    `}

    ${respondTo.mobileSmall`
        grid-template-columns: 1fr;
      `}
    h3 {
      color: ${(props) => props.theme.blue};
      font-weight: 400;
    }

    &__status {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;

      .form__select {
        padding-top: 1rem;
        width: 18rem;
        label {
          line-height: 4rem;
        }
      }
      p {
        text-transform: lowercase;
        &::first-letter {
          text-transform: capitalize;
        }
      }

      &.pending {
        p.display-status {
          color: ${(props) => props.theme.orange};
        }
      }
      &.accepted {
        p.display-status {
          color: ${(props) => props.theme.green};
        }
      }
      &.rejected {
        p.display-status {
          color: ${(props) => props.theme.red};
        }
      }
    }

    &__motivation {
      grid-column: 1/2;
    }
    &__reason {
      grid-column: 1/2;
    }
    &__after {
      grid-column: 1/2;
    }

    &__displayed {
      transform: translateY(0);
      opacity: 1;
      height: 100%;
      padding: 3rem;
    }
  }
  /* .selected {
  } */
`;

export default ApplicantsStyles;
