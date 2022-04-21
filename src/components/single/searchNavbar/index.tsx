/// BASE IMPORTS
import { useState } from 'react';
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
import MedicalDirectorySearchInputs from '../../common/MedicalDirectorySearchInputs';
/// OWN COMPONENTS END

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
  // padding: 0
  color: titlePageColor
});

const FilterListIcon = styled(MuiFilterListIcon)({
  // padding: 0
  color: titlePageColor
});

const useStyles = makeStyles({
  mainWrapper: {
    boxShadow,
    padding: '0 24px 10px 24px',
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
  chip: {
    marginRight: 16
  },
  chipWrapper: {
    overflow: 'hidden'
  },
  chipFlex: {
    display: 'flex',
    overflow: 'scroll',
    paddingBottom: 10
  },
  modalContent: {
    background: primaryContrastTextColor,
    padding: '0 24px 20px 24px',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  }
});

const FAKE_TAGS = ['Cartago'];

function SearchNavbar(): JSX.Element {
  const router = useRouter();
  const classes = useStyles();
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);

  const Actions = (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.inputActionsWrapper}
    >
      <Grid item>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="arrow-back"
          onClick={() => router.back()}
        >
          <ArrowBackIcon width={16} height={16} />
        </IconButton>
      </Grid>
      <Grid item className={classes.inputWrapper}>
        <div>
          <FormControl variant="standard">
            <InputBase
              className={classes.input}
              value="Psicologia • Cerca ..."
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
      <Grid item>
        <IconButton
          edge="start"
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
          <Box mt={1} className={classes.chipFlex}>
            <Chip
              className={classes.chip}
              label="Clickable"
              variant="default"
              color="default"
              onDelete={() => setSearchIsActive(true)}
            />
            <Chip
              className={classes.chip}
              label="Clickable"
              variant="default"
              color="default"
              onDelete={() => setSearchIsActive(true)}
            />
            <Chip
              className={classes.chip}
              label="Clickable"
              variant="default"
              color="default"
              onDelete={() => setSearchIsActive(true)}
            />
            <Chip
              className={classes.chip}
              label="Clickable"
              variant="default"
              color="default"
              onDelete={() => setSearchIsActive(true)}
            />
            <Chip
              className={classes.chip}
              label="Clickable"
              variant="default"
              color="default"
              onDelete={() => setSearchIsActive(true)}
            />
          </Box>
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
          <MedicalDirectorySearchInputs />
        </Box>
      </Modal>
      {/* Filter modal */}
      <Modal
        open={filterIsActive}
        onClose={() => setFilterIsActive(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
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
