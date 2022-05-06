import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AutoCompleteGoogleMaps from '@/src/components/common/AutoCompletePlaces';
import autoCompleteLocationStyles from '@/src/components/common/AutoCompletePlaces/style.module';

type TInitialCoords = {
  lat: string | null;
  lng: string | null;
  placeName: string | null;
};

type TSearch = {
  searchField: string;
} & TInitialCoords;

type TProps = {
  search?: TSearch;
  searchObject;
  labelText: string;
  placeHolderText: string;
  path: string;
  isActiveModal?: boolean;
  closeModal?;
};

const initalCoords: TInitialCoords = {
  lat: null,
  lng: null,
  placeName: null
};

const SearchWithGeolocation = ({
  isActiveModal,
  closeModal,
  search,
  searchObject,
  labelText,
  placeHolderText,
  path
}: TProps): JSX.Element => {
  const router = useRouter();
  const classes = autoCompleteLocationStyles();
  const [searchField, setSearchField] = useState(search?.searchField || '');
  const [coords, setCoords] = useState(search || initalCoords);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const redirecSearch = () => {
    const filters = {
      ...search,
      ...coords,
      ...(!!searchField && { searchField })
    }
    
    searchObject(filters);
    
    if (path) {
      router.push({
        pathname: path,
        query: {
          searchField: filters.searchField,
          lat: filters.lat,
          lng: filters.lng,
          placeName: filters.placeName
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
              defaultValue={search?.searchField}
              className={classes.inputColor}
              fullWidth
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (!!searchField) {
                    redirecSearch();
                    if (isActiveModal) closeModal(false);
                  }
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
            <AutoCompleteGoogleMaps
              recordCoords={setCoords}
              placeName={search?.placeName}
              redirecTo={redirecSearch}
              isActiveModal={isActiveModal}
              closeModal={closeModal}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchWithGeolocation;
