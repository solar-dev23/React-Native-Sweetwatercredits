import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { BlueButton, SplashImageContainer, YellowButton } from './common';


class Splash extends Component {
  render() {
    // const navigateToProjects = () => Actions.projects();
    const navigateToLoginForm = () => Actions.loginForm();
    return (
      <SplashImageContainer>
        <BlueButton onPress={navigateToLoginForm}>
          {_.toUpper('Start Calculating Credits')}
        </BlueButton>

        <YellowButton onPress={navigateToLoginForm}>
          {_.toUpper('Sign In')}
        </YellowButton>
      </SplashImageContainer>
    );
  }
}

export default Splash;
