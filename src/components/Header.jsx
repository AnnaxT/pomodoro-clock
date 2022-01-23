import React from 'react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const headerStyles = {
    textAlign: 'center',
    padding: 3,
    backgroundColor: 'primary.main',
    backgroundImage: 'none',
    '@media screen and (max-width: 375px)': {
        pb: 2,
    }
}

const textStyles = {
    typography: 'h2',
    '@media screen and (max-width: 375px)': {
        typography: 'h3',
        fontWeight: 'fontWeightLight'
    }

}

const Header = () => {

    const matches500 = useMediaQuery('(max-width: 500px)');

    return( 
          
        <Paper square sx={headerStyles} elevation={15} >
            <Typography sx={textStyles}  component="h1"> 
                Pomodoro
                  {/* Insert break line for screens below 500px  */}
                  {matches500 ? <br /> : " " }
                Cl
                <AccessAlarmIcon sx={{ fontSize: 45, color: 'secondary.main', marginBottom: '-5px' }} />
                ck
            </Typography>
        </Paper>
    )
}

export default Header;

