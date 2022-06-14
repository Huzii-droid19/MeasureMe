import React from 'react';

import {Container} from './styles';
import {Searchbar} from 'components';
import MonthView from './MonthView';
import {Task} from 'types';
interface HeaderProps {
  currentDate: string;
  calendarHandler: () => void;
  isCalendarVisible: boolean;
  data: Task[];
  setData: (data: Task[]) => void;
}

const Header = ({
  currentDate,
  calendarHandler,
  isCalendarVisible,
  data,
  setData,
}: HeaderProps) => {
  const [isSearchingVisible, setIsSearchingVisible] =
    React.useState<boolean>(false);
  const toggleSearch = () => {
    setIsSearchingVisible(!isSearchingVisible);
    if (!isCalendarVisible) calendarHandler();
  };

  return (
    <Container>
      {isSearchingVisible ? (
        <Searchbar data={data} setData={setData} toggleSearch={toggleSearch} />
      ) : (
        <MonthView
          currentDate={currentDate}
          calendarHandler={calendarHandler}
          toggleSearch={toggleSearch}
        />
      )}
    </Container>
  );
};

export default Header;
