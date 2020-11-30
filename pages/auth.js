import styled from 'styled-components';

import Signup from '../components/Signup';
import Signin from '../components/Signin';
import { respondTo } from '../lib/respondTo';

const Auth = styled.div`
  padding: 5rem 0;
  ${respondTo.tabletMini`
    padding: 0;
  `}
`;

const Registration = (props) => {
  return (
    <Auth>
      {props.query.path === 'login' && <Signin />}
      {props.query.path === 'register' && <Signup />}
    </Auth>
  );
};

export default Registration;
