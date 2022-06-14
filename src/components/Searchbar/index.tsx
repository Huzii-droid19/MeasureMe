import {AutocompleteItem, useTheme} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {pathOr} from 'ramda';

import {InputField, StyledIcon} from './styles';
import {Task} from 'types';

interface SearchBarProps {
  toggleSearch: () => void;
  data: Task[];
  setData: (data: Task[]) => void;
}

const SearchBar = ({toggleSearch, data, setData}: SearchBarProps) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('');

  const filter = (item: Task, query: string) =>
    pathOr('', ['title'], item).toLowerCase().includes(query.toLowerCase());

  const renderOption = (item: Task, index: number) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  const onSearch = (query: string) => {
    setValue(query);
    setData(data.filter(item => filter(item, query)));
  };
  const onSelect = (index: number) => {
    setValue(data[index].title);
    setData(data.filter(item => filter(item, data[index].title)));
  };

  return (
    <>
      <InputField
        placeholder="Search"
        value={value}
        onChangeText={onSearch}
        onSelect={onSelect}>
        {data.map(renderOption)}
      </InputField>
      <TouchableOpacity onPress={toggleSearch}>
        <StyledIcon name="close" fill={theme['color-primary-default']} />
      </TouchableOpacity>
    </>
  );
};

export default SearchBar;
