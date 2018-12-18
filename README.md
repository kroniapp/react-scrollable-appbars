# React Scrollable Appbars

Add Material Design Appbars to your projects, following Top Appbar (https://material.io/design/components/app-bars-top.html) and Bottom Appbar (https://material.io/design/components/app-bars-bottom.html) specs.

This module integrates a Scroller component that listens to scroll changes.

Every component can show/hide based to scroll changes.

## Installation

##### Install Material-ui packages (required)
```bash
npm install @material-ui/core @material-ui/styles
```

then

##### Install React Scrollable Appbars
```bash
npm install react-scrollable-appbars
```

## Examples

#### Render a Top and a Bottom Appbar that reacts to scroll
```javascript
import React, { useState } from 'react';
import { TopAppbar, BottomAppbar, Scroller } from 'react-scrollable-appbars';

import { makeStyles, useTheme } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    row: {
        padding: theme.spacing.unit * 2
    }
}));

function App() {

    const classes = useStyles();
    const theme = useTheme();

    const [show, setShow] = useState(true);
    const [bottomReached, setBottomReached] = useState(false);

    const scrollChange = async(direction,scrollDelta) =>
        setShow((direction==='down' && scrollDelta<56) || direction==='up');

    const title = "Scrollable Appbars";
    const list = Array.from(Array(100).keys());
    
    return (
        <div className={classes.root}>
            <TopAppbar
				static
				show={show || bottomReached}
                elevation={0}
                title={title}
                color={theme.palette.primary.main}>
                <IconButton color="inherit">
                    <Icon>search</Icon>
                </IconButton>
            </TopAppbar>

            <Scroller
                paddingTop={56}
                paddingBottom={96}
				onScroll={(d,sd) => scrollChange(d,sd)}
                onBottomReached={bottom => setBottomReached(bottom)}>
                {list.map(key => <div>
                    <div className={classes.row}>Row {key}</div>
                    <Divider light/>
                </div>)}
            </Scroller>
            
            <BottomAppbar
				static
				inset
				show={show || bottomReached}
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

export default App;
```

#### Render a Fab that reacts to scroll
```javascript
import React, { useState } from 'react';
import { Fab, Scroller } from 'react-scrollable-appbars';

import { makeStyles, useTheme } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    row: {
        padding: theme.spacing.unit * 2
    }
}));

function App() {

    const classes = useStyles();
    const theme = useTheme();

    const [show, setShow] = useState(true);
    const [bottomReached, setBottomReached] = useState(false);

    const scrollChange = async(direction,scrollDelta) =>
        setShow((direction==='down' && scrollDelta<56) || direction==='up');

    const list = Array.from(Array(100).keys());
    
    return (
        <div className={classes.root}>
            <Scroller
                paddingBottom={96}
				onScroll={(d,sd) => scrollChange(d,sd)}
                onBottomReached={bottom => setBottomReached(bottom)}>
                {list.map(key => <div>
                    <div className={classes.row}>Row {key}</div>
                    <Divider light/>
                </div>)}
            </Scroller>

            <Fab
                show={show || bottomReached}
                color={theme.palette.secondary.main}
                onClick={() => alert("FAB clicked")}>
                <Icon>add</Icon>
            </Fab>
        </div>
    );
}

export default App;
```

## Documentation

### TopAppbar
| Prop      | Type      | Default | Description                                       |
|-----------|-----------|---------|---------------------------------------------------|
|      show | Boolean   | true    | Show or hide the component (with animation)       |
|    static | Boolean   | false   | Set the Appbar position absolute to top           |
|     color | String    | #ffffff | Background of the Toolbar                         |
| menuClick | function  | null    | Function to be called on menu button click        |
|  children | Component | null    | Render the icons in the right side of the Toolbar |

### BottomAppbar
| Prop      | Type      | Default | Description                                       |
|-----------|-----------|---------|---------------------------------------------------|
|      show | Boolean   | true    | Show or hide the component (with animation)       |
|    static | Boolean   | false   | Set the Appbar position absolute to bottom        |
|     inset | Boolean   | false   | Use the inset or the default variant as described in [Official docs](https://material.io/design/components/app-bars-bottom.html#anatomy)              |
|     color | String    | #ffffff | Background of the Toolbar                         |
| menuClick | function  | null    | Function to be called on menu button click        |
|  fabColor | String    | #ffffff | Background of the Fab                             |
|   fabIcon | Component | null    | Render the icon of the Fab                        |
|  fabClick | function  | null    | Function to be called on Fab click                |
|  children | Component | null    | Render the icons in the right side of the Toolbar |

### Fab
|     Prop | Type      | Default | Description                                 |
|---------:|-----------|---------|---------------------------------------------|
|     show | Boolean   | true    | Show or hide the component (with animation) |
|    color | String    | #ffffff | Background of the Fab                       |
|  onClick | function  | null    | Function to be called on Fab click          |
| children | Component | null    | Render the icon                             |

## Changelog

### v0.1.3
- Refactored with new React Hooks
- [NEW] Added Fab component
- [NEW] Set default theme for components
- [FIX] Adjusted behavior of BottomAppbar in large screens
- [FIX] Scroll performance optimization

### v0.1.2
- [FIX] Bug fixes

### v0.1.0
- Initial release

## License
[MIT](https://choosealicense.com/licenses/mit/)