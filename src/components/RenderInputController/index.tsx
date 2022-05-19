import React from 'react';
import {Controller} from 'react-hook-form';
import {StyledInput, InputLabel} from './styles';

type InputControllerProps = {
  label: string;
  inputControl: any;
  multiline?: boolean;
  minHeight?: number;
};

const RenderController = ({
  label,
  inputControl,
  multiline,
  minHeight,
}: InputControllerProps) => {
  return (
    <Controller
      control={inputControl}
      render={({field: {onChange, onBlur, value}}) => (
        <StyledInput
          textStyle={multiline ? {minHeight: minHeight} : {}}
          multiline={multiline}
          label={() => {
            return <InputLabel>{label}</InputLabel>;
          }}
          placeholder={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
      )}
      name={label.toLocaleLowerCase()}
    />
  );
};

export default RenderController;
