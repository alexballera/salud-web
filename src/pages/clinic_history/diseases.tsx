/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
/// BASE IMPORTS

/// TYPES
import type { NextPageContext } from 'next/';
/// / TYPES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Diseases} from '@/src/i18n/diseases/i18n';
/// i18n END

/// MATERIAL UI
import { Box, makeStyles, Tab, Tabs, Typography, Card, CardContent, Divider, Grid, Chip } from '@material-ui/core';
/// MATERIAL UI END

type TDiseases = {
    name: string;
    status: boolean;
    demographic: number
};


const useStyles = makeStyles({
    cardDiseases: {
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)'
    },
    typography14:{
        fontSize: "14px"
    },
    typography16:{
        fontSize: "14px"
    }
});

const Diseases = ({ diseases }): JSX.Element => {

    const classes = useStyles();
    const { t } = useTranslation(i18Diseases);

    const [demographic, setDemographic] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setDemographic(newValue);
    };

    return (
        <>
            <Box>
                <Tabs variant="fullWidth" textColor="secondary" value={demographic} onChange={handleChange} >
                    <Tab label={t('tabs.adulthood', { ns: i18Diseases })} className={classes.typography14} />
                    <Tab label={t('tabs.childhood', { ns: i18Diseases })} className={classes.typography14} />
                </Tabs>

                <Box role="tabpanel" m={3}>
                    <Typography paragraph className={classes.typography14}>
                        {demographic == 0 ? t('content.adulthood_description', { ns: i18Diseases }) : t('content.childhood_description', { ns: i18Diseases })}
                    </Typography>
                    <Card className={classes.cardDiseases}>
                        <Box mt={2} ml={2}>
                            <Typography paragraph color="secondary" className={classes.typography16} >{t('content.diseases', { ns: i18Diseases })}</Typography>
                        </Box>
                        <Divider />
                        {!diseases.filter((filter) => filter.demographic == demographic).length && (
                            <Box my={3} ml={2}>
                                <Typography paragraph className={classes.typography14}>
                                    {t('content.unregistered', { ns: i18Diseases })}
                                </Typography>
                            </Box>
                        )}
                        {diseases.filter((filter) => filter.demographic == demographic).map((disease, index) => (
                            <Box my={2.5} ml={2} key={index}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography paragraph className={classes.typography16} >{disease.name}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Card>
                </Box>
            </Box>
        </>
    )
};

Diseases.getInitialProps = async ({ query }: NextPageContext) => {

    const diseases: TDiseases[] = [
        {
            name: 'Asma intrínseca',
            status: true,
            demographic: 0
        }, {
            name: 'Diabetes',
            status: true,
            demographic: 0
        }, {
            name: 'Asma intrínseca',
            status: true,
            demographic: 1
        }, {
            name: 'Varicela',
            status: true,
            demographic: 1
        }, {
            name: 'Sarampión',
            status: true,
            demographic: 1
        }
    ];
    return {
        diseases
    };
};


export default Diseases;