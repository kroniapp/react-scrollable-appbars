import React from 'react';
import './BottomAppbar.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
    root: {
        width: '100%',
        position: 'relative'
    },
    appBar: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    fab: {
        position: 'absolute',
        left: 'calc(50% - 28px)',
        zIndex: 1200
    },
    flex: {
        flex: 1
    },
});

const areEqual = (prevProps, nextProps) => {
    return prevProps.show===nextProps.show;
}

class BottomAppbar extends React.Component {

    render() {
        const {classes,theme} = this.props;

        return(
            <div className={classes.root+' '+this.props.className}
                style={{
                    position: this.props.static ? 'absolute' : 'relative',
                    bottom: this.props.static ? 0 : 'auto'
                }}>
                <Fab className={classes.fab+' fab '+(this.props.show ? '' : 'closed')}
                    style={{
                        backgroundColor: this.props.fabColor,
                        color: theme.palette.getContrastText(this.props.fabColor),
                    }}
                    onClick={this.props.fabClick}>
                    {this.props.fabIcon}
                </Fab>
                <Slide direction="up" in={this.props.show} mountOnEnter unmountOnExit>
                    <AppBar elevation={0} position="relative" color={this.props.color ? 'primary' : 'inherit'}
                        style={{
                            background: this.props.inset
                                ? 'radial-gradient(circle at 50% 0, transparent 35px, '+this.props.color+' 36px)'
                                : this.props.color
                        }}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.menuClick}>
                                <Icon>menu</Icon>
                            </IconButton>
                            <div className={classes.flex}/>
                            {this.props.children}
                        </Toolbar>
                    </AppBar>
                </Slide>
            </div>
        )
    }
}

BottomAppbar.defaultProps = {
    inset: false,
    fabColor: 'secondary',
    fabIcon: ''
}

export default React.memo(withStyles(styles,{withTheme: true})(BottomAppbar),areEqual);