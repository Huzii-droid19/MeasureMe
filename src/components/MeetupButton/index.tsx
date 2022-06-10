import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {AddMeetupButton, IconContainer, MeetLabel, StyledIcon} from './styles';

interface Props {
  isMeetupAdded: boolean;
  setIsMeetUpAdded: (isMeetupAdded: boolean) => void;
}

const MeetupButton = ({isMeetupAdded, setIsMeetUpAdded}: Props) => {
  const [meetState, setMeetState] = React.useState({
    iconName: 'video-off-outline',
    meetUpText: 'Add video conference',
  });

  const theme = useTheme();
  const handleAddMeetUp = () => {
    setMeetState({
      iconName: 'video-outline',
      meetUpText: 'Video conference added',
    });
    setIsMeetUpAdded(true);
  };
  const handleRemoveMeetUp = () => {
    setMeetState({
      iconName: 'video-off-outline',
      meetUpText: 'Add video conference',
    });
    setIsMeetUpAdded(false);
  };
  return (
    <AddMeetupButton onPress={handleAddMeetUp} disabled={isMeetupAdded}>
      <StyledIcon name={meetState.iconName} fill={theme['text-hint-color']} />
      <MeetLabel>{meetState.meetUpText}</MeetLabel>
      {isMeetupAdded && (
        <IconContainer onPress={handleRemoveMeetUp}>
          <StyledIcon name="close-outline" fill={theme['text-hint-color']} />
        </IconContainer>
      )}
    </AddMeetupButton>
  );
};

export default MeetupButton;
