# React Scrollable Appbars

Add Material Design Appbars to your projects, following Top Appbar (https://material.io/design/components/app-bars-top.html) and Bottom Appbar (https://material.io/design/components/app-bars-bottom.html) specs.

This module integrates a Scroller component that listens to scroll changes.

Every component can show/hide based to scroll changes.

## Installation

```bash
npm install react-scrollable-appbars
```

## Example

```javascript
import React, { useState } from 'react';
import { TopAppbar, BottomAppbar, Scroller } from 'react-scrollable-appbars';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
};

function App(props) {

    const classes = props.classes;
    const theme = props.theme;

    const [direction, setDirection] = useState('down');
    const [scrollDelta, setScrollDelta] = useState(0);
    const [bottomReached, setBottomReached] = useState(false);

    const scrollChange = (d,sd) => {
        setDirection(d);
        setScrollDelta(sd);
    }

    const showBar = () => {
        return (direction==='down' && scrollDelta<56) || direction==='up' || bottomReached;
    }

    const title = "Scrollable Appbars";
    const list = Array.from(Array(100).keys());
    
    return (
        <div className={classes.root}>
            <TopAppbar
				static
				show={showBar()}
                elevation={0}
                title={title}
                color={theme.palette.primary.main}>
                <IconButton color="inherit">
                    <Icon>search</Icon>
                </IconButton>
            </TopAppbar>

            <Scroller
                paddingTop={56}
                paddingBottom={56}
				onScroll={(d,sd) => scrollChange(d,sd)}
                onBottomReached={bottom => setBottomReached(bottom)}>
                {list.map(key => <div>Row {key}</div>)}
            </Scroller>
            
            <BottomAppbar
				static
				inset
				show={showBar()}
                color={theme.palette.primary.main}
                fabColor={theme.palette.secondary.main}
                fabIcon={<Icon>add</Icon>}
                fabClick={() => alert("FAB clicked")}
                menuClick={() => alert("Menu button clicked")}>
                <IconButton color="inherit">
                    <Icon>account_circle</Icon>
                </IconButton>
            </BottomAppbar>
        </div>
    );
}

export default withStyles(styles,{withTheme: true})(App);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)