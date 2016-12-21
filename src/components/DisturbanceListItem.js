import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardSection } from './common';

class DisturbanceListItem extends Component {
  onRowPress() {
    Actions.disturbanceShow({ disturbance: this.props.disturbance });
  }

  render() {
    console.log(this.props);
    const {
      acreage,
      zoneType,
      ruleViolation,
      penaltyAmount } = this.props.disturbance;

    const { titleStyle, creditTitleStyle, sectionStyle } = styles;
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection style={sectionStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Icon name='nature-people' size={50} />
              <View>
                <Text style={titleStyle}> {_.capitalize(ruleViolation)} Disturbance </Text>
                <Text style={creditTitleStyle}> {acreage} Acres</Text>
                <Text style={creditTitleStyle}> {zoneType} Credits: {penaltyAmount}</Text>
              </View>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15
  },
  creditTitleStyle: {
    fontSize: 16,
    paddingLeft: 15
  },
  sectionStyle: {
    justifyContent: 'space-between',
    marginTop: 5
  }
};

export default DisturbanceListItem;
