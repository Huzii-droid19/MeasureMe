import React from 'react';
import {CheckBoxLabel, StyledCheckBox} from './styles';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const CheckBox = ({label, onChange, value}: Props) => {
  return (
    <StyledCheckBox checked={value} onChange={onChange}>
      <CheckBoxLabel>{label}</CheckBoxLabel>
    </StyledCheckBox>
  );
};

export default CheckBox;
