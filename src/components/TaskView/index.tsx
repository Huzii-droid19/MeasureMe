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
import {Task} from '../../types';
import moment from 'moment';
import DeleteModal from '../DeleteModal';
import {navigationContainerRef} from '../../navigation';
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
    <Container theme={theme['color-primary-default']}>
      <TextContainer onPress={onPress}>
        <Title>{item.title}</Title>
        <Description>
          {item.description.slice(0, 30) +
            (item.description.length > 30 ? '...' : '')}
        </Description>
        <Date>{moment(item.date).format('DD-MM-YYYY')}</Date>
      </TextContainer>
      <>
        <IconWrapper
          onPress={() => navigationContainerRef.navigate('Edit', {item: item})}>
          <StyledIcon name="edit-outline" fill={theme['color-primary-500']} />
        </IconWrapper>
        <IconWrapper>
          <StyledIcon
            name="trash-2-outline"
            fill={theme['color-danger-500']}
            onPress={() => setVisible(!visible)}
          />
        </IconWrapper>
      </>
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
