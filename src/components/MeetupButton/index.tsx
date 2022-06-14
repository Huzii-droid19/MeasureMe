import React from 'react';
import {useTheme} from '@ui-kitten/components';

import {
  AddMeetupButton,
  IconContainer,
  MeetLabel,
  StyledIcon,
  StyledImageIcon,
} from './styles';
import {GoogleMeetIcon} from 'assets';
interface Props {
  isMeetupAdded: boolean;
  setIsMeetUpAdded: (isMeetupAdded: boolean) => void;
}

const MeetupButton = ({isMeetupAdded, setIsMeetUpAdded}: Props) => {
  const [meetUpText, setMeetUpText] = React.useState(
    isMeetupAdded ? 'Video conference added' : 'Add Video Conference',
  );
  const theme = useTheme();
  const handleMeetup = () => {
    setIsMeetUpAdded(!isMeetupAdded);
    setMeetUpText(
      isMeetupAdded ? 'Add Video Conference' : 'Video conference added',
    );
  };

  return (
    <AddMeetupButton onPress={handleMeetup} disabled={isMeetupAdded}>
      {isMeetupAdded ? (
        <StyledImageIcon source={GoogleMeetIcon} />
      ) : (
        <StyledIcon name="video-off-outline" fill={theme['text-hint-color']} />
      )}
      <MeetLabel>{meetUpText}</MeetLabel>
      {isMeetupAdded && (
        <IconContainer onPress={handleMeetup}>
          <StyledIcon name="close-outline" fill={theme['text-hint-color']} />
        </IconContainer>
      )}
    </AddMeetupButton>
  );
};

export default MeetupButton;
