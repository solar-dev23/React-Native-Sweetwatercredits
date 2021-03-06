import React, { Component } from 'react';
import { ListView, Text, Dimensions } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BlueButton, Container, LogoTopMiddle, Card } from './common';
import DisturbanceListItem from './DisturbanceListItem';
import { disturbancesFetch, disturbanceNew } from '../actions';

class DisturbancesList extends Component {
  componentWillMount() {
    this.props.disturbancesFetch({ projectUid: this.props.project.uid || this.props.projectUid });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onButtonPress() {
    const { project } = this.props;
    this.props.disturbanceNew({ project });
  }

  createDataSource({ disturbances }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(disturbances);
  }

  sumPenaltys() {
    const { disturbances } = this.props;
    const disturbancesPenaltyTotal =
      disturbances.reduce((acc, disturbance) => acc + parseFloat(disturbance.debitAmount), 0);
    return disturbancesPenaltyTotal.toFixed(1);
  }

  renderRow(disturbance) {
    return <DisturbanceListItem disturbance={disturbance} />;
  }

  render() {
    const { penaltyText } = styles;
    const windowDims = Dimensions.get('window');
    return (
      <Container>
        <LogoTopMiddle />
        <BlueButton
          onPress={this.onButtonPress.bind(this)}
        >
          <Icon name="add" size={18} /> Add Disturbance
        </BlueButton>

        <Text style={penaltyText}> Total Debit Amount: {this.sumPenaltys()}</Text>

        <Card>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            style={{ height: windowDims.height - 367 }}
          />
        </Card>
      </Container>
    );
  }
 }

const styles = {
  penaltyText: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 15
  }
};

const mapStateToProps = (state) => {
  const disturbances = _.map(state.disturbances, (val, uid) => {
    return { ...val, uid };
  });

  return { disturbances };
};

export default connect(mapStateToProps, { disturbancesFetch, disturbanceNew })(DisturbancesList);
