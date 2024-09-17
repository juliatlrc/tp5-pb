import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Menu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/fornecedores">
          <ListItemText primary="Cadastro de Fornecedores" />
        </ListItem>
        <ListItem button component={Link} to="/contatos">
          <ListItemText primary="Cadastro de Contatos" />
        </ListItem>
        <ListItem button component={Link} to="/produtos">
          <ListItemText primary="Cadastro de Produtos" />
        </ListItem>
        <ListItem button component={Link} to="/cotacoes">
          <ListItemText primary="Cadastro de Cotações" />
        </ListItem>
        <ListItem button component={Link} to="/consultar-cotacoes">
          <ListItemText primary="Consulta de Cotações" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#004d40", // Cor verde escuro complementar ao laranja
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffffff" }}>
            ACME System
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerToggle}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ fontSize: "1rem", padding: "10px 20px" }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/fornecedores"
                sx={{ fontSize: "1rem", padding: "10px 20px" }}
              >
                Cadastro de Fornecedores
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contatos"
                sx={{ fontSize: "1rem", padding: "10px 20px" }}
              >
                Cadastro de Contatos
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/produtos"
                sx={{ fontSize: "1rem", padding: "10px 20px" }}
              >
                Cadastro de Produtos
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/cotacoes"
                sx={{ fontSize: "1rem", padding: "10px 20px" }}
              >
                Cadastro de Cotações
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/consultar-cotacoes"
                sx={{ fontSize: "1rem", padding: "10px 20px" }}
              >
                Consulta de Cotações
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Menu;
