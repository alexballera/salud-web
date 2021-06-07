import React from 'react';
/// MATERIAL-UI
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
/// MATERIAL-UI END

/// TYPES
type IProps = {
  value: string;
};
/// TYPES END

const PasswordValidator = ({ value }: IProps): JSX.Element => {
  const getValidityIcon = (check: (value: string) => boolean) => {
    if (check(value)) {
      return <CheckIcon style={{ marginRight: 10 }} />;
    } else {
      return <CloseIcon style={{ marginRight: 10 }} />;
    }
  };
  return (
    <Paper square elevation={0} style={{ padding: '15px 0' }}>
      <div style={{ display: 'flex' }}>
        {getValidityIcon((val: string) => /[A-Z]/.test(val))}
        <Typography>Usar mayúsculas</Typography>
      </div>
      <div style={{ display: 'flex' }}>
        {getValidityIcon((val: string) => /[a-z]/.test(val))}
        <Typography>Usar minúsculas</Typography>
      </div>
      <div style={{ display: 'flex' }}>
        {getValidityIcon((val: string) => /[0-9]/.test(val))}
        <Typography>Usar números</Typography>
      </div>
      <div style={{ display: 'flex' }}>
        {getValidityIcon((val: string) => val.length >= 8)}
        <Typography>Mínimo 8 caracteres</Typography>
      </div>
    </Paper>
  );
};

export default PasswordValidator;
