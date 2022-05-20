import { Box, Button, styled, Grid, IconButton, Modal, Typography } from '@mui/material';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import MuiChip from '@material-ui/core/Chip';
import { secondaryMainColor, tertiaryLightColor, titlePageColor } from '@/src/styles/js/theme';

import modalFiltersStyles from './style.module';
import { DoctorSearchOrder } from '@/src/services/doctors.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { searchOnFilter } from '@/src/store/slice/search.slice';
import { useSelector } from '@/src/store';
import ModalAppointmentAvailability from '../ModalAppointmentAvailability';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SendIcon from '@mui/icons-material/Send';

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

const ChipIcon = styled(ChipDefault)({
  marginRight: 0
});

const ModalFilters = ({ openModal, closeModal }: Tprops): JSX.Element => {
  const classes = modalFiltersStyles();
  const { t } = useTranslation([i18nMedicalDirectory]);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const rangeOptionsArray = [
    {
      label: 'A 1km',
      id: 1,
      isActive: false,
      value: 1000
    },
    {
      label: 'A 5km',
      id: 2,
      isActive: false,
      value: 5000
    },
    {
      label: 'A 10km',
      id: 3,
      isActive: false,
      value: 10000
    }
  ];

  const [appointmentAvailabilityValue, setAppointmentAvailabilityValue] = useState('');
  const [appointmentAvailabilityModal, setAppointmentAvailabilityModal] = useState(false);

  const [orderOptions, setOrderOptions] = useState(orderOptionsArray);
  const { order, range } = useSelector(state => state.search);

  // filtro de distancia
  const [rangeOptions, setRangeOptions] = useState(rangeOptionsArray);

  const handleSelectOrderOption = i => {
    const newValue = orderOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setOrderOptions(newValue);
    dispatch(
      searchOnFilter({
        order: {
          name: orderOptions.find(item => item.id === i + 1).label,
          value: orderOptions.find(item => item.id === i + 1).type
        }
      })
    );
  };

  const handleSelectRangeOption = i => {
    const newValue = rangeOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setRangeOptions(newValue);
    dispatch(
      searchOnFilter({
        range: {
          name: rangeOptions.find(item => item.id === i + 1).label,
          value: rangeOptions.find(item => item.id === i + 1).value
        }
      })
    );
  };

  const redirecSearch = () => {
    const filters = [];
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        ...(order && { order: order.value }),
        ...(range && { range: range.value })
      }
    });

    if (order?.name) filters.push(order.name);
    if (range?.name) filters.push(range.name);

    // suma valores elegidos del filtro al array filters para mostrar los chips
    if (filters.length) {
      dispatch(
        searchOnFilter({
          filters
        })
      );
    }
    closeModal(false);
  };

  useEffect(() => {
    if (!order) setOrderOptions(orderOptionsArray);
    if (!range) setRangeOptions(rangeOptionsArray);
  }, [order, range]);

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
            <Box>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.distance', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              {rangeOptions.map((tag, idx) => {
                if (tag.isActive) {
                  return (
                    <ChipActive
                      key={idx}
                      className={classes.chip}
                      label={tag.label}
                      color="default"
                      onClick={() => handleSelectRangeOption(idx)}
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
                    onClick={() => handleSelectRangeOption(idx)}
                  />
                );
              })}
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
              <br />
              <Grid container alignItems="center">
                <Grid item>
                  <ChipIcon
                    className={classes.chip}
                    label={appointmentAvailabilityValue || 'Select a date'}
                    variant="outlined"
                    color="default"
                    deleteIcon={<TagFacesIcon />}
                    style={{ position: 'relative', right: 0 }}
                    onDelete={() => setAppointmentAvailabilityModal(true)}
                  />
                  {appointmentAvailabilityValue && (
                    <Button
                      variant="text"
                      color="success"
                      style={{ marginTop: 16 }}
                      onClick={() => setAppointmentAvailabilityModal(true)}
                      endIcon={<SendIcon />}
                    >
                      Editar
                    </Button>
                  )}
                </Grid>
              </Grid>
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
              {t('filters.results', { ns: i18nMedicalDirectory })}
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
        <ModalAppointmentAvailability
          isOpen={appointmentAvailabilityModal}
          handleAction={(dateSelected: Date | null) => {
            setAppointmentAvailabilityModal(false);
            if (dateSelected) {
              setAppointmentAvailabilityValue(dateSelected.toISOString());
            }
          }}
        />
      </Box>
    </Modal>
  );
};

export default ModalFilters;
