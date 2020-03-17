import styled from 'styled-components';

import Signup from '../components/Signup';
import Signin from '../components/Signin';

const Auth = styled.div`
  padding: 3rem 0;
`;

const Registration = props => {
  return (
    <Auth>
      {props.query.path === 'login' && <Signin />}
      {props.query.path === 'register' && <Signup />}
    </Auth>
  );
};

export default Registration;
