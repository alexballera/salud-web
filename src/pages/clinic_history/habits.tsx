import React from 'react';

/// TYPES
import type { NextPageContext } from 'next/';
/// / TYPES END

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
//import { NAMESPACE_KEY as i18Habits} from '@/src/i18n/habits/i18n';
/// i18n END

import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({});

const Habits = (): JSX.Element => {
    return (
        <>
            <h2>Control de habitos</h2>
        </>
    );
};

Habits.getInitialProps = async ({ query }: NextPageContext) => {

    const classes = useStyles();
    //const { t } = useTranslation(i18Habits);

    const habitsMock = [];
    return habitsMock;
};

export default Habits;
