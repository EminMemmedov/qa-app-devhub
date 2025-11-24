import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import DevToolsPanel from './DevToolsPanel';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
            <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
                <Outlet />
                <BottomNav />
                <DevToolsPanel />
            </div>
        </div>
    );
}
