import React from 'react';
import {StyledButton} from './styles';
import {Spinner} from '@ui-kitten/components';

interface LoadingButtonProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  appearance?: 'filled' | 'outline' | 'ghost';
}

const SpinnerComponent = () => (
  <Spinner size="small" animating={true} status="info" />
);

const LoadingButton = ({
  label,
  isLoading,
  onPress,
  disabled,
  status,
  appearance,
}: LoadingButtonProps) => {
  return (
    <>
      <StyledButton
        disabled={disabled}
        accessoryLeft={isLoading && SpinnerComponent}
        onPress={onPress}
        status={status}
        appearance={appearance}>
        {label}
      </StyledButton>
    </>
  );
};

export default LoadingButton;
