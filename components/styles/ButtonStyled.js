import styled from 'styled-components';

const ButtonStyled = styled.button`
  margin-top: 2rem;
  width: 70%;
  padding: 2rem;
  background: transparent;
  border: 3px solid ${props => props.btnColor};
  color: ${props => props.theme.whiteGray};
  border-radius: 5px;
  font-size: 1.5rem;
  text-transform: uppercase;

  &:hover {
    background: ${props => props.btnColor};
  }
`;

export default ButtonStyled;
