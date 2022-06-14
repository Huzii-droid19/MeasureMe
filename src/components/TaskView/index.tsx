import React from 'react';
import dayjs from 'dayjs';
import {pathOr} from 'ramda';
import {ThemeType} from '@ui-kitten/components';

import {
  Container,
  Description,
  Title,
  TextContainer,
  Date,
  StyledIcon,
  IconWrapper,
} from './styles';
import {Task} from 'types';
import {DeleteModal} from 'components';
import {NavigationService} from 'navigation';

type ItemViewProps = {
  item: Task;
  onPress: () => void;
  theme: ThemeType;
};

const ItemView = ({item, onPress, theme}: ItemViewProps) => {
  const [visible, setVisible] = React.useState(false);
  const title: String = pathOr('', ['title'], item);
  const description: string = pathOr('', ['description'], item);
  const isCompleted: boolean = pathOr(false, ['isCompleted'], item);
  const onClose = () => {
    setVisible(!visible);
  };
  return (
    <Container isCompleted={isCompleted}>
      <TextContainer onPress={onPress}>
        <Title isCompleted={isCompleted}>{title}</Title>
        <Description>
          {description.slice(0, 30) + (description.length > 30 ? '...' : '')}
        </Description>
        <Date>{dayjs(item.date).format('DD-MM-YYYY')}</Date>
      </TextContainer>
      <IconWrapper
        onPress={() => NavigationService.navigate('Edit', {task: item})}>
        <StyledIcon name="edit-outline" fill={theme['color-primary-500']} />
      </IconWrapper>
      <IconWrapper onPress={() => setVisible(!visible)}>
        <StyledIcon name="trash-2-outline" fill={theme['color-danger-500']} />
      </IconWrapper>
      <DeleteModal
        visible={visible}
        onClose={onClose}
        onBackdropPress={onClose}
        task={item}
      />
    </Container>
  );
};

export default ItemView;
