import React from 'react';
import {Container, Description, Title, TextContainer, DateBox} from './styles';
import {CheckBox} from '@ui-kitten/components';

const TaskContainer = ({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: Date;
}) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Container>
      <CheckBox
        status="primary"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <TextContainer>
        <Title>{title}</Title>
        <Description>
          {description.slice(0, 30) + (description.length > 30 ? '...' : '')}
        </Description>
        <DateBox>{date}</DateBox>
      </TextContainer>
    </Container>
  );
};

export default TaskContainer;
