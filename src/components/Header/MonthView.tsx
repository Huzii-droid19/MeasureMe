import {useTheme} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Month, MonthWrapper, StyledIcon} from './styles';

interface MonthViewProps {
  currentDate: string;
  calendarHandler: () => void;
  toggleSearch: () => void;
}

const MonthView = ({
  currentDate,
  calendarHandler,
  toggleSearch,
}: MonthViewProps) => {
  const theme = useTheme();
  return (
    <>
      <MonthWrapper onPress={calendarHandler} activeOpacity={0.7}>
        <Month>{moment(currentDate).format('MMMM-DD')}</Month>
        <StyledIcon
          name="calendar-outline"
          fill={theme['color-primary-default']}
        />
      </MonthWrapper>
      <TouchableOpacity onPress={toggleSearch}>
        <StyledIcon
          name="search-outline"
          fill={theme['color-primary-default']}
        />
      </TouchableOpacity>
    </>
  );
};

export default MonthView;
