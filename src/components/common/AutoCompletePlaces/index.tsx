import { useEffect, useState, useMemo } from 'react';
import { TextField, Grid, Typography, Autocomplete, Box } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

import { getGeocode, getLatLng } from 'use-places-autocomplete';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';

import { getPosition } from '@/src/utils/helpers';
import autoCompleteLocationStyles from './style.module';

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

const autocompleteService = { current: null };

type TProps = {
  recordCoords;
  placeName?: string;
  redirecTo;
  isActiveModal?: boolean;
  closeModal?;
};

const AutoCompleteGoogleMaps = ({
  recordCoords,
  placeName,
  redirecTo,
  isActiveModal,
  closeModal
}: TProps): JSX.Element => {
  const classes = autoCompleteLocationStyles();
  const { t } = useTranslation([i18Global]);
  const [value, setValue] = useState<PlaceType | any>(
    placeName || t('location.placeHolder', { ns: i18Global })
  );
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);

  const fetch = useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 200),
    []
  );
  useEffect(() => {
    gpsPosition();
  }, []);

  useEffect(() => {
    let active = true;
    const options = {
      types: ['cities'],
      componentRestrictions: { country: 'cr' }
    };
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService(
        null,
        options
      );
    }
    if (!autocompleteService.current) return undefined;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];
        if (value) newOptions = [value];
        recordCoords({ placeName: value.description });
        if (results) newOptions = [...newOptions, ...results];
        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleSelect = async ({ description }) => {
    await getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        // console.log('📍 Coordinates: ', { lat, lng });

        recordCoords(prevState => ({
          ...prevState,
          ...{ lat, lng }
        }));
      })
      .catch(error => {
        console.log('😱 Error: ', error);
      });
  };
  const cleanSelect = () => {
    setInputValue('');
    setValue(t('location.placeHolder', { ns: i18Global }));
    gpsPosition();
  };

  const gpsPosition = async () => {
    await getPosition()
      .then(function (result) {
        const coords = {
          lat: result.latitude,
          lng: result.longitude
        };
        // console.log('📍 Coordinates: ', result.latitude, result.longitude);
        recordCoords(coords);
      })
      .catch(error => {
        console.log('😱 Error: ', error);
      });
  };

  return (
    <>
      <Autocomplete
        id="google-map-demo"
        sx={{ width: '100%' }}
        getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            redirecTo();
            if (value) {
              redirecTo();
              if (isActiveModal) closeModal(false);
            }
          }
        }}
        forcePopupIcon={true}
        popupIcon={''}
        disableClearable={true}
        fullWidth
        renderInput={params => (
          <TextField
            {...params}
            label={t('location.label', { ns: i18Global })}
            placeholder={t('location.placeHolder', { ns: i18Global })}
            className={classes.inputColor}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
        renderOption={(props, option) => {
          const matches = option ? option.structured_formatting.main_text_matched_substrings : null;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length])
          );

          return (
            <>
              {inputValue !== t('location.placeHolder', { ns: i18Global }) && (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item xs onClick={() => handleSelect(option)}>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                      <Typography variant="body2" color="text.secondary">
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              )}
            </>
          );
        }}
      />
      <Box className={classes.icon} onClick={() => cleanSelect()}>
        <LocationOnOutlinedIcon />
      </Box>
    </>
  );
};

export default AutoCompleteGoogleMaps;
