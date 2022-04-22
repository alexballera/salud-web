import { useRouter } from 'next/router';
import AutoCompleteGoogleMaps from '@/src/components/common/AutoCompletePlaces';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import autoCompleteLocationStyles from '@/src/components/common/AutoCompletePlaces/style.module';

type TProps = {
  searchObject;
  labelText: string;
  placeHolderText: string;
  path: string;
};

const initalCoords = {
  lat: null,
  lng: null,
  placeName: null
};

const SearchWithGeolocation = ({
  searchObject,
  labelText,
  placeHolderText,
  path
}: TProps): JSX.Element => {
  const router = useRouter();
  const classes = autoCompleteLocationStyles();
  const [searchField, setSearchField] = useState('');
  const [coords, setCoords] = useState(initalCoords);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const redirecSearch = () => {
    searchObject({ searchField, ...coords });

    if (path) {
      router.push({
        pathname: path,
        query: {
          searchField: searchField,
          lat: coords.lat,
          lng: coords.lng,
          placeName: coords.placeName
        }
      });
    }
  };

  return (
    <Box>
      <Grid container direction="column">
        <Grid mt={2} item>
          <Box mt={1}>
            <TextField
              id="outlined-location"
              label={labelText}
              placeholder={placeHolderText}
              type="text"
              className={classes.inputColor}
              fullWidth
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  redirecSearch();
                }
              }}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon className={classes.iconColor} />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Grid>
        <Grid mt={2} item>
          <Box mt={1}>
            <AutoCompleteGoogleMaps recordCoords={setCoords} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchWithGeolocation;
