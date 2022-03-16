import { Avatar, Typography } from '@material-ui/core';
import avatarStyles from './style.module';

interface IAvatarLetter {
  name: string;
  size: string;
}

const AvatarLetter = (props: IAvatarLetter): JSX.Element => {
  const { name, size } = props;

  const classes = avatarStyles();

  const getInitials = str => {
    const initials = str.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);
    if (str) {
      return initials.join('');
    }
    return initials;
  };

  return (
    <Avatar
      alt="avatar"
      className={classes.avatar}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Typography variant="h5" className={classes.avatarText}>
        {getInitials(name)}
      </Typography>
    </Avatar>
  );
};

export default AvatarLetter;
