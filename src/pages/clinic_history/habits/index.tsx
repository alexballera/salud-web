import React from 'react';
import Link from 'next/link';

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

/// STYLES
import habitStyles from './styles.module';
/// STYLES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Habits } from '@/src/i18n/habits/i18n';
/// i18n END

/// TYPES
import type { NextPageContext } from 'next/';

type THabits = {
    name: string;
    frequency_of_consumption: string
};

type TProps = {
    habits: THabits[];
};
/// / TYPES END


const Habits = ({ habits }: TProps): JSX.Element => {

    const classes = habitStyles();
    const { t } = useTranslation(i18Habits);

    return (
        <>
            <Container>
                {habits.map((habit, index) => (
                    <Box my={2} key={index}>
                        <Card className={classes.cardHabits}>
                            {habit.frequency_of_consumption
                                ?
                                <Link href={`/clinic_history/habits/${habit.name}`}>
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
                                {habit.name == "Drogas" && habit.frequency_of_consumption == ""
                                    ?
                                    <Typography variant='body2' className={classes.typography14}> {habit.frequency_of_consumption ? habit.frequency_of_consumption : t('without_consumption', { ns: i18Habits })} </Typography>
                                    :
                                    <Typography variant='body2' className={classes.typography14}> {habit.frequency_of_consumption ? habit.frequency_of_consumption : t('not_assigned', { ns: i18Habits })} </Typography>
                                }
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
            name: "Actividad física",
            frequency_of_consumption: "Parcial"
        }, {
            name: "Alcoholismo",
            frequency_of_consumption: "Consumo parcial"
        }, {
            name: "Tabaquismo",
            frequency_of_consumption: ""
        }, {
            name: "Drogas",
            frequency_of_consumption: ""
        }
    ];
    return {
        habits
    };
};

export default Habits;
