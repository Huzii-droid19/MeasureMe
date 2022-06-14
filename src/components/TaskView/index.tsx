import React from 'react';
import moment from 'moment';
import {pathOr} from 'ramda';

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
  theme: any;
};

const ItemView = ({item, onPress, theme}: ItemViewProps) => {
  const [visible, setVisible] = React.useState(false);
  const onClose = () => {
    setVisible(!visible);
  };
  return (
    <Container isCompleted={pathOr(false, ['isCompleted'], item)}>
      <TextContainer onPress={onPress}>
        <Title isCompleted={pathOr(false, ['isCompleted'], item)}>
          {pathOr('', ['title'], item)}
        </Title>
        <Description>
          {pathOr('', ['description'], item).slice(0, 30) +
            (pathOr('', ['description'], item).length > 30 ? '...' : '')}
        </Description>
        <Date>{moment(item.date).format('DD-MM-YYYY')}</Date>
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
