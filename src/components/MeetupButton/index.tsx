import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {AddMeetupButton, IconContainer, MeetLabel, StyledIcon} from './styles';
import {MeetButtonParams} from 'types/index';

interface Props {
  setMeet: React.Dispatch<React.SetStateAction<MeetButtonParams>>;
  meet: MeetButtonParams;
}

const MeetupButton = ({meet, setMeet}: Props) => {
  const theme = useTheme();
  const handleAddMeetUp = () => {
    setMeet({
      isAdded: true,
      iconName: 'video-outline',
      meetUpText: 'Video conference added',
    });
  };
  const handleRemoveMeetUp = () => {
    setMeet({
      isAdded: false,
      iconName: 'video-off-outline',
      meetUpText: 'Add video conference',
    });
  };
  return (
    <AddMeetupButton onPress={handleAddMeetUp} disabled={meet}>
      <StyledIcon name={meet.iconName} fill={theme['text-hint-color']} />
      <MeetLabel>{meet.meetUpText}</MeetLabel>
      {meet && (
        <IconContainer onPress={handleRemoveMeetUp}>
          <StyledIcon name="close-outline" fill={theme['text-hint-color']} />
        </IconContainer>
      )}
    </AddMeetupButton>
  );
};

export default MeetupButton;
