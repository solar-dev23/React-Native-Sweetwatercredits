import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ZoneListItem extends Component {
  onRowPress() {
    const { zone, projectUid } = this.props;
    Actions.zoneEdit({ zone, projectUid });
  }

  sumZoneViolations() {
    let sumPenaltys = 0;
    const { ruleViolations } = this.props.zone;
    if (typeof ruleViolations !== 'undefined') {
      const violationCount = Object.keys(ruleViolations).length;
      if (violationCount > 0) {
        for (let violation of Object.values(ruleViolations)) {
          let { penalty } = violation;
          sumPenaltys += parseInt(penalty, 10);
        }
      }
    }

    return sumPenaltys;
  }

  render() {
    const { acreage, zoneType } = this.props.zone;
    const { titleStyle, creditTitleStyle, sectionStyle } = styles;
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection style={sectionStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Icon name='landscape' size={50} />
              <View>
                <Text style={titleStyle}> {acreage} Acres | {zoneType} </Text>
                <Text style={creditTitleStyle}> Credits: {this.sumZoneViolations()} </Text>
              </View>
              {
                //<Icon name='clear' size={40} />
              }
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

export default ZoneListItem;
