/// BASE IMPORTS
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS END

/// MATERIAL
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import MuiFilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import MuiChip from '@material-ui/core/Chip';
import { Box, makeStyles, Modal, styled } from '@material-ui/core';
/// MATERIAL END

/// STYLES
import {
  background2Color,
  boxShadow,
  poppinsFontFamily,
  primaryContrastTextColor,
  secondaryMainColor,
  tertiaryLightColor,
  titlePageColor
} from '@/src/styles/js/theme';
/// STYLES END

/// OWN COMPONENTS
import SearchWithGeolocation from '../../../containers/SearchWithGeolocation';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { Typography } from '@mui/material';
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

const useStyles = makeStyles({
  mainWrapper: {
    boxShadow,
    padding: '0 24px 20px 24px',
    borderRadius: 16
  },
  inputActionsWrapper: {
    height: 56
  },
  inputWrapper: {
    width: '65%'
  },
  input: {
    background: background2Color,
    borderRadius: 4,
    '& input': {
      font: poppinsFontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '157%',
      letterSpacing: '0.1px',
      opacity: '0.42'
    }
  },
  searchIcon: {
    marginLeft: 19
  },
  filterIcon: {
    paddingRight: 0
  },
  chip: {
    marginRight: 16
  },
  chipWrapper: {
    overflow: 'hidden',
    height: 34,
    marginTop: 8
  },
  chipFlex: {
    display: 'flex',
    overflow: 'scroll',
    paddingBottom: 15
  },
  modalContent: {
    background: primaryContrastTextColor,
    padding: '0 24px 20px 24px',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  title: {
    color: 'rgba(69, 82, 85, 1)',
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 10
  }
});

const FAKE_TAGS = ['Precio alto-bajo', '₡60 000', 'Cualquiera'];

function SearchNavbar({ searchOptions, setSearchOptions }: TProps): JSX.Element {
  const router = useRouter();
  const classes = useStyles();
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);

  const searchLocationLabel =
    searchOptions?.placeName === '' || !searchOptions?.placeName
      ? 'Cerca ...'
      : searchOptions?.placeName;
  const searchLabel = `${searchOptions?.searchField} • ${searchLocationLabel}`;
  useEffect(() => {
    setSearchOptions(prevValues => ({ ...prevValues, filters: FAKE_TAGS })); // TODO: Replace this values by the real filters
  }, []);

  const handleArrowBack = () => {
    if (searchIsActive) {
      setSearchIsActive(false);
    } else {
      router.back();
    }
  };

  const Actions = (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.inputActionsWrapper}
    >
      <Grid item>
        <IconButton edge="start" color="inherit" aria-label="arrow-back" onClick={handleArrowBack}>
          <ArrowBackIcon width={16} height={16} />
        </IconButton>
      </Grid>
      {searchIsActive && (
        <Grid item className={classes.inputWrapper}>
          <Typography variant="body1" className={classes.title}>
            {t('editSearch.title', { ns: i18nMedicalDirectory })}
          </Typography>
        </Grid>
      )}
      {!searchIsActive && (
        <Grid item className={classes.inputWrapper}>
          <div>
            <FormControl variant="standard">
              <InputBase
                className={classes.input}
                value={searchLabel}
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
          <FilterListIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.mainWrapper}>
      {Actions}
      <Grid container>
        <Grid item className={classes.chipWrapper}>
          <div className={classes.chipFlex}>
            <Chip
              className={classes.chip}
              label={searchOptions.placeName || t('location.placeHolder', { ns: i18Global })}
              variant="default"
              color="default"
              onDelete={() => {
                setSearchOptions(prevValues => ({
                  ...prevValues,
                  placeName: t('location.placeHolder', { ns: i18Global })
                }));
              }}
            />
            {(searchOptions.filters || []).map((tag, idx) => (
              <Chip
                key={idx}
                className={classes.chip}
                label={tag}
                variant="default"
                color="default"
                onDelete={() => {
                  setSearchOptions(prevValues => ({
                    ...prevValues,
                    filters: prevValues.filters.filter(itemTag => itemTag !== tag)
                  }));
                }}
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
          {Actions}
          <SearchWithGeolocation
            isActiveModal={searchIsActive}
            closeModal={setSearchIsActive}
            search={searchOptions as any}
            searchObject={setSearchOptions}
            labelText={t('items.labelSearch', { ns: i18nMedicalDirectory })}
            placeHolderText={t('items.placeholderSearch', { ns: i18nMedicalDirectory })}
            path="/medicalDirectory/searchResults"
          />
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

export default SearchNavbar;
