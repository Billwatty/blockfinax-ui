import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Home, FileText, Upload, Wallet, X, 
  CreditCard, DollarSign, Receipt
} from 'lucide-react';
import { Button } from '../ui/button';
import { useWeb3 } from '../../hooks/useWeb3';
import { useAppContext } from '../../hooks/useAppContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

// Helper function to shorten wallet addresses
const shortenAddress = (address: string | null | undefined): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Sidebar = () => {
  const [location] = useLocation();
  const { account, user } = useWeb3();
  const { sidebarOpen, toggleSidebar } = useAppContext();

  const sidebarClasses = sidebarOpen 
    ? "fixed inset-0 z-40 flex md:static md:inset-auto md:flex md:flex-shrink-0 transform translate-x-0 transition-transform duration-200 ease-in-out"
    : "fixed inset-0 z-40 flex md:static md:inset-auto md:flex md:flex-shrink-0 transform -translate-x-full md:translate-x-0 transition-transform duration-200 ease-in-out";

  // Check if a route is active
  const isActive = (path: string) => {
    return location === path;
  };

  // Check if a route is part of a group that is active
  const isGroupActive = (paths: string[]) => {
    return paths.some(path => location.startsWith(path));
  };

  // Navigation item component
  const NavItem = ({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) => (
    <Link href={href}>
      <div className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer ${
        active 
          ? "text-white bg-primary" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}>
        {icon}
        {label}
      </div>
    </Link>
  );

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">BlockFinax</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavItem 
              href="/" 
              icon={<Home className="mr-3 h-5 w-5" />} 
              label="Dashboard" 
              active={isActive("/")} 
            />

            <NavItem 
              href="/invoices" 
              icon={<Receipt className="mr-3 h-5 w-5" />} 
              label="Invoices" 
              active={isGroupActive(["/invoice"])} 
            />

            <NavItem 
              href="/wallet" 
              icon={<Wallet className="mr-3 h-5 w-5" />} 
              label="Wallet" 
              active={isGroupActive(["/wallet"])} 
            />
            
            <NavItem 
              href="/contracts" 
              icon={<FileText className="mr-3 h-5 w-5" />} 
              label="Contracts" 
              active={isGroupActive(["/contracts"])} 
            />

            <NavItem 
              href="/documents" 
              icon={<Upload className="mr-3 h-5 w-5" />} 
              label="Documents" 
              active={isGroupActive(["/documents"])} 
            />
          </nav>

          {account && (
            <div className="mt-auto">
              <Separator />
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImage} alt="User" />
                    <AvatarFallback className="bg-primary text-white">
                      {user?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.username || 'User'}
                    </p>
                    <p className="text-xs font-medium text-gray-500 font-mono truncate">
                      {shortenAddress(account)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Dark overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-[-1] md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </aside>
  );
};

export default Sidebar;