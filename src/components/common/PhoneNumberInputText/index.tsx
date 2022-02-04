/// BASE IMPORTS
import { useEffect, useState } from 'react';
import _ from 'lodash';
/// BASE IMPORTS END

/// MATERIAL - UI
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  OutlinedInputProps,
  FormControlProps,
  FormLabelProps,
  FormHelperText
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
/// MATERIAL - UI END

/// OWN COMPONENTS
import TextMaskCustom from '../InputTextMask';
import TextField from '../TextField';
/// OWN COMPONENTS END

/// OWN HOOKS
import useIsMounted from '../../../hooks/useIsMounted';
/// OWN HOOKS END

/// SERVICES
import countriesPhoneNumbers from '../../../services/countriesPhoneNumbers.service';
/// SERVICES END

/// i18N
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobal } from '../../../i18n/globals/i18n';
/// i18N END

/// TYPES
type TProps = {
  label: string;
  helperText?: string;
  labelProps?: FormLabelProps;
  onResetValue: (value: string) => void;
  formControlProps?: { 'data-testid'?: string } & FormControlProps;
} & OutlinedInputProps;
/// TYPES END

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      marginBottom: 10
    },
    select: {
      padding: '17px 5px',
      marginRight: 5
    }
  })
);

const getCurrentPhoneConfig = (value = '') => {
  const [countryCode] = value.split(' ');
  return _.find(countriesPhoneNumbers, { countryCode }) || countriesPhoneNumbers[0];
};

function PhoneNumberInputText(props: TProps): JSX.Element {
  const classes = useStyles();
  const isMounted = useIsMounted();
  const { t } = useTranslation(i18nGlobal);
  const { id, error, label, labelProps, helperText, value } = props;
  const [phoneConfig, setPhoneConfig] = useState(getCurrentPhoneConfig(value as string));

  useEffect(() => {
    const { onResetValue } = props;
    if (!isMounted && typeof onResetValue === 'function') {
      onResetValue('');
    }
  }, [phoneConfig]);

  return (
    <>
      <FormLabel htmlFor={id} error={error} className={classes.label} {...labelProps}>
        {label}
      </FormLabel>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Select
          disableUnderline
          defaultValue={countriesPhoneNumbers[0].value}
          id="countryPhone-selector"
          name="countryPhone"
          value={phoneConfig.value}
          color="secondary"
          labelId="phoneCountry-selector-label"
          variant="standard"
          inputProps={{
            className: classes.select
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
          renderValue={value => countriesPhoneNumbers.find(item => item.value === value).flag}
          onChange={e =>
            setPhoneConfig(countriesPhoneNumbers.find(item => item.value === e.target.value))
          }
        >
          {countriesPhoneNumbers.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>
              {item.flag}
              &nbsp;&nbsp;
              {t(`countries.${item.value}`)}
            </MenuItem>
          ))}
        </Select>
        <FormControl>
          <TextField
            {..._.omit(props, ['helperText', 'label', 'onResetValue', 'error'])}
            inputComponent={TextMaskCustom as any}
            inputProps={{
              mask: phoneConfig.mask,
              'data-testid': 'documentNumber'
            }}
          />
        </FormControl>
      </Box>
      {error && (
        <FormHelperText error component="div">
          {helperText}
        </FormHelperText>
      )}
    </>
  );
}

export default PhoneNumberInputText;
