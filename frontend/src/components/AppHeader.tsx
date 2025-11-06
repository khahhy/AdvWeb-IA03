import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AppHeader = ({
  email,
  onLogout,
}: {
  email: string | undefined;
  onLogout: () => void;
}) => {
  const fallback = email ? email.substring(0, 2).toUpperCase() : "??";

  const handleBackHome = () => {
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={handleBackHome}
        >
          AdvWeb - IA03
        </h1>

        <div className="flex items-center gap-4">
          {email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-red-600 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={handleLogin}>
                Login
              </Button>
              <Button onClick={handleSignup}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
