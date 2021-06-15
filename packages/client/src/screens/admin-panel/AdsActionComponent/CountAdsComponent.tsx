import moment from 'moment';
import React from 'react';

import texts from '../../../../assets/texts/texts.json';
import { useCountAdsByDate } from '../../../apollo/ad/useCountAdsByDate';
import { Fetching } from '../../../components/Fetching';
import { Text } from '../../../components/themed/Text';

interface CountAdsByDateComponentProps {
  fromDate: string;
}

export const CountAdsByDateComponent: React.FC<CountAdsByDateComponentProps> =
  ({ fromDate }) => {
    const toDate = moment().format();

    const { data, loading } = useCountAdsByDate({
      fromDate,
      toDate,
    });

    if (loading) {
      return <Fetching />;
    }

    return (
      <Text>
        {texts.numberOfAds}: {data?.countAdsByDate || 0}
      </Text>
    );
  };
