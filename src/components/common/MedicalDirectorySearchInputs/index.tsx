/// BASE IMPORTS
import React, { useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
/// i18n END

/// MATERIAL
import { TextField } from '@mui/material';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Box from '@material-ui/core/Box';
import { makeStyles, InputAdornment } from '@material-ui/core';
/// MATERIAL END

/// STYLES
import { secondaryMainColor } from '../../../styles/js/theme';
/// STYLES END

const useStyles = makeStyles({
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  inputColor: {
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': { borderColor: secondaryMainColor }
    },
    '& label.Mui-focused': {
      color: secondaryMainColor
    }
  }
});

function MedicalDirectorySearchInputs(): JSX.Element {
  const classes = useStyles();

  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);
  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);

  const [locationField, setLocationField] = useState('');
  const [locationShow, setLocationShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
    if (e.target.value === '') {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationField(e.target.value);
    if (e.target.value === '') {
      setLocationShow(false);
    } else {
      setLocationShow(true);
    }
  };

  return (
    <div>
      <Box mt={3}>
        <TextField
          id="search"
          label={t('items.labelSearch', { ns: i18nMedicalDirectory })}
          placeholder={t('items.placeholderSearch', { ns: i18nMedicalDirectory })}
          type="text"
          className={classes.inputColor}
          fullWidth
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon className={classes.icon} />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box mt={3}>
        <TextField
          id="outlined-location"
          label={t('items.labelLocation', { ns: i18nMedicalDirectory })}
          defaultValue={t('items.placeholderLocation', { ns: i18nMedicalDirectory })}
          placeholder={t('items.placeholderLocation', { ns: i18nMedicalDirectory })}
          type="text"
          className={classes.inputColor}
          fullWidth
          onChange={handleChangeLocation}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LocationOnOutlinedIcon className={classes.icon} />
              </InputAdornment>
            )
          }}
        />
      </Box>
    </div>
  );
}

export default MedicalDirectorySearchInputs;
