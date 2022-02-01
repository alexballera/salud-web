import React from 'react';
/// MATERIAL-UI
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LensIcon from '@material-ui/icons/Lens';
import { Box } from '@material-ui/core';
/// MATERIAL-UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nForms } from '../../../i18n/forms/i18n';
/// i18n END

import { useIndicatorsStyles as useStyles } from './styles.module';
import { t } from 'i18next';
/// TYPES
type IProps = {
  value: string;
};
/// TYPES END

const PasswordValidator = ({ value }: IProps): JSX.Element => {
  const { t } = useTranslation(i18nForms);
  const classes = useStyles();
  const getValidityIcon = (check: (value: string) => boolean) => {
    if (check(value)) {
      return <CheckIcon fontSize="small" className={classes.icons} color="secondary" />;
    } else {
      return <CloseIcon fontSize="small" className={classes.icons} color="error" />;
    }
  };
  return (
    <Box mt={2}>
      <div className={classes.containerIndicators}>
        {value ? (
          getValidityIcon((val: string) => /[A-Z]/.test(val))
        ) : (
          <LensIcon fontSize="small" className={`${classes.icons} ${classes.iconBullets}`} />
        )}
        <span className={classes.label}>{t('validations.password.capitalize')}</span>
      </div>
      <div className={classes.containerIndicators}>
        {value ? (
          getValidityIcon((val: string) => /[a-z]/.test(val))
        ) : (
          <LensIcon fontSize="small" className={`${classes.icons} ${classes.iconBullets}`} />
        )}
        <span className={classes.label}>{t('validations.password.lowercase')}</span>
      </div>
      <div className={classes.containerIndicators}>
        {value ? (
          getValidityIcon((val: string) => /[0-9]/.test(val))
        ) : (
          <LensIcon fontSize="small" className={`${classes.icons} ${classes.iconBullets}`} />
        )}
        <span className={classes.label}>{t('validations.password.numbers')}</span>
      </div>
      <div className={classes.containerIndicators}>
        {value ? (
          getValidityIcon((val: string) => val.length >= 8 && val.length <= 16)
        ) : (
          <LensIcon fontSize="small" className={`${classes.icons} ${classes.iconBullets}`} />
        )}
        <span className={classes.label}>{t('validations.password.characters')}</span>
      </div>
    </Box>
  );
};

export default PasswordValidator;
