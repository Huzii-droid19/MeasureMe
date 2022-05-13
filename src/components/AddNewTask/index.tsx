import React from 'react';
import {Container, InputField} from './styles';

const AddNewTask = ({translateY}: {translateY: any}) => {
  return (
    <Container translateY={translateY}>
      <InputField placeholder="Add new task" />
    </Container>
  );
};

export default AddNewTask;
