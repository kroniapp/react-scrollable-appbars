import '../Bootstrap';

import React from 'react';

import theme from '../DefaultTheme';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
    bottomAppbar: {
        width: '100%',
        position: 'relative'
    },
    fab: {
        position: 'absolute',
        left: 'calc(50% - 28px)',
        bottom: 28,
        zIndex: 1200,
        transition: 'bottom 0.2s ease-in-out !important',
        [theme.breakpoints.up('sm')]: {
            bottom: 36
        }
    },
    closed: {
        bottom: 16
    },
    flex: {
        flex: 1
    },
});

const areEqual = (prevProps, nextProps) => prevProps.show===nextProps.show;

function BottomAppbar(props) {

    const classes = useStyles();

    return(<ThemeProvider theme={theme}>
        <div className={classes.bottomAppbar+' '+props.className}
            style={{
                position: props.static ? 'absolute' : 'relative',
                bottom: props.static ? 0 : 'auto'
            }}>
            {props.fabIcon &&
                <Fab className={classes.fab+(props.show ? '' : ' '+classes.closed)}
                    style={{
                        backgroundColor: props.fabColor,
                        color: theme.palette.getContrastText(props.fabColor),
                    }}
                    onClick={props.fabClick}>
                    {props.fabIcon}
                </Fab>
            }
            <Slide direction="up" in={props.show}>
                <AppBar elevation={0} position="relative"
                    style={{
                        background: (props.inset && props.fabIcon)
                            ? 'radial-gradient(circle at 50% 0, transparent 35px, '+props.color+' 36px)'
                            : props.color
                    }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={props.menuClick}>
                            <Icon>menu</Icon>
                        </IconButton>
                        <div className={classes.flex}/>
                        {props.children}
                    </Toolbar>
                </AppBar>
            </Slide>
        </div>
    </ThemeProvider>)
}

BottomAppbar.defaultProps = {
    show: true,
    inset: false,
    static: false,
    color: '#ffffff',
    menuClick: null,
    fabColor: '#ffffff',
    fabIcon: '',
    fabClick: null,
    children: []
}

export default React.memo(BottomAppbar,areEqual);