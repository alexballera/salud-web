import React from 'react';
import Link from 'next/link';

/// TYPES
import type { NextPageContext } from 'next/';
/// / TYPES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Habits } from '@/src/i18n/habits/i18n';
/// i18n END

type THabits = {
    id: number;
    name: string;
    frequency_of_consumption: string
};

/// MUI COMPONENTS
import {
    Box,
    Card,
    Container,
    Divider,
    makeStyles, Typography, Grid
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
/// MUI COMPONENTS END

const useStyles = makeStyles({
    cardHabits: {
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
        padding: '16px'
    },
    cardContentLink: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    typography14: {
        fontSize: "14px"
    },
    typography16: {
        fontSize: "16px"
    }
});

const Habits = ({ habits }): JSX.Element => {

    const classes = useStyles();
    const { t } = useTranslation(i18Habits);

    return (
        <>
            <Container>
                {habits.map((habit, index) => (
                    <Box my={2} key={index}>
                        <Card className={classes.cardHabits}>
                            {habit.frequency_of_consumption
                                ?
                                <Link href={`/clinic_history/habits/${habit.id}`}>
                                    <Box component="span" className={classes.cardContentLink}>
                                        <Typography paragraph color="secondary" className={classes.typography16}> {habit.name} </Typography>
                                        <ChevronRightIcon color="secondary" />
                                    </Box>
                                </Link>
                                :
                                <Box component="span" className={classes.cardContentLink}>
                                    <Typography paragraph color="secondary" className={classes.typography16}> {habit.name} </Typography>
                                    <ChevronRightIcon color="secondary" />
                                </Box>
                            }
                            <Divider />
                            <Box mt={2}>
                                <Typography variant='body2' className={classes.typography14}> {habit.frequency_of_consumption ? habit.frequency_of_consumption : t('not_assigned', { ns: i18Habits })} </Typography>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Container>
        </>
    );
};

Habits.getInitialProps = async ({ query }: NextPageContext) => {

    const habits: THabits[] = [
        {
            id: 1,
            name: "Actividad física",
            frequency_of_consumption: "Parcial"
        }, {
            id: 2,
            name: "Alcoholismo",
            frequency_of_consumption: "Consumo parcial"
        }, {
            id: 3,
            name: "Tabaquismo",
            frequency_of_consumption: ""
        }, {
            id: 4,
            name: "Drogas",
            frequency_of_consumption: "Consumo activo"
        }
    ];
    return {
        habits
    };
};

export default Habits;
