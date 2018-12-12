import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: 1,
        overflowY: 'auto'
    }
};

class Scroller extends React.Component {

    state = {
        scroll: 0,
        initialScroll: 0,
        scrollDelta: 0,
        direction: 'down'
    }

    scrollChange = async(scroll) => {
        const res = this.getScrollDelta(scroll.scrollTop);
        this.setState({
            scroll: res.scroll,
            initialScroll: res.initialScroll,
            scrollDelta: res.scrollDelta,
            direction: res.direction
        })
        this.props.onScroll(res.direction,res.scrollDelta);
        this.props.onBottomReached(scroll.scrollHeight-scroll.scrollTop === scroll.clientHeight);
    }

    getScrollDelta = scroll => {
        let direction = this.state.direction;
        let initialScroll = this.state.initialScroll;
        let scrollDelta = this.state.scrollDelta;
        switch(this.state.direction) {
            case 'down': scroll>this.state.scroll
                ? (scrollDelta = scroll-this.state.initialScroll)
                : (
                    direction = 'up',
                    initialScroll = scroll,
                    scrollDelta = 0
                );
                break;
            case 'up': scroll<this.state.scroll
                ? (scrollDelta = this.state.initialScroll-scroll)
                : (
                    direction = 'down',
                    initialScroll = scroll,
                    scrollDelta = 0
                );
                break;
        }
        return {
            scroll,
            direction,
            initialScroll,
            scrollDelta
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.content}
                    style={{
                        paddingTop: this.props.paddingTop,
                        paddingBottom: this.props.paddingBottom
                    }}
                    onScroll={e => this.scrollChange(e.target)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Scroller.defaultProps = {
    paddingTop: 0,
    paddingBottom: 0
}

export default withStyles(styles)(Scroller);