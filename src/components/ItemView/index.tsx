import React from 'react';
import {
  Container,
  Description,
  Title,
  TextContainer,
  Date,
  CustomCheckBox,
  StyledIcon,
  IconWrapper,
} from './styles';
import {Task} from '../../types';
import moment from 'moment';

interface ItemViewProps {
  item: Task;
  onPress: () => void;
  theme: string;
}

const ItemView = ({item, onPress, theme}: ItemViewProps) => {
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
      <IconWrapper>
        <StyledIcon name="more-vertical" fill={theme} />
      </IconWrapper>
      {/* <Menu
        visible={visible}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}
        selectedIndex={selectedIndex}
        anchor={renderIcon}
        menuItems={[{title: 'Edit'}, {title: 'Delete'}]}
        placement="left"
      /> */}
    </Container>
  );
};

export default ItemView;
