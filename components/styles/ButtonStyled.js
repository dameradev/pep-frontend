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
  margin-top: 2rem;
  width: 90%;
  padding: 2rem;
  background: ${(props) => props.btnColor || 'transparent'};
  border: 3px solid ${(props) => props.border || 'transparent'};
  color: ${(props) => props.color || props.theme.whiteGray};
  border-radius: 5px;
  font-size: 1.5rem;
  text-transform: uppercase;

  transition: background 0.2s;
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
