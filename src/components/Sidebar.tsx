
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, ClipboardCheck, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Requirements Analysis', href: '/requirements', icon: ClipboardCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-xl font-bold text-primary">QA Automator Pro</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4">
        <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
