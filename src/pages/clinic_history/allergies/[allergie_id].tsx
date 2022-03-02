import React from 'react';

/// MATERIAL UI
import { Box, makeStyles, Typography, Card, Divider, Chip, Container } from '@material-ui/core';
/// MATERIAL UI END

const useStyles = makeStyles({
    cardAllergie: {
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
    },
    chipStatus: {
        fontSize: '12px',
        height: '20px'
    },
    chipActive: {
        backgroundColor: '#BB9AFD1A',
        color: '#AB82FF'
    },
    chipInative: {
        backgroundColor: '#E4EBED',
        color: '#829296'
    },
    typography14: {
        fontSize: '14px'
    },
    typography16: {
        fontSize: '16px'
    },
});

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Allergies } from '@/src/i18n/allergies/i18n';
/// i18n END

/// TYPES
import type { NextPageContext } from 'next/';

type TAllergie = {
    time: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    description: string;
    comments: string;
    reportedBy: string;
    performer: string;
    specialization: string;
};
/// / TYPES END




const AllergieDetail = ({ allergie }): JSX.Element => {

    const classes = useStyles();
    const { t } = useTranslation(i18Allergies);

    return (
        <Container>
            <Box mt={3} mb={2}>
                <Typography paragraph className={classes.typography16}>{t('allergies', { ns: i18Allergies })}</Typography>
            </Box>
            <Card className={classes.cardAllergie}>
                <Box m={2}>
                <Chip label={allergie.isActive ? t('active',{ ns: i18Allergies }) : t('inactive',{ ns: i18Allergies }) } className={[classes.chipStatus, allergie.isActive ? classes.chipActive : classes.chipInative].join(' ')} />
                </Box>
            </Card>
        </Container>
    )
};

AllergieDetail.getInitialProps = async ({ query }: NextPageContext) => {

    const { allergie_id } = query;

    const allergies: TAllergie[] = [
        {
            time: "2022-02-11T04:27:21.337Z",
            startDate: "2020-10-08T04:27:21.337Z",
            endDate: null,
            isActive: true,
            description: "Penicilina",
            comments: "Reacción alérgica al paciente se visualiza en forma ronchas y enrojecimiento en la piel",
            reportedBy: "MEDICO DEMO",
            performer: "Dr. Lorem Ipsum",
            specialization: "Allergologist"
        },
        {
            time: "2021-10-18T04:27:21.337Z",
            startDate: "1984-05-16T04:27:21.337Z",
            endDate: "2021-10-18T04:27:21.337Z",
            isActive: false,
            description: "Celiaquía",
            comments: "Alergia al polvo, a la humedad, al frío",
            reportedBy: "MEDICO DEMO",
            performer: "Dr. Lorem Ipsum",
            specialization: "Allergologist"
        }
    ];

    const allergie = allergies.find((allergie) => allergie.description === allergie_id);

    return {
        allergie
    };
};

export default AllergieDetail