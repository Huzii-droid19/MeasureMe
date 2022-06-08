import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {AddMeetupButton, IconContainer, MeetLabel, StyledIcon} from './styles';

interface Props {
  setMeet: React.Dispatch<React.SetStateAction<boolean>>;
  meet: boolean;
}

const MeetupButton = ({meet, setMeet}: Props) => {
  const theme = useTheme();
  const [meetIconName, setMeetIconName] =
    React.useState<string>('video-off-outline');
  const [meetUpText, setMeetUpText] = React.useState<string>(
    'Add video conference',
  );
  const handleAddMeetUp = () => {
    setMeet(true);
    setMeetIconName('video-outline');
    setMeetUpText('Video conference added');
  };
  const handleRemoveMeetUp = () => {
    setMeet(false);
    setMeetIconName('video-off-outline');
    setMeetUpText('Add video conference');
  };
  return (
    <AddMeetupButton onPress={handleAddMeetUp} disabled={meet}>
      <StyledIcon name={meetIconName} fill={theme['text-hint-color']} />
      <MeetLabel>{meetUpText}</MeetLabel>
      {meet && (
        <IconContainer onPress={handleRemoveMeetUp}>
          <StyledIcon name="close-outline" fill={theme['text-hint-color']} />
        </IconContainer>
      )}
    </AddMeetupButton>
  );
};

export default MeetupButton;
