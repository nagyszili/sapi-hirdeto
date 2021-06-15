import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';

import texts from '../../../assets/texts/texts.json';
import * as Color from '../../utils/theme/colors';
import { DatePicker } from './AdminPanelComponent/DatePicker';
import { CountAdsByDateComponent } from './AdsActionComponent/CountAdsComponent';
import { CountUsersByDateComponent } from './UserActionComponent/CountUserComponent';

export const AdminScreen: React.FC<{}> = () => {
  const [fromDate, setFromDate] = useState(moment().format());

  return (
    <View style={styles.groupContainer}>
      <Card>
        <Card.Title>{texts.adminPanel}</Card.Title>
        <Card.Divider />
        <DatePicker setFromDate={setFromDate} />
        <CountAdsByDateComponent fromDate={fromDate} />
        <CountUsersByDateComponent fromDate={fromDate} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginVertical: 6,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 20,
    alignContent: 'center',
  },
  row: {
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 12,
    marginLeft: 30,
  },
  buttonHover: {
    color: Color.whiteColor,
  },
});
