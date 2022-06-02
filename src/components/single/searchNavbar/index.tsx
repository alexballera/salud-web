import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import MuiFilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import MuiChip from '@material-ui/core/Chip';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box, Modal, styled } from '@material-ui/core';
import { secondaryMainColor, tertiaryLightColor, titlePageColor } from '@/src/styles/js/theme';
import ModalFilters from '../../common/ModalFilters';
import SearchWithGeolocation from '../../../containers/SearchWithGeolocation';
import { NAMESPACE_KEY as i18Global } from '../../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../../i18n/forms/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { useSelector } from '@/src/store';
import { searchOnFilter, searchClean } from '@/src/store/slice/search.slice';
import searchNavbarStyles from './styles.module';

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

function SearchNavbar(): JSX.Element {
  const router = useRouter();
  const classes = searchNavbarStyles();
  const dispatch = useDispatch();
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory]);

  const { placeName, textFilter, filters, order, range, priceRange } = useSelector(
    state => state.search
  );

  const searchLabel = `${textFilter} • ${placeName}`;

  const routeGeneral = '/medicalDirectory/searchResults';
  const routeSpeciality = '/medicalDirectory/searchBy/specialtyResults';

  const handleRouteBack = pathName => {
    switch (pathName) {
      case routeGeneral:
        router.push('/medicalDirectory');
        break;
      case routeSpeciality:
        router.push('/medicalDirectory/searchBy/search_by_specialty');
        break;
    }
  };

  const handleArrowBack = () => {
    if (searchIsActive) {
      setSearchIsActive(false);
    } else {
      dispatch(searchClean());
      handleRouteBack(router.pathname);
    }
  };

  const removeQueryParamsFromRouter = (router, removeList = []) => {
    if (removeList.length > 0) {
      removeList.forEach(param => delete router.query[param]);
    }
    router.replace(
      {
        pathname: router.pathname,
        query: router.query
      },
      undefined,
      { shallow: true }
    );
  };

  const handleDeleteFilter = tag => {
    const priceRangeTag =
      tag
        .toString()
        .replace(/[₡$,\s]/g, '')
        .replace(/[-]/g, ',')
        .indexOf(priceRange?.toString()) !== -1 && 'priceRange';

    const param = [];
    if (priceRangeTag) param.push(priceRangeTag);

    removeQueryParamsFromRouter(router, [param]);

    dispatch(
      searchOnFilter({
        filters: filters.filter(itemTag => itemTag !== tag),
        ...(priceRangeTag && priceRange?.name === priceRangeTag && { priceRange: null }),
        ...(order && order.name === tag && { order: null }),
        ...(range && range.name === tag && { range: null })
      })
    );
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
              label={placeName}
              variant="default"
              color="default"
              onDelete={() => {
                dispatch(
                  searchOnFilter({
                    placeName: t('location.placeHolder', { ns: i18Global })
                  })
                );
              }}
            />
            {filters.map((tag, idx) => (
              <Chip
                key={idx}
                className={classes.chip}
                label={tag}
                variant="default"
                color="default"
                onDelete={() => handleDeleteFilter(tag)}
              />
            ))}
          </div>
        </Grid>
      </Grid>
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
            labelText={t('items.labelSearch', { ns: i18nMedicalDirectory })}
            placeHolderText={t('items.placeholderSearch', { ns: i18nMedicalDirectory })}
            path={`${router.pathname}`}
          />
        </Box>
      </Modal>
      <ModalFilters openModal={filterIsActive} closeModal={setFilterIsActive} />
    </div>
  );
}

export default SearchNavbar;
