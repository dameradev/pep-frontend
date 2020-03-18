import styled from 'styled-components';

const ButtonStyled = styled.button`
  outline: none;
  margin-top: 2rem;
  width: 70%;
  padding: 2rem;
  background: ${props => props.background || 'transparent'};
  border: 3px solid ${props => props.border || 'transparent'};
  color: ${props => props.color || props.theme.whiteGray};
  border-radius: 5px;
  font-size: 1.5rem;
  text-transform: uppercase;

  &:hover {
    background: ${props => props.btnColor};
  }
`;

export default ButtonStyled;
