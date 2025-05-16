import React, { useState } from 'react';
import { Menu, X, LogOut, User, LogIn, UserPlus, Wallet } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '../ui/button';
import { useWeb3 } from '../../hooks/useWeb3';
import { useAppContext } from '../../hooks/useAppContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Register } from "@/components/auth/Register"; // Import the new Register component

const UserMenu = () => {
  const { user, logoutUser } = useWeb3();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profileImage} alt={user?.username} />
            <AvatarFallback className="bg-primary text-white">
              {user?.username?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.walletAddress}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/wallet">
            <div className="flex items-center cursor-pointer w-full">
              <Wallet className="mr-2 h-4 w-4" />
              <span>Wallet</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const { toggleSidebar } = useAppContext();
  const { isLoggedIn } = useWeb3();
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-2 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-primary">BlockFinax</h1>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => {
                    setRegisterDialogOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Button>
                
                {/* Using the new Register component instead of RegisterDialog */}
                <Register 
                  isOpen={registerDialogOpen}
                  onClose={() => setRegisterDialogOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;