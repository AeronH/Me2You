import TwitterLogo from '../assets/Twitter-logo.svg.png';
import {
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink, Link } from 'react-router-dom';

function SideBar() {
    const sidebarOptions = [
        { label: 'Home', icon: <HomeIcon /> },
        { label: 'Explore', icon: <TagIcon /> },
        { label: 'Accounts', icon: <GroupIcon /> },
        { label: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <div className="p-5 flex flex-col justify-between h-screen w-60">
            <div>
                <Link to="Home">
                    <section className="flex justify-around items-center cursor-pointer">
                        <img
                            src={TwitterLogo}
                            alt="This is the logo"
                            className="h-10"
                        />
                        <h2 className="text-xl">Twotter</h2>
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
            <div className="flex justify-between items-center">
                <Avatar alt="Users avatar Image" />
                <h2 className="font-semibold">Username goes here</h2>
            </div>
        </div>
    );
}

export default SideBar;
