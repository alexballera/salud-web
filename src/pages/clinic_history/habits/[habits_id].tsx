import React from 'react';

/// TYPES
import type { NextPageContext } from 'next/';
/// / TYPES END

/// MUI COMPONENTS
import {
    Container
} from '@material-ui/core';
/// MUI COMPONENTS END

const HabitsDetail = () => {
    return (
        <>    
            <Container>
                <h3>Control de hábitos detalle</h3>
            </Container>
        </>
    )
};

HabitsDetail.getInitialProps = async ({ query }: NextPageContext) => {

    const { habits_id } = query;
    console.log("id", habits_id);

    return [];
};
export default HabitsDetail;