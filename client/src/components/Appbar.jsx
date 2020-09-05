import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import api from '../api'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { Home } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        background: 'linear-gradient(45deg, #8A2387, #E94057,#F27121)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Appbar(props) {
    const { window, children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleLogoutClick(e) {
        api.logout()
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <NavLink to="/" style={{ textDecoration: 'none', color: 'gray' }}>
                    <ListItem button key={1}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                </NavLink>
                <NavLink to="/posts" style={{ textDecoration: 'none', color: 'gray' }}>
                    <ListItem button key={1}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary={"Posts"} />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>

                {!api.isLoggedIn() &&
                    <NavLink to="/signup" style={{ textDecoration: 'none', color: 'gray' }}>
                        <ListItem button key={1}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={"Signup"} />
                        </ListItem>
                    </NavLink>
                }
                {!api.isLoggedIn() &&
                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'gray' }}>
                        <ListItem button key={1}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItem>
                    </NavLink>

                }
                {api.isLoggedIn() &&
                    <Link to="/" onClick={handleLogoutClick} style={{ textDecoration: 'none', color: 'gray' }}>
                        <ListItem button >
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </Link>
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
          </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}


export default withRouter(Appbar);
