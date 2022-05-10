import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AutoCompleteGoogleMaps from '@/src/components/common/AutoCompletePlaces';
import autoCompleteLocationStyles from '@/src/components/common/AutoCompletePlaces/style.module';
import { useSelector } from '@/src/store';
import { searchOnFilter } from '@/src/store/slice/search.slice';

type TProps = {
  isActiveModal?: boolean;
  closeModal?;
  labelText: string;
  placeHolderText: string;
  path: string;
};

const SearchWithGeolocation = ({
  isActiveModal,
  closeModal,
  labelText,
  placeHolderText,
  path
}: TProps): JSX.Element => {
  const router = useRouter();
  const classes = autoCompleteLocationStyles();
  const { placeName, textFilter, lat, lng } = useSelector(state => state.search);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      searchOnFilter({
        textFilter: e.target.value
      })
    );
    console.log(e);
  };

  const redirecSearch = (textFilter: string) => {
    // const filters = {
    //   ...search,
    //   ...coords,
    //   searchField
    // };

    // searchObject(filters);

    if (path) {
      router.push({
        pathname: path,
        query: {
          searchField: textFilter,
          lat: lat,
          lng: lng,
          placeName: placeName
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
              defaultValue={textFilter}
              className={classes.inputColor}
              fullWidth
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  redirecSearch(textFilter);
                  if (isActiveModal) closeModal(false);
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
