import React from 'react';
import {Controller} from 'react-hook-form';
import {StyledInput, InputLabel} from './styles';

interface InputControllerProps {
  label: string;
  inputControl: any;
}

const RenderController = ({label, inputControl}: InputControllerProps) => {
  return (
    <Controller
      control={inputControl}
      render={({field: {onChange, onBlur, value}}) => (
        <StyledInput
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
