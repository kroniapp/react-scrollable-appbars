import '../Bootstrap';

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    scroller: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: 1,
        overflowY: 'auto'
    }
});

const debounce = (fn,threshold) => {
    var timeout;
    return function() {
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;
        timeout = setTimeout(() => {
            fn.apply(_this,args);
        }, threshold || 100 );
    }
}

function Scroller(props) {
    
    const classes = useStyles();

    const [scroll,setScroll] = useState(0);
    const [initialScroll,setInitialScroll] = useState(0);
    const [scrollDelta,setScrollDelta] = useState(0);
    const [direction,setDirection] = useState('down');

    const scrollChange = async(target) => {
        const s = target.scrollTop;
        setScroll(s);
        
        switch(direction) {
            case 'down': s>scroll
                ? setScrollDelta(s-initialScroll)
                : (
                    setDirection('up'),
                    setInitialScroll(s),
                    setScrollDelta(0)
                );
                break;
            case 'up': s<scroll
                ? setScrollDelta(initialScroll-s)
                : (
                    setDirection('down'),
                    setInitialScroll(s),
                    setScrollDelta(0)
                );
                break;
        }

        props.onScroll(direction,scrollDelta);
        props.onBottomReached(target.scrollHeight-target.scrollTop === target.clientHeight);
    }

    return (
        <div className={classes.scroller}>
            <div className={classes.content}
                style={{
                    paddingTop: props.paddingTop,
                    paddingBottom: props.paddingBottom
                }}
                onScroll={e => debounce(scrollChange(e.target))}>
                {props.children}
            </div>
        </div>
    )
}

Scroller.defaultProps = {
    paddingTop: 0,
    paddingBottom: 0
}

export default Scroller;