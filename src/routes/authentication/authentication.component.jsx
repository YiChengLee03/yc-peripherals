import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.components';

import './authentication.styles.scss';

// Sign in or sign up with Google account
const Authentication = () => {
  return (
    <div>
      <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
