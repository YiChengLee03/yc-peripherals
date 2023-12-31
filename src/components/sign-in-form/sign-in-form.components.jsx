import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { useState } from 'react';

import Button, {
  BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  // Update changes to the state
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Spread operator to make unpack into an object and change its respective value
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email. Please sign up ');
          break;
        default:
          console.log(error);
      }
    }
  };

  // Create new user / sign in to an existing account with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
            type='button'
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
