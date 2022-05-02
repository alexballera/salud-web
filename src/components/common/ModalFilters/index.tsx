import { Box, Button, Grid, IconButton, Modal, styled, Typography } from '@mui/material';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';

import { titlePageColor } from '@/src/styles/js/theme';
import modalFiltersStyles from './style.module';
const ArrowBackIcon = styled(MuiArrowBackIcon)({
  color: titlePageColor
});

type Tprops = {
  openModal: boolean;
  closeModal;
};

const ModalFilters = ({ openModal, closeModal }: Tprops): JSX.Element => {
  const classes = modalFiltersStyles();
  const { t } = useTranslation([i18nMedicalDirectory]);
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
            <Box sx={{ height: 250 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.sortBy', { ns: i18nMedicalDirectory })}
              </Typography>
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
