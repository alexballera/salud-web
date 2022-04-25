/// BASE IMPORTS
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS END

/// MATERIAL
import IconButton from '@material-ui/core/IconButton';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import MuiFilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import MuiChip from '@material-ui/core/Chip';
import { Box, Modal, styled } from '@material-ui/core';
import { TextField, Typography, Grid } from '@mui/material';
/// MATERIAL END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { secondaryMainColor, tertiaryLightColor, titlePageColor } from '@/src/styles/js/theme';
import searchNavbarDoctorStyles from './styles.module';
/// i18n END

type TProps = {
  searchOptions: any; // TODO: Add a type
  setSearchOptions: any; // TODO: Add a type
};

const Chip = styled(MuiChip)({
  color: secondaryMainColor,
  background: tertiaryLightColor,
  '& svg': {
    color: secondaryMainColor
  },
  '&:focus': {
    color: secondaryMainColor,
    background: tertiaryLightColor
  }
});

const ArrowBackIcon = styled(MuiArrowBackIcon)({
  color: titlePageColor
});

const FilterListIcon = styled(MuiFilterListIcon)({
  color: titlePageColor
});

function SearchNavbarDoctor({ searchOptions, setSearchOptions }: TProps): JSX.Element {
  const router = useRouter();
  const classes = searchNavbarDoctorStyles();
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);

  const FAKE_TAGS = [searchOptions.searchField];

  useEffect(() => {
    setSearchOptions(prevValues => ({ ...prevValues, filters: FAKE_TAGS })); // TODO: Replace this values by the real filters
  }, []);

  const Actions = (isEdit: boolean) => {
    return (
      <Grid container alignItems="center" className={classes.inputActionsWrapper}>
        <Grid item mr={3}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="arrow-back"
            onClick={() => router.back()}
          >
            <ArrowBackIcon width={16} height={16} />
          </IconButton>
        </Grid>
        {isEdit ? (
          <Typography variant="body1" className={classes.titleEdit}>
            {t('searchResults.searchEdit', { ns: i18nMedicalDirectory })}
          </Typography>
        ) : (
          <Grid item className={classes.inputWrapper}>
            <div>
              <FormControl variant="standard">
                <InputBase
                  className={classes.input}
                  value={searchOptions.searchField}
                  readOnly
                  onClick={() => setSearchIsActive(true)}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.searchIcon}
                      color={titlePageColor}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </Grid>
        )}
        <Grid item>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="arrow-back"
            onClick={() => setFilterIsActive(true)}
          >
            {/* <FilterListIcon /> */}
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.mainWrapper}>
      {Actions(searchIsActive)}
      <Grid container>
        <Grid item className={classes.chipWrapper} mt={1}>
          <div className={classes.chipFlex}>
            {(searchOptions.filters || []).map((tag, idx) => (
              <Chip
                key={idx}
                className={classes.chip}
                label={tag}
                variant="default"
                color="default"
              />
            ))}
          </div>
        </Grid>
      </Grid>
      {/* Search modal */}
      <Modal
        open={searchIsActive}
        onClose={() => setSearchIsActive(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={classes.modalContent}>
          {Actions(searchIsActive)}
          <Box mt={3}>
            <TextField
              id="outlined-searchDoctor"
              label={t('items.labelSearch', { ns: i18nMedicalDirectory })}
              placeholder={t('items.placeholderSearch', { ns: i18nMedicalDirectory })}
              type="text"
              value={searchOptions?.searchField || ''}
              className={classes.inputColor}
              fullWidth
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  /** Add function redirectTo */
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
          </Box>
        </Box>
      </Modal>
      {/* Filter modal */}
      <Modal
        open={filterIsActive}
        onClose={() => setFilterIsActive(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        {/* TODO: Remove this styles, use an class */}
        <Box style={{ background: 'white', height: '100vh', width: '100vw' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="arrow-back"
            onClick={() => setFilterIsActive(false)}
          >
            <ArrowBackIcon width={16} height={16} />
          </IconButton>
          {/* TODO: Add the filter component here */}
          Filter here
        </Box>
      </Modal>
    </div>
  );
}

export default SearchNavbarDoctor;
