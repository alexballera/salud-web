import { Box, Button, styled, Grid, IconButton, Modal, Typography } from '@mui/material';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import MuiChip from '@material-ui/core/Chip';
import { secondaryMainColor, tertiaryLightColor, titlePageColor } from '@/src/styles/js/theme';

import modalFiltersStyles from './style.module';
import { DoctorSearchOrder } from '@/src/services/doctors.type';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { searchOnFilter } from '@/src/store/slice/search.slice';
import { useSelector } from '@/src/store';
const ArrowBackIcon = styled(MuiArrowBackIcon)({
  color: titlePageColor
});

type Tprops = {
  openModal: boolean;
  closeModal;
};

const ChipDefault = styled(MuiChip)({
  color: titlePageColor,
  '& svg': {
    color: titlePageColor
  },
  '&:focus': {
    color: titlePageColor
  }
});

const ChipActive = styled(MuiChip)({
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

const ModalFilters = ({ openModal, closeModal }: Tprops): JSX.Element => {
  const classes = modalFiltersStyles();
  const { t } = useTranslation([i18nMedicalDirectory]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.search);

  const orderOptionsArray = [
    {
      label: t('filters.optionsOrder.closeness', { ns: i18nMedicalDirectory }),
      id: 1,
      isActive: false,
      type: DoctorSearchOrder.distance
    },
    {
      label: t('filters.optionsOrder.highLowPrice', { ns: i18nMedicalDirectory }),
      id: 2,
      isActive: false,
      type: DoctorSearchOrder.priceHighLow
    },
    {
      label: t('filters.optionsOrder.lowHighPrice', { ns: i18nMedicalDirectory }),
      id: 3,
      isActive: false,
      type: DoctorSearchOrder.priceLowHigh
    },
    {
      label: t('filters.optionsOrder.availability', { ns: i18nMedicalDirectory }),
      id: 4,
      isActive: false,
      type: DoctorSearchOrder.available
    },
    {
      label: t('filters.optionsOrder.alphabetically', { ns: i18nMedicalDirectory }),
      id: 5,
      isActive: false,
      type: DoctorSearchOrder.alphabetically
    }
  ];

  const [orderOptions, setOrderOptions] = useState(orderOptionsArray);
  const [orderSelect, setOrderSelect] = useState<DoctorSearchOrder | null>(
    DoctorSearchOrder.distance
  );

  const handleSelectOrderOption = i => {
    const newValue = orderOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setOrderOptions(newValue);
    setOrderSelect(orderOptions.find(item => item.id === i + 1).type);
  };

  const redirecSearch = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        order: orderSelect
      }
    });

    dispatch(
      searchOnFilter({
        filters: [orderOptions.find(item => item.type === orderSelect).label]
      })
    );
    closeModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => closeModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={classes.main}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.navBar}
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item mr={3}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="arrow-back"
                  onClick={() => closeModal(false)}
                >
                  <ArrowBackIcon width={16} height={16} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.titleFilter}>
                  {t('filters.title', { ns: i18nMedicalDirectory })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="inherit" />
              <Typography ml={1} variant="body2" className={classes.eraseText}>
                {t('filters.actionEraseAll', { ns: i18nMedicalDirectory })}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>

        {/* TODO: Add the filter component here */}
        <Grid container mx={3}>
          <Grid item xs={12} mt={10}>
            <Typography variant="subtitle2" className={classes.titleFilter}>
              {t('filters.subTitle', { ns: i18nMedicalDirectory })}
            </Typography>
          </Grid>

          <Grid item xs={12} mt={3}>
            <Box sx={{ marginRight: 8 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.sortBy', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              {orderOptions.map((tag, idx) => {
                if (tag.isActive) {
                  return (
                    <ChipActive
                      key={idx}
                      className={classes.chip}
                      label={tag.label}
                      color="default"
                      onClick={() => handleSelectOrderOption(idx)}
                    />
                  );
                }
                return (
                  <ChipDefault
                    key={idx}
                    className={classes.chip}
                    label={tag.label}
                    variant="outlined"
                    color="default"
                    onClick={() => handleSelectOrderOption(idx)}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box sx={{ height: 250 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.distance', { ns: i18nMedicalDirectory })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box sx={{ height: 250 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.price', { ns: i18nMedicalDirectory })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box sx={{ height: 250 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.appointmentAvailability', { ns: i18nMedicalDirectory })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box sx={{ height: 250 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.modality', { ns: i18nMedicalDirectory })}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/** Section float */}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          px={3}
          className={classes.fixedSection}
        >
          <Grid item>
            <Typography variant="body2" className={classes.titleFilter}>
              0 {t('filters.results', { ns: i18nMedicalDirectory })}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.buttonFilter}
              sx={{ textTransform: 'inherit' }}
              onClick={() => redirecSearch()}
            >
              {t('filters.actionApplyFilters', { ns: i18nMedicalDirectory })}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalFilters;
