import TwitterLogo from '../assets/Twitter-logo.svg.png';
import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import { User } from '../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
    clearCurrentUser,
    setCurrentUser,
    setLikedPosts,
} from '../redux/userSlice';

function SideBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useDispatch();

    // Redux state
    const isLoggedIn = useSelector(
        (state: RootState) => state.currentUser.isLoggedIn
    );
    const currentUser: User | null = useSelector(
        (state: RootState) => state.currentUser.currentUser
    );

    const open = Boolean(anchorEl);

    const sidebarOptions = [
        { label: 'Home', icon: <HomeIcon /> },
        { label: 'Explore', icon: <TagIcon /> },
        { label: 'Accounts', icon: <GroupIcon /> },
        { label: 'Settings', icon: <SettingsIcon /> },
    ];

    function toggleUserDropdown(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    async function onLogout() {
        await authService.logout();
        dispatch(clearCurrentUser());
    }

    // useEffect(() => {
    //     (async () => {
    //         const loggedInUser = await authService.getLoggedInUserDetails();

    //         if (loggedInUser) {
    //             dispatch(setCurrentUser(loggedInUser));
    //             dispatch(setLikedPosts(loggedInUser.likedPosts));
    //         }
    //     })();
    // }, []);

    return (
        <div className="p-5 flex flex-col justify-between h-screen w-60 fixed">
            <div>
                <Link to="Home">
                    <section className="flex justify-start items-center cursor-pointer">
                        <img
                            src={TwitterLogo}
                            alt="This is the logo"
                            className="h-6 ml-8"
                        />
                        {/* <h2 className="text-xl">Twotter</h2> */}
                    </section>
                </Link>
                <section className="h-fit w-full">
                    <List>
                        {sidebarOptions.map((item, index) => (
                            <NavLink key={index} to={item.label}>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                        ></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </section>
            </div>

            {!isLoggedIn ? (
                <Link to="login">
                    <Button variant="outlined" className="w-full">
                        Log In{' '}
                    </Button>
                </Link>
            ) : (
                <div>
                    <div
                        className="flex justify-start gap-4 items-center hover:bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
                        onClick={toggleUserDropdown}
                    >
                        <Avatar alt="Users avatar Image" />
                        <h2 className="font-semibold">
                            @{currentUser?.username}
                        </h2>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mb: 1.5,
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 40,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'top',
                        }}
                        transformOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom',
                        }}
                    >
                        <MenuItem onClick={onLogout}>Log Out</MenuItem>
                    </Menu>
                </div>
            )}
        </div>
    );
}

export default SideBar;
