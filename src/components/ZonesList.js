import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { BlueButton, LogoTopMiddle } from './common';
import { zonesFetch } from '../actions';
import ZoneListItem from './ZoneListItem';


class ZonesList extends Component {
  componentWillMount() {
    const { project_uid } = this.props;
    this.props.zonesFetch({ uid: project_uid });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component will be rendered with
    // this.props is still the old set of props
    this.createDataSource(nextProps);
    console.log(nextProps);
  }

  onButtonPress() {
    const { project_uid } = this.props;
    Actions.zoneCreate({ project_uid });
  }

  createDataSource({ zones }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(zones);
  }

  renderRow(zone) {
    return <ZoneListItem zone={zone} />;
  }

  render() {
    return (
      <View>
        <LogoTopMiddle />

        <BlueButton
          onPress={this.onButtonPress.bind(this)}
        >
          Add Zone
        </BlueButton>

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  //  state.projects is an object with many key mvalue pairs.
  //  for each value, run the fat arrrow function
  const zones = _.map(state.zones, (val, uid) => {
    return { ...val, uid }; // { name: 'testproj', id: 'dasd23190dfe90d'};
  });

  return { zones };
};


export default connect(mapStateToProps, { zonesFetch })(ZonesList);
