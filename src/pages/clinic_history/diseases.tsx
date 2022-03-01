/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
/// BASE IMPORTS

/// TYPES
import type { NextPageContext } from 'next/';
/// / TYPES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

/// MATERIAL UI
import { Box, makeStyles, Tab, Tabs, Typography, Card, CardContent, Divider, Grid, Chip } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
/// MATERIAL UI END

type TDiseases = {
    id: number;
    name: string;
    status: boolean;
    demographic2: number
};
type TProps = {
    diseases: [] | string[];
};


const useStyles = makeStyles({
    cardDiseases: {
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)'
    },
});

const Diseases = ({ diseases }: TProps): JSX.Element => {

    const classes = useStyles();
    const { t } = useTranslation([i18Global, i18Forms]);

    const [demographic, setDemographic] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setDemographic(newValue);
    };

    return (
        <>
            <Box>
                <Tabs variant="fullWidth" value={demographic} onChange={handleChange} >
                    <Tab label="Adultez" />
                    <Tab label="Niñez" />
                </Tabs>


                <Box role="tabpanel" hidden={demographic !== 0} m={3}>
                    {demographic === 0 && (
                        <Box>
                            <Typography paragraph>Adultez iniciando desde los 18 años en adelante.</Typography>
                            <Card className={classes.cardDiseases}>
                                <Box mt={2} ml={2}>
                                    <Typography paragraph style={{ fontSize: "16px" }} >Enfermedades</Typography>
                                </Box>
                                <Divider />

                                {diseases.map((disease) => (
                                    <Box my={3} ml={2}>
                                        <Grid container key={disease.id}>
                                            <Grid item xs={8}>
                                                <Typography paragraph style={{ fontSize: "16px" }} >{disease.name}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Card>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}



Diseases.getInitialProps = async ({ query }: NextPageContext) => {

    const diseases: TDiseases[] = [
        {
            id: 1,
            name: 'Asma intrínseca',
            status: true,
            demographic2: 0
        }, {
            id: 2,
            name: 'Diabetes',
            status: false,
            demographic2: 1
        }
    ];
    return {
        diseases
    };
};


export default Diseases;