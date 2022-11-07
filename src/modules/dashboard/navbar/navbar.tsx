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

import { useNavigate } from 'react-router-dom';
import logout from '../../auth/services/logout';
import useNotification from '../../../common/hooks/use-notification';
import Title from '../../../common/components/title/title';

function Navbar() {
  const notify = useNotification();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const expandUserMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setAnchor(currentTarget);
  };

  const collapseUserMenu = () => {
    setAnchor(null);
  };

  const logUserOut = async (): Promise<void> => {
    const hasError = await logout();
    if (hasError instanceof Error) {
      notify({
        type: 'error',
        message: 'Por favor, tente novamente mais tarde',
        title: 'Erro ao encerrar sessão',
      });
      return;
    }

    navigate('/auth');
  };

  return (
    <AppBar position="sticky" variant="elevation" classes={{ root: 'py-3' }}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Title withIcon />
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
              <MenuItem onClick={logUserOut}>
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
