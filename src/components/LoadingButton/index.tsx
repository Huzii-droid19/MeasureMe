import React from 'react';
import {StyledButton} from './styles';
import Loader from 'components/Loader';

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
  return (
    <>
      {isLoading && <Loader />}
      <StyledButton
        width={width}
        size={size}
        disabled={disabled}
        onPress={onPress}
        status={status}
        appearance={appearance}>
        {label}
      </StyledButton>
    </>
  );
};

export default LoadingButton;
