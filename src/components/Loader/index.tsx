import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@ui-kitten/components';

import {StyledModal} from './styles';

const Loader = () => {
  const theme = useTheme();
  return (
    <StyledModal
      backdropStyle={{backgroundColor: theme['backdrop-color']}}
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
