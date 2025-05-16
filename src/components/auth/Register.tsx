import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const Register: React.FC<RegisterProps> = ({ 
  isOpen, 
  onClose,
  defaultEmail = ''
}) => {
  const { createAccount } = useWeb3();
  const { toast } = useToast();
  const [email, setEmail] = useState(defaultEmail);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // In your Register component
const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await createAccount(email, password, fullName);
      toast({
        title: "Registration Successful",
      });
      onClose();
    } catch (error: any) {
      let errorMessage = "Registration failed";
      
      if (error.message.includes("409")) {
        errorMessage = "Email already exists";
      } else if (error.message.includes("400")) {
        errorMessage = "Invalid registration data";
      } else if (error.message) {
        errorMessage = error.message;
      }
  
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleRegister}>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              Register to create your account and wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input 
                id="reg-email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="your@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-fullname">Full Name</Label>
              <Input 
                id="reg-fullname" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                required 
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input 
                id="reg-password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength={8}
                placeholder="At least 8 characters"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};