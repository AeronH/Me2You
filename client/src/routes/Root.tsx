import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

function Root() {
    return (
        <div className="max-w-6xl mx-auto flex">
            <SideBar />
            <Outlet />
        </div>
    );
}

export default Root;
