import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker, View, Text } from 'react-native';
import { BlueButton, Card, CardSection, Container } from './common';
import { ruleViolationUpdate, ruleViolationCreate } from '../actions';

class NonCoreForm extends Component {
  onButtonPress() {
    // Calculate the penalty amount then create the rule violation
    const { rule, violation } = this.props;
    const { acreage, projectUid, uid, zoneType } = this.props.zone;
    let penaltyAmount = 0;

    if (rule === 'impact') {
      if (violation === 'non-vulnerable') {
        penaltyAmount = 12 * parseInt(acreage, 10);
      } else {
        penaltyAmount = 16 * parseInt(acreage, 10);
      }
    } else {
      penaltyAmount = 10;
    }

    this.props.ruleViolationCreate({
      rule,
      violation,
      zoneType,
      penalty: penaltyAmount,
      projectUid,
      zoneUid: uid
    });
  }

  renderViolationPicker() {
      const { rule } = this.props;
      if (rule === 'impact') {
        return (
          <View>
            <Text style={styles.titleStyle}> Land Location </Text>
            <Card>
              <CardSection>
                <Picker
                  style={{ flex: 1 }}
                  onValueChange={
                    value => this.props.ruleViolationUpdate({ prop: 'violation', value })
                  }
                  selectedValue={this.props.violation}
                >
                  <Picker.Item
                    label="Located in a vulnerable landscape?" value="vulnerable"
                  />

                  <Picker.Item
                    label="Not Located in a vulneable landscape?" value="non-vulnerable"
                  />
                </Picker>
              </CardSection>
            </Card>
          </View>
        );
      }
  }

  render() {
    const { titleStyle } = styles;
    return (
      <Container>
        <Text style={titleStyle}>Rule Violation</Text>
        <Card>
          <CardSection>
            <Picker
              style={{ flex: 1 }}
              onValueChange={value => this.props.ruleViolationUpdate({ prop: 'rule', value })}
              selectedValue={this.props.rule}
            >
              <Picker.Item label="Impact within < 0.25 miles of lek?" value="impact" />
              <Picker.Item label="One year of timing stipulations?" value="timing" />
            </Picker>
          </CardSection>
        </Card>
        {this.renderViolationPicker()}

        <BlueButton
          onPress={this.onButtonPress.bind(this)}
        >
          <Text><Icon name='add' size={18} /> Create Rule Violation</Text>
        </BlueButton>
      </Container>

    );
  }
}

const mapStateToProps = (state) => {
  const { rule, violation, penalty, zoneType } = state.ruleViolationForm;
  return { rule, violation, penalty, zoneType };
};

const styles = {
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5
  }
};

export default connect(mapStateToProps, {
  ruleViolationUpdate,
  ruleViolationCreate })(NonCoreForm);
