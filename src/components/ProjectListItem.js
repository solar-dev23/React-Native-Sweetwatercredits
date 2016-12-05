import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ProjectListItem extends Component {
  onRowPress() {
    console.log(this.props.project);
    Actions.projectEdit({ project: this.props.project });
  }

  sumProjectZoneViolations() {
    let sumPenaltys = 0;
    const { zones } = this.props.project;
    if (typeof zones !== 'undefined') {
      for (const i in zones) {
        if ({}.hasOwnProperty.call(zones, i)) {
          const zone = zones[i];
          const { ruleViolations } = zone;
          if (typeof ruleViolations !== 'undefined') {
            for (const j in ruleViolations) {
              if ({}.hasOwnProperty.call(ruleViolations, j)) {
                sumPenaltys += parseInt(ruleViolations[j].penalty, 10);
              }
            }
          }
        }
      }
    }

    return sumPenaltys;
  }

  // <CardSection style={{ justifyContent: 'space-between' }}>
  //   <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
  //     <Icon name='domain' size={40} />
  //     <View style={{ flexDirection: 'column' }}>
  //       <Text style={titleStyle}> {name}</Text>
  //       <Text style={titleStyle}> Credits: {this.sumProjectZoneViolations()}</Text>
  //     </View>
  //   </View>
  // </CardSection>

  render() {
    const { name } = this.props.project;
    const { titleStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={{ justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Icon name='domain' size={40} />
              <View>
                <Text style={titleStyle}> {name} </Text>
                <Text style={titleStyle}> Credits: {this.sumProjectZoneViolations()}</Text>
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
    paddingLeft: 15
  }
};

export default ProjectListItem;
