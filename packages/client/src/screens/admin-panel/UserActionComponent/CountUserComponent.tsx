import moment from 'moment';
import React from 'react';

import texts from '../../../../assets/texts/texts.json';
import { useCountUsersByDate } from '../../../apollo/user/useCountUsersByDate';
import { Fetching } from '../../../components/Fetching';
import { Text } from '../../../components/themed/Text';

interface CountUsersByDateComponentProps {
  fromDate: string;
}

export const CountUsersByDateComponent: React.FC<CountUsersByDateComponentProps> =
  ({ fromDate }) => {
    const toDate = moment().format();

    const { data, loading } = useCountUsersByDate({
      fromDate,
      toDate,
    });

    if (loading) {
      return <Fetching />;
    }

    return (
      <Text>
        {texts.numberOfRegUsers}: {data?.countUsersByDate || 0}
      </Text>
    );
  };
