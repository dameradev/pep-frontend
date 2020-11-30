import styled, { keyframes } from 'styled-components';

const buttonClick = keyframes`
  0% {
    font-size: 1.5rem; 
  }
  50% {
    font-size: 1.3rem;
  }
  100% {
    font-size: 1.5rem;
  }
`;

const ButtonStyled = styled.button`
  outline: none;
  width: fit-content;
  background: ${(props) =>
    props.bgColor === 'blue'
      ? props.theme.blue
      : props.bgColor === 'red'
      ? props.theme.red
      : 'transparent'};
  border: 3px solid ${(props) => props.border || 'transparent'};
  color: ${(props) => props.color || '#fff'};
  border-radius: 5px;
  font-size: 1.6rem;
  text-transform: uppercase;

  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || '0.5rem 2rem'};
  align-self: ${(props) => props.align};

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.hover};
  }

  &:active,
  &:focus {
    animation: ${buttonClick} 0.3s ease-out;
  }
`;

export default ButtonStyled;
