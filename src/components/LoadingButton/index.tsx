import React from 'react';
import {StyledButton} from './styles';
import {Spinner} from '@ui-kitten/components';

interface LoadingButtonProps {
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const SpinnerComponent = () => (
  <Spinner size="small" animating={true} status="control" />
);

const LoadingButton = ({
  label,
  isLoading,
  onPress,
  disabled,
}: LoadingButtonProps) => {
  return (
    <>
      <StyledButton
        disabled={disabled}
        accessoryLeft={isLoading && SpinnerComponent}
        onPress={onPress}>
        {label}
      </StyledButton>
    </>
  );
};

export default LoadingButton;
