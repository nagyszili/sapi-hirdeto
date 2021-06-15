import moment from 'moment';
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

import texts from '../../../../assets/texts/texts.json';

interface DatePickerComponentProps {
  setFromDate: Dispatch<SetStateAction<string>>;
}

export const DatePicker: React.FC<DatePickerComponentProps> = ({
  setFromDate,
}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [dateText, setDateText] = React.useState(texts.today);

  const setShowOptionState = () => {
    setShowOptions((prevState) => !prevState);
  };

  const generateDate = (date: string, dateTextValue: string) => {
    const values = {
      today: moment().format(),
      yesterday: moment().subtract(1, 'days').format(),
      last7days: moment().subtract(7, 'days').format(),
      last30days: moment().subtract(30, 'days').format(),
      thismonth: moment().startOf('M').format(),
      lastmonth: moment().startOf('M').subtract(30, 'days').format(),
      thisyear: moment().startOf('year').format(),
      lastyear: moment().startOf('year').subtract(1, 'year').format(),
    };
    const selectedDate: string = values[date as keyof typeof values];
    setFromDate(selectedDate);
    setDateText(dateTextValue);
    setShowOptionState();
  };

  return (
    <View>
      <View>
        <Pressable
          style={styles.datePickerButton}
          onPress={() => setShowOptionState()}
        >
          <Text style={styles.buttonText}>{dateText}</Text>
        </Pressable>
      </View>
      {showOptions && (
        <View style={{ marginBottom: 20 }}>
          <Pressable onPress={() => generateDate('today', texts.today)}>
            <Text>{texts.today}</Text>
          </Pressable>

          <Pressable onPress={() => generateDate('yesterday', texts.yesterday)}>
            <Text>{texts.yesterday}</Text>
          </Pressable>

          <Pressable onPress={() => generateDate('last7days', texts.last7Days)}>
            <Text>{texts.last7Days}</Text>
          </Pressable>

          <Pressable
            onPress={() => generateDate('last30days', texts.last30Days)}
          >
            <Text>{texts.last30Days}</Text>
          </Pressable>

          <Pressable onPress={() => generateDate('thismonth', texts.thisMonth)}>
            <Text>{texts.thisMonth}</Text>
          </Pressable>

          <Pressable onPress={() => generateDate('lastmonth', texts.lastMonth)}>
            <Text>{texts.lastMonth}</Text>
          </Pressable>

          <Pressable onPress={() => generateDate('thisyear', texts.thisYear)}>
            <Text>{texts.thisYear}</Text>
          </Pressable>

          <Pressable onPress={() => generateDate('lastyear', texts.lastYear)}>
            <Text>{texts.lastYear}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    justifyContent: 'space-evenly',
  },
  datePickerButton: {
    height: 50,
    width: 150,
    justifyContent: 'space-evenly',
    marginRight: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1E6738',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
