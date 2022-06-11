import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {
  AddMeetupButton,
  IconContainer,
  MeetLabel,
  StyledIcon,
  StyledImageIcon,
} from './styles';
interface Props {
  isMeetupAdded: boolean;
  setIsMeetUpAdded: (isMeetupAdded: boolean) => void;
}
const icon =
  'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png';

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

  const renderIcon = () =>
    isMeetupAdded ? (
      <StyledImageIcon source={{uri: icon}} />
    ) : (
      <StyledIcon name="video-off-outline" fill={theme['text-hint-color']} />
    );

  return (
    <AddMeetupButton onPress={handleMeetup} disabled={isMeetupAdded}>
      {renderIcon()}
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
