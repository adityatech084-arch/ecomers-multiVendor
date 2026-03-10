import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
 <Navbar/>

      <div className="flex-1 flex items-center justify-center">
        {/* This is where PublicProtector -> SignUp/Login will render */}
        
        <Outlet />
      </div>

      <footer className="p-6 text-center text-xs text-gray-400">
        © 2024 Uber Technologies Inc.
      </footer>
    </div>
  );
};
export default AuthLayout;