import React from 'react';
import {
  Container,
  Description,
  Title,
  TextContainer,
  Date,
  StyledIcon,
  IconWrapper,
} from './styles';
import {Task} from 'types/index';
import moment from 'moment';
import {DeleteModal} from 'components/index';
import {NavigationService} from 'navigation/index';
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
  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  return (
    <Container isCompleted={item.isCompleted}>
      <TextContainer onPress={onPress}>
        <Title isCompleted={item.isCompleted}>{item.title}</Title>
        <Description>
          {item.description.slice(0, 30) +
            (item.description.length > 30 ? '...' : '')}
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
        backdropStyle={backdropStyle}
        onBackdropPress={onClose}
        task={item}
      />
    </Container>
  );
};

export default ItemView;
