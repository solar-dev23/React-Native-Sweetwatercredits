import React, { Component } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Container, BlueButton, Input, LogoTopMiddle, Spinner } from './common';
import { loginUpdate, loginUser } from '../actions';

class LoginForm extends Component {
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <BlueButton
        onPress={this.onButtonPress.bind(this)}
      >
        <Icon name='person' size={18} /> {_.toUpper('Sign In')}
      </BlueButton>
    );
  }

  render() {
    const { bottomTextContainer, centerText, errorTextStyle } = styles;
    return (
      <Container>
        <LogoTopMiddle />
        <Input
          placeholder="Email"
          onChangeText={value => this.props.loginUpdate({ prop: 'email', value })}
          value={this.props.email}
        />

        <Input
          placeholder="Password"
          onChangeText={value => this.props.loginUpdate({ prop: 'password', value })}
          value={this.props.password}
          secureTextEntry
        />

        <Text style={errorTextStyle}>{this.props.error}</Text>

        {this.renderButton()}

        <View style={bottomTextContainer}>
          <Text style={centerText}>
            Registration is required to save and edit calculations.
          </Text>
        </View>
      </Container>
    );
  }
}

const styles = {
  bottomTextContainer: {
    justifyContent: 'center',
    marginTop: 25
  },
  centerText: {
    textAlign: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return {
    email,
    password,
    error,
    loading
  };
};

export default connect(mapStateToProps, {
  loginUpdate,
  loginUser
})(LoginForm);
