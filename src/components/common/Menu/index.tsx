import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Drawer, IconButton } from '@material-ui/core';
import MenuItems from './MenuItems.component';
import { IMenu } from './types';
import MenuStyles from './styles.module';

const Menu = ({ type }: IMenu): JSX.Element => {
  const classes = MenuStyles();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };
  return (
    <>
      {type === 'mobile' && (
        <>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
            <Box
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              p={3}
            >
              <MenuItems type={'mobile'} />
            </Box>
          </Drawer>
        </>
      )}
      {type === 'desktop' && (
        <Box p={3} className={classes.menuDesktopContainer}>
          <MenuItems type={'desktop'} />
        </Box>
      )}
    </>
  );
};

export default Menu;
