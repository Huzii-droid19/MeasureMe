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
  toggleSearch: (prevState: any) => void;
};

type MonthViewProps = {
  currentDate: string;
  calendarHandler: () => void;
  iconColor: string;
  toggleSearch: (prevState: any) => void;
};

const SearchBar = ({
  search,
  onSearch,
  iconColor,
  toggleSearch,
}: SearchBarProps) => {
  return (
    <>
      <InputField placeholder="Search" value={search} onChangeText={onSearch} />
      <TouchableOpacity
        onPress={() => toggleSearch((prevState: boolean) => !prevState)}>
        <StyledIcon name="close" fill={iconColor} />
      </TouchableOpacity>
    </>
  );
};

const MonthView = ({
  currentDate,
  calendarHandler,
  iconColor,
  toggleSearch,
}: MonthViewProps) => {
  return (
    <>
      <MonthWrapper onPress={calendarHandler}>
        <Month>{moment(currentDate).format('MMMM-DD')}</Month>
        <StyledIcon name="calendar-outline" fill={iconColor} />
      </MonthWrapper>

      <TouchableOpacity
        onPress={() => toggleSearch((prevState: boolean) => !prevState)}>
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
  const theme = useTheme();

  return (
    <Container theme={theme['color-header']}>
      {isSearchingVisible ? (
        <SearchBar
          search={search}
          onSearch={onSearch}
          iconColor={theme['color-primary-default']}
          toggleSearch={setIsSearchingVisible}
        />
      ) : (
        <MonthView
          currentDate={currentDate}
          iconColor={theme['color-primary-default']}
          calendarHandler={calendarHandler}
          toggleSearch={setIsSearchingVisible}
        />
      )}
    </Container>
  );
};

export default Header;
