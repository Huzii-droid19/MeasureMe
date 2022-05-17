import React from 'react';
import {Controller, UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import {TaskForm} from '../../types';
import {StyledDatePicker, InputLabel} from './styles';

interface DateControllerProps {
  label: string;
  inputControl: any;
  setValue: UseFormSetValue<TaskForm>;
  getValues: UseFormGetValues<TaskForm>;
}

const index = ({
  label,
  inputControl,
  setValue,
  getValues,
}: DateControllerProps) => {
  return (
    <Controller
      control={inputControl}
      render={({field: {onBlur}}) => (
        <StyledDatePicker
          label={() => <InputLabel>{label}</InputLabel>}
          placeholder={getValues('date')}
          date={getValues('date')}
          onSelect={(date: Date) =>
            setValue('date', date, {shouldValidate: true})
          }
          onBlur={onBlur}
          min={new Date()}
        />
      )}
      name={label.toLocaleLowerCase()}
    />
  );
};

export default index;
