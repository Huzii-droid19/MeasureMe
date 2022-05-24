import {Container, InputField, Month, MonthWrapper, StyledIcon} from './styles';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import moment from 'moment';

interface HeaderProps {
  currentDate: string;
  calendarHandler: () => void;
  search: string;
  onSearch: (text: string) => void;
}
type SearchBarProps = {
  search: string;
  onSearch: (text: string) => void;
  iconColor: string;
  searchHandler: () => void;
};

type MonthViewProps = {
  currentDate: string;
  calendarHandler: () => void;
  iconColor: string;
  searchHandler: () => void;
};

const SearchBar = ({
  search,
  onSearch,
  iconColor,
  searchHandler,
}: SearchBarProps) => {
  return (
    <>
      <InputField placeholder="Search" value={search} onChangeText={onSearch} />
      <TouchableOpacity onPress={searchHandler}>
        <StyledIcon name="close" fill={iconColor} />
      </TouchableOpacity>
    </>
  );
};

const MonthView = ({
  currentDate,
  calendarHandler,
  iconColor,
  searchHandler,
}: MonthViewProps) => {
  return (
    <>
      <MonthWrapper onPress={calendarHandler}>
        <Month>{moment(currentDate).format('MMMM-DD')}</Month>
        <StyledIcon name="calendar-outline" fill={iconColor} />
      </MonthWrapper>

      <TouchableOpacity onPress={searchHandler}>
        <StyledIcon name="search-outline" fill={iconColor} />
      </TouchableOpacity>
    </>
  );
};
const Header = ({
  currentDate,
  calendarHandler,
  onSearch,
  search,
}: HeaderProps) => {
  const [isSearchingVisible, setIsSearchingVisible] =
    React.useState<boolean>(false);
  const searchHandler = () => {
    setIsSearchingVisible(!isSearchingVisible);
  };
  const theme = useTheme();

  return (
    <Container theme={theme['color-header']}>
      {isSearchingVisible ? (
        <SearchBar
          search={search}
          onSearch={onSearch}
          iconColor={theme['color-primary-default']}
          searchHandler={searchHandler}
        />
      ) : (
        <MonthView
          currentDate={currentDate}
          iconColor={theme['color-primary-default']}
          calendarHandler={calendarHandler}
          searchHandler={searchHandler}
        />
      )}
    </Container>
  );
};

export default Header;
