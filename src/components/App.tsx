import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Main, DrawerHeader } from './Main';
import { AppBar } from './AppBar';
import { AppDrawer } from './Drawer';
import Canvas from '../canvas';
import artController from '../controller/Art';
import arts from '../art';

// Prevent hot reload for App module.
if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        console.log('Disposing app');
        artController.stop();
    })
}

const App = () => {
    const [activeArtIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const art = arts[activeArtIndex]

    const handleDrawerOpen = () => {
        setOpen(true);
        Canvas.fitCanvas();
    };

    const handleDrawerClose = () => {
        setOpen(false);
        Canvas.fitCanvas();
    };

    useEffect(() => {
        artController.init();
    }, []);

    useEffect(() => {
        artController.start(art);
    }, [activeArtIndex]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {art.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppDrawer
                handleDrawerClose={handleDrawerClose}
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </AppDrawer>
            <Main open={open}>
                <DrawerHeader />
                <canvas id="board"/>
            </Main>
        </Box>
    )
}

export default App
