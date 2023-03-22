import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CulturaGTO from "../img/culturagto.png";
import BliotecaCentral from "../img/CentralEstatal.svg";
import { useNavigate } from "react-router-dom";
import Logout from './Avatar/Logout'
import { setNext } from '../Features/CreateNext/CreateSlice'
import { useDispatch } from 'react-redux'

const Pages = [
  {
    name: "Inicio",
    path: "/home",
  },
  {
    name: "Recursos para descargar",
    path: "/recursos",
  },
  {
    name: "Aviso de privacidad",
    path: "/privacidad",
  },
  {
    name: "Contacto",
    path: "/contacto",
  },
  {
    name: 'Publicaciones',
    path: '/publicaciones'
  }
];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [tokenExists, setTokenExists] = React.useState(false);
  const dispatch = useDispatch()

  const VerfifyToken = () => {
    if (localStorage.getItem("GTO")) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  };

  React.useEffect(() => {
    VerfifyToken();
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img height="50" src={CulturaGTO} alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    navigate(page.path);
                    dispatch(setNext({
                      status: 0
                    }))
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img height="50" src={CulturaGTO} alt="" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  navigate(page.path);
                  dispatch(setNext({
                    status: 0
                  }))
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ flexGrow: 0 }}
          >
            <img height="55" alt="Remy Sharp" src={BliotecaCentral} />
          </Box>
          {tokenExists && (
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ flexGrow: 1 }}
            >
              <Logout />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
