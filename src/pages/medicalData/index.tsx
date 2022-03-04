/// BASE IMPORTS
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global, i18n } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { TPersonalDataProps } from '../../containers/SignUp/index.types';

/// LAYOUT
import { AvatarProfile } from '../../containers/Profile/AvatarProfile';
import { UserContext } from '../../context/UserContext';
import { MedicalDataCard } from '../../containers/MedicalData/MedicalDataCard';
/// LAYOUT END

/// SERVICES
import { getMedicalData, IMedicalData, mockData } from '../../services/getMedicalData.service';
/// SERVICES END
function MedicalDataPage({ handleNotifications }: TPersonalDataProps): JSX.Element {
  const { t } = useTranslation([i18Global, i18Forms]);
  const [medicalData, setMedicalData] = useState<IMedicalData>(mockData);
  const { account } = useContext(UserContext);
  const i18nPopUpError = t('message.error.general_fetch', { ns: i18Forms });

  const fetchGeneralData = () => {
    getMedicalData()
      .then(response => {
        const { result } = response.data;
        setMedicalData(result);
      })
      .catch(() => handleNotifications({ open: true, message: i18nPopUpError, severity: 'error' }));
  };
  useEffect(() => {
    // TODO CONECTAR CON API REAL
    /* fetchGeneralData() */
  }, []);

  return (
    <>
      <AvatarProfile
        fullName={medicalData.firstName + ' ' + medicalData.firstLastName}
        generalData
      />
      <MedicalDataCard generalData={medicalData} />
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDataPage));
