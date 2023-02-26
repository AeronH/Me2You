import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { User } from '../utils/types';
import { useEffect } from 'react';
import authService from '../services/auth.service';
import { setCurrentUser } from '../redux/userSlice';

function Root() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const userDetails = await authService.getLoggedInUserDetails();
            if (userDetails) {
                dispatch(setCurrentUser(userDetails));
            }
        })();
    }, []);
    return (
        <div className="max-w-4xl mx-auto flex">
            <SideBar />
            <Outlet />
        </div>
    );
}

export default Root;
