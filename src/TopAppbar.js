import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        position: 'relative'
    },
    flex: {
        flex: 1
    },
    marginRight: {
        marginRight: theme.spacing.unit
    }
});

const areEqual = (prevProps, nextProps) => {
    return prevProps.show===nextProps.show;
}

class TopAppbar extends React.Component {

    render() {
        const {classes} = this.props;

        return(
            <Slide direction="down" in={this.props.show} mountOnEnter unmountOnExit
                className={classes.root+' '+this.props.className}
                style={{position: this.props.static ? 'absolute' : 'relative'}}>
                <AppBar elevation={this.props.elevation} position="relative" color={this.props.color ? 'primary' : 'inherit'}>
                    <Toolbar style={{backgroundColor: this.props.color}}>
                        <IconButton color="inherit" onClick={this.props.menuClick} className={classes.marginRight}>
                            <Icon>menu</Icon>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {this.props.title}
                        </Typography>
                        {this.props.children}
                    </Toolbar>
                </AppBar>
            </Slide>
        )
    }
}

TopAppbar.defaultProps = {
    static: false,
    title: '',
    elevation: 4
}

export default React.memo(withStyles(styles,{withTheme: true})(TopAppbar),areEqual);