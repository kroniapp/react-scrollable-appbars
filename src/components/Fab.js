import '../Bootstrap';

import React from 'react';

import theme from '../DefaultTheme';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        zIndex: 1200
    }
});

const areEqual = (prevProps, nextProps) => prevProps.show===nextProps.show;

function FabComponent(props) {

    const classes = useStyles();

    return(<ThemeProvider theme={theme}>
        <Zoom in={props.show}>
            <Fab className={classes.root}
                style={{
                    backgroundColor: props.color,
                    color: theme.palette.getContrastText(props.color)
                }}
                onClick={props.onClick}>
                {props.children}
            </Fab>
        </Zoom>
    </ThemeProvider>)
}

FabComponent.defaultProps = {
    show: true,
    color: '#ffffff',
    onClick: null,
    children: []
}

export default React.memo(FabComponent,areEqual);