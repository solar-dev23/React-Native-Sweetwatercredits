import React, { Component } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { disturbanceDelete } from '../actions';
import { Card, Container, LogoTopMiddle, YellowButton, Confirm } from './common';

class DisturbanceShow extends Component {
  state = { showModal: false };

  onAccept() {
    const { uid, projectUid } = this.props.disturbance;
    this.props.disturbanceDelete({ projectUid, uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  humanizeRuleViolation() {
    const { zoneType, ruleViolation } = this.props.disturbance;
    let message = '';

    if (ruleViolation === 'timing') {
      message = 'One year of timing stipulations';
    } else if (ruleViolation === 'siting') {
      if (zoneType === 'Non-Core') {
        message = 'Siting within < 0.25 miles of a lek';
      } else {
        message = 'Siting within < 0.6 miles of a lek';
      }
    } else if (ruleViolation === 'roads') {
      message = 'Roads within < 1.9 miles of a lek';
    } else if (ruleViolation === 'activity') {
      message = 'Greater than 1 activity per 640 acres on average';
    } else if (ruleViolation === 'disturbance') {
      message = 'Surface disturbance greather than 5%';
    } else if (ruleViolation === 'tls') {
      message = 'Timing Stipulation';
    } else if (ruleViolation === 'short-term') {
      message = 'Short Term Impacts';
    }
    return (
      <Text>{message}</Text>
    );
  }

  humanizeVulnerableLandscape() {
    const { infoText } = styles;
    const { vulnerableLocation } = this.props.disturbance;
    if (vulnerableLocation === 'Yes') {
      return (
        <Text style={infoText}>Located in a vulnerable landscape</Text>
      );
    }
  }

  render() {
    const { disturbance } = this.props;
    const { titleText, mainView, infoText } = styles;
    return (
      <Container>
        <LogoTopMiddle />
        <Card>
          <View style={mainView}>
            <Text style={titleText}>Disturbance Info</Text>
            <Text style={infoText}>Acres: {disturbance.acreage}</Text>
            <Text style={infoText}>Zone Type: {_.capitalize(disturbance.zoneType)}</Text>
            <Text style={infoText}>Rule: {this.humanizeRuleViolation()} </Text>
            {this.humanizeVulnerableLandscape()}
            <Text style={infoText}>Debit Amount: {disturbance.debitAmount}</Text>
          </View>
        </Card>

        <YellowButton
          onPress={() => this.setState({ showModal: !this.state.showModal })}
        >
          Delete
        </YellowButton>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Container>
    );
  }
}

const styles = {
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  infoText: {
    fontSize: 18
  },
  mainView: {
    padding: 5
  }
};

export default connect(null, { disturbanceDelete })(DisturbanceShow);
