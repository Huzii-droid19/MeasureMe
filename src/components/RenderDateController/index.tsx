import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Controller, UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import {Keyboard} from 'react-native';
import {TaskForm} from 'types/index';
import {
  StyledModal,
  StyledCard,
  StyledCalendar,
  DateLabel,
  Container,
  Label,
  StyledIcon,
} from './styles';

interface DateControllerProps {
  name: string;
  inputControl: any;
  setValue: UseFormSetValue<TaskForm>;
  getValues: UseFormGetValues<TaskForm>;
}

const index = ({
  inputControl,
  setValue,
  getValues,
  name,
}: DateControllerProps) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpenModal = () => {
    setOpen(true);
    Keyboard.dismiss();
  };
  const onSelect = (date: Date) => {
    setValue('date', date, {shouldValidate: true});
    setOpen(false);
  };
  return (
    <Controller
      control={inputControl}
      render={({field: {onBlur}}) => (
        <Container onPress={handleOpenModal}>
          <StyledIcon name="calendar" fill={theme['text-hint-color']} />
          <Label>{getValues('date').toDateString()}</Label>
          <StyledModal
            visible={open}
            backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            onBackdropPress={() => setOpen(!open)}>
            <StyledCard disabled={true}>
              <DateLabel>{getValues('date').toDateString()}</DateLabel>
              <StyledCalendar
                date={getValues('date')}
                onSelect={onSelect}
                min={new Date(new Date().getTime() + 86400000)}
              />
            </StyledCard>
          </StyledModal>
        </Container>
      )}
      name={name.toLocaleLowerCase()}
    />
  );
};

export default index;
