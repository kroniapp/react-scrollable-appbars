import '../Bootstrap';

import React from 'react';

import theme from '../DefaultTheme';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    topAppbar: {
        width: '100%'
    },
    flex: {
        flex: 1
    },
    marginRight: {
        marginRight: 8
    }
});

const areEqual = (prevProps, nextProps) => prevProps.show===nextProps.show;

function TopAppbar(props) {

    const classes = useStyles();

    return(<ThemeProvider theme={theme}>
        <div className={classes.topAppbar+' '+props.className}
            style={{
                position: props.static ? 'absolute' : 'relative'
            }}>
            <Slide direction="down" in={props.show}>
                <AppBar elevation={props.elevation} position="relative" color="inherit">
                    <Toolbar style={{
                        backgroundColor: props.color,
                        color: theme.palette.getContrastText(props.color)
                    }}>
                        <IconButton color="inherit" onClick={props.menuClick} className={classes.marginRight}>
                            <Icon>menu</Icon>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            {props.title}
                        </Typography>
                        {props.children}
                    </Toolbar>
                </AppBar>
            </Slide>
        </div>
    </ThemeProvider>)
}

TopAppbar.defaultProps = {
    show: true,
    static: false,
    color: '#ffffff',
    menuClick: null,
    children: []
}

export default React.memo(TopAppbar,areEqual);