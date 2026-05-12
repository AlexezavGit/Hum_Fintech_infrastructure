import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, LogOut, User, Settings, Heart } from "lucide-react";

export default function Header() {
  const { user } = useAuth() as { user: any };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const getDisplayName = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (email) return email.split("@")[0];
    return "User";
  };

  return (
    <nav className="glass-card border-b border-[hsla(185,80%,60%,0.15)] sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.25)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[hsl(185,100%,50%)]" />
            </div>
            <div>
              <span className="text-base font-bold teal-text tracking-wide">Feel Again</span>
              <span className="ml-2 text-xs text-[hsl(185,15%,40%)] hidden sm:inline">Unified MHPSS Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-[hsla(185,100%,40%,0.08)]">
              <Bell className="h-4 w-4 text-[hsl(185,15%,55%)]" />
              <span className="absolute -top-0.5 -right-0.5 bg-[hsl(25,75%,52%)] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">3</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 hover:bg-[hsla(185,100%,40%,0.08)]">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.profileImageUrl || ""} />
                    <AvatarFallback className="bg-[hsla(185,100%,40%,0.2)] text-[hsl(185,100%,60%)] text-xs">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[hsl(185,20%,80%)] hidden sm:inline">
                    {getDisplayName(user?.firstName, user?.lastName, user?.email)}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[hsl(185,15%,45%)]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[hsl(195,50%,10%)] border border-[hsla(185,30%,20%,0.8)]">
                <DropdownMenuItem className="text-[hsl(185,15%,70%)] hover:text-[hsl(185,20%,90%)] hover:bg-[hsla(185,100%,40%,0.08)] cursor-pointer">
                  <User className="mr-2 h-4 w-4" />Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[hsl(185,15%,70%)] hover:text-[hsl(185,20%,90%)] hover:bg-[hsla(185,100%,40%,0.08)] cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[hsla(185,30%,20%,0.8)]" />
                <DropdownMenuItem onClick={() => (window.location.href = "/api/logout")} className="text-[hsl(185,15%,70%)] hover:text-[hsl(185,20%,90%)] hover:bg-[hsla(185,100%,40%,0.08)] cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
