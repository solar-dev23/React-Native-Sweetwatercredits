import React from 'react';
import { Image, View } from 'react-native';

const LogoTopLeft = (props) => {
  const { logo, logoNavContainer } = styles;

  return (
    <View style={logoNavContainer}>
      <Image style={logo} source={require('../images/sweetwater-conservancy-logo.png')} />
      {props.children}
    </View>
  );
};

const styles = {
  logoNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingTop: 95
  },
  logo: {
    height: 92,
    width: 161
  }
};

export { LogoTopLeft };