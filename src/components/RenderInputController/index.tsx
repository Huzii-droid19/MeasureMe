import React, {ReactElement} from 'react';
import {Controller} from 'react-hook-form';
import {StyledInput, InputLabel} from './styles';
import {ImageProps, StyleProp, TextStyle} from 'react-native';

type InputControllerProps = {
  name: string;
  inputControl: any;
  multiline?: boolean;
  textStyle?: StyleProp<TextStyle>;
  accessoryLeft?: (props: ImageProps) => ReactElement;
  placeholder?: string;
};

const RenderController = ({
  name,
  inputControl,
  multiline,
  textStyle,
  accessoryLeft,
  placeholder,
}: InputControllerProps) => {
  return (
    <Controller
      control={inputControl}
      render={({field: {onChange, onBlur, value}}) => (
        <StyledInput
          textStyle={textStyle}
          multiline={multiline}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          accessoryLeft={accessoryLeft}
        />
      )}
      name={name.toLocaleLowerCase()}
    />
  );
};

export default RenderController;
