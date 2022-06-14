import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@ui-kitten/components';

import {StyledButton} from './styles';

interface LoadingButtonProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  appearance?: 'filled' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  width?: string | number;
}

const LoadingButton = ({
  label,
  isLoading,
  onPress,
  disabled,
  status,
  appearance,
  size,
  width,
}: LoadingButtonProps) => {
  const theme = useTheme();
  return (
    <StyledButton
      width={width}
      size={size}
      disabled={disabled}
      onPress={onPress}
      status={status}
      accessoryLeft={
        isLoading && <ActivityIndicator size="small" color={theme['white']} />
      }
      appearance={appearance}>
      {label}
    </StyledButton>
  );
};

export default LoadingButton;
