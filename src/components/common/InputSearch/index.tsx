import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import searchNavbarDoctorStyles from '../../single/searchNavbarDoctor/styles.module';

type TSearch = {
  searchField: string;
};

type TProps = {
  isActiveModal?: boolean;
  closeModal?;
  search?: TSearch;
  searchObject;
  labelText: string;
  placeHolderText: string;
  path: string;
};

function InputSearch({
  isActiveModal,
  closeModal,
  search,
  searchObject,
  labelText,
  placeHolderText,
  path
}: TProps): JSX.Element {
  const router = useRouter();
  const classes = searchNavbarDoctorStyles();
  const [searchField, setSearchField] = useState(search?.searchField || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const redirectResults = () => {
    searchObject({ searchField });
    if (path) {
      router.push({
        pathname: path,
        query: {
          searchField: searchField
        }
      });
    }
  };

  return (
    <TextField
      id="outlined-searchDoctor"
      label={labelText}
      placeholder={placeHolderText}
      type="text"
      value={searchField}
      onChange={handleChange}
      className={classes.inputColor}
      fullWidth
      onKeyDown={e => {
        if (e.key === 'Enter') {
          if (searchField) {
            redirectResults();
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
            <SearchIcon className={classes.iconColor} />
          </InputAdornment>
        )
      }}
    />
  );
}

export default InputSearch;
