import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Menu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "colaboradores", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
          } else {
            console.error("Documento de colaborador não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar o papel do usuário:", error);
        }
      } else {
        // Se não estiver logado, redireciona para a página de login
        navigate("/login");
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [auth, navigate]);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  // Menu móvel (Drawer para dispositivos móveis)
  const mobileMenu = (
    <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
      <Box
        sx={{
          width: 250,
          backgroundColor: "#004d40",
          height: "100%",
          color: "#ffffff",
        }}
        role="presentation"
        onClick={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" sx={{ color: "#ffffff" }} />
          </ListItem>

          {/* Apenas colaboradores podem acessar estas opções */}
          {userRole === "colaborador" && (
            <>
              <ListItem button component={Link} to="/nova-requisicao-compra">
                <ListItemText
                  primary="Nova Requisição de Compra"
                  sx={{ color: "#ffffff" }}
                />
              </ListItem>
              <ListItem button component={Link} to="/listar-requisicoes">
                <ListItemText
                  primary="Listar Requisições"
                  sx={{ color: "#ffffff" }}
                />
              </ListItem>
            </>
          )}

          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" sx={{ color: "#ffffff" }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#004d40",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffffff" }}>
            ACME System
          </Typography>

          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
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
                  {mobileMenu}
                </>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    color="inherit"
                    onMouseEnter={handleMenuOpen}
                    sx={{
                      fontSize: "1rem",
                      padding: "10px 20px",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#ff6f00",
                        color: "#ffffff",
                      },
                    }}
                  >
                    Menu
                  </Button>

                  {/* Dropdown Menu */}
                  <MuiMenu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    onMouseLeave={handleMenuClose}
                    MenuListProps={{ onMouseLeave: handleMenuClose }}
                    PaperProps={{
                      sx: {
                        mt: 2,
                        backgroundColor: "#004d40",
                        color: "#ffffff",
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "#ff6f00",
                            color: "#ffffff",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                      Home
                    </MenuItem>

                    {userRole === "colaborador" && (
                      <>
                        <MenuItem
                          component={Link}
                          to="/nova-requisicao-compra"
                          onClick={handleMenuClose}
                        >
                          Nova Requisição de Compra
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/listar-requisicoes"
                          onClick={handleMenuClose}
                        >
                          Listar Requisições
                        </MenuItem>
                      </>
                    )}

                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MuiMenu>
                </Box>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Menu;
