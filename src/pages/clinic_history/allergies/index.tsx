/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
/// BASE IMPORTS

/// TYPES
import type { NextPageContext } from 'next/';
/// / TYPES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Allergies } from '@/src/i18n/allergies/i18n';
/// i18n END

/// MATERIAL UI
import { Box, makeStyles, Typography, Card, Divider, Chip, Container } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
/// MATERIAL UI END

type TAllergies = {
    id: number;
    name: string;
    status: number;
};


const useStyles = makeStyles({
    cardAllergies: {
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
    },
    contentButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        margin: '8px 0px'
    },
    buttonText: {
        width: '60%',
        fontSize: '16px'
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

const Allergies = ({ allergies }): JSX.Element => {

    const classes = useStyles();
    const { t } = useTranslation(i18Allergies);

    return (
        <Container>
            <Box>
                <Card className={classes.cardAllergies}>
                    <Box mt={2} mx={2}>
                        <Typography paragraph color="secondary" className={classes.typography16}> {t('allergies', { ns: i18Allergies })} </Typography>
                    </Box>
                    <Divider variant="fullWidth" />
                    <Box mx={2}>
                        {
                            allergies.sort((a, b) => a.name.localeCompare(b.name)).map((allergie, index) => (
                                <Box key={index}>
                                    <Link href={`/clinic_history/allergies/${allergie.id}`}>
                                        <Box component="span" className={classes.contentButton}>
                                            <Typography variant='body2' color="primary" className={classes.buttonText}> {allergie.name} </Typography>
                                            <Chip label={allergie.status ? t('active',{ ns: i18Allergies }) : t('inactive',{ ns: i18Allergies }) } className={[classes.chipStatus, allergie.status ? classes.chipActive : classes.chipInative].join(' ')} />
                                            <ChevronRightIcon color="secondary" />
                                        </Box>
                                    </Link>
                                </Box>
                            ))
                        }
                        {allergies.length == 0 &&
                            <Box component="span" className={classes.contentButton}>
                                <Typography variant='body2' color="primary" className={classes.buttonText}> {t('unregistered',{ ns: i18Allergies })} </Typography>
                            </Box>
                        }
                    </Box>
                </Card>
            </Box>
        </Container>
    )
};

Allergies.getInitialProps = async ({ query }: NextPageContext) => {

    const allergies: TAllergies[] = [
        {
            id: 1,
            name: "Celiaquía",
            status: 0
        }, {
            id: 2,
            name: "Penicilina",
            status: 1
        }, {
            id: 3,
            name: "Aleve",
            status: 1
        }
    ];
    return {
        allergies
    };
};


export default Allergies;
