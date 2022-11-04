import { MouseEvent, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import { logout } from '../../auth/auth';
import Title from '../title/title';

function Navbar() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const expandUserMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setAnchor(currentTarget);
  };

  const collapseUserMenu = () => {
    setAnchor(null);
  };

  return (
    <AppBar position="absolute" variant="elevation" classes={{ root: 'py-3' }}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Title />
          </Grid>
          <Grid item>
            <Tooltip title="Abrir configurações">
              <IconButton
                sx={{ p: 0 }}
                onClick={expandUserMenu}
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar alt="Guilherme L. Moraes">GL</Avatar>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchor} open={open} onClose={collapseUserMenu}>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}

export default Navbar;
