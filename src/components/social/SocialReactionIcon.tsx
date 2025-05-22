
import React from 'react';

// Interface for the props
interface SocialReactionIconProps {
  iconName: string;
  size?: number;
}

// Component to render reaction icons based on the martial art
const SocialReactionIcon: React.FC<SocialReactionIconProps> = ({ iconName, size = 24 }) => {
  let icon = '👍'; // Default icon

  // Map the icon name to the appropriate emoji
  switch (iconName) {
    case 'boxing':
    case '🥊':
      icon = '🥊';
      break;
    case 'judo':
    case '🥋':
      icon = '🥋';
      break;
    case 'wrestling':
    case '💪':
      icon = '💪';
      break;
    case 'taekwondo':
    case '🦶':
      icon = '🦶';
      break;
    case 'fencing':
    case '🤺':
      icon = '🤺';
      break;
    case 'karate':
    case '✋':
      icon = '✋';
      break;
    case 'thumbs-up':
    case '👍':
      icon = '👍';
      break;
    default:
      icon = '👍';
  }

  return (
    <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>
      {icon}
    </span>
  );
};

export default SocialReactionIcon;
