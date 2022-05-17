import React from 'react';
import {
  Container,
  Description,
  Title,
  TextContainer,
  Date,
  CustomCheckBox,
} from './styles';
import {Task} from '../../types';
import moment from 'moment';

const ItemView = ({item, onPress}: {item: Task; onPress: any}) => {
  const [isCompleted, setIsCompleted] = React.useState<boolean>(
    item.isCompleted,
  );
  return (
    <Container>
      <CustomCheckBox
        status="primary"
        checked={isCompleted}
        onChange={() => {
          setIsCompleted(!isCompleted);
        }}
      />
      <TextContainer onPress={onPress}>
        <Title>{item.title}</Title>
        <Description>
          {item.description.slice(0, 30) +
            (item.description.length > 30 ? '...' : '')}
        </Description>
        <Date>{moment(item.date).format('DD-MM-YYYY')}</Date>
      </TextContainer>
    </Container>
  );
};

export default ItemView;
