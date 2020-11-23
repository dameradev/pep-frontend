import React from 'react';
import styled from 'styled-components';
import icons from '../lib/icons';

const SuccessfulRegistrationStyles = styled.div`
  padding: 5rem 5%;
  display: flex;
  flex-direction: column;
  h1 {
    font-weight: 100;
    font-size: 2.4rem;
  }
  .icon-wrapper {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 2.4rem;
    }
    padding: 5rem 0;
  }
  .description {
    text-align: center;
    align-self: center;
    font-size: 1.6rem;
    max-width: 100rem;
  }

  button {
    margin-top: 3rem;
    outline: none;
    width: fit-content;
    align-self: center;
    padding: 1rem 2.5rem;
    border: 2px solid ${(props) => props.theme.blue};
    text-transform: uppercase;
    background: #fff;
    border-radius: 10px;

    transition: all 0.3s;

    &:hover {
      background: ${(props) => props.theme.blue};
      color: #fff;
    }

    &:active {
      transform: translateY(3px);
    }
  }
`;

const SuccessfulRegistration = () => {
  return (
    <SuccessfulRegistrationStyles>
      <h1>Thank you for registering!</h1>
      <div className="icon-wrapper">
        {icons.email}
        <h3>Verify your email address</h3>
      </div>
      <p className="description">
        Please click the link that has just been sent to your email account to verify your email. If
        you have not received the email after a few minutes, please check your spam folder or resend
        verification email
      </p>
      <button>Resend email</button>
    </SuccessfulRegistrationStyles>
  );
};

export default SuccessfulRegistration;
