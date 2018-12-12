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

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
});

function App(props) {

    const classes = props.classes;

    const [scroll,setScroll] = useState(0);

    const list = Array.from(Array(100).keys());
    
    return (
        <div className={classes.root}>
            <TopAppbar static show={scroll<56}
                elevation={0}
                title="Example"
                color="#f44336">
                <IconButton color="inherit">
                    <Icon>search</Icon>
                </IconButton>
            </TopAppbar>

            <Scroller paddingTop={56} className={classes.scroller} onScroll={top => setScroll(top)}>
                {list.map(key => <div>Row {key}</div>)}
            </Scroller>
            
            <BottomAppbar static inset show={scroll<56}
                color="#f44336"
                fabColor="#3f51b5"
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

export default withStyles(styles)(App);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)