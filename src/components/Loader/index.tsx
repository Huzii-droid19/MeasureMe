import React from 'react';
import {StyledModal} from './styles';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@ui-kitten/components';

const Loader = () => {
  const theme = useTheme();
  return (
    <StyledModal
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      visible={true}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={theme['color-primary-700']}
      />
    </StyledModal>
  );
};

export default Loader;
