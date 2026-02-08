'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigationConfig } from '@/config/navigation.tsx';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="gap-1">
          {navigationConfig.mainNav.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950 dark:hover:to-indigo-950 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200">
                {item.icon && <item.icon />}
                <span className="ml-2 font-medium">{item.title}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-2 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg">
                  {item.items?.map((subItem) => (
                    <ListItem
                      key={subItem.title}
                      title={subItem.title}
                      href={subItem.href || '#'}
                    >
                      {subItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-3">
            {navigationConfig.mainNav.map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  {item.icon && <item.icon />}
                  <p className="font-bold text-lg">{item.title}</p>
                </div>
                <div className="space-y-1 pl-2">
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href || '#'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <div
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg transition-all duration-200",
                          pathname === subItem.href
                            ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                        )}
                      >
                        <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0 text-slate-400" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-slate-900 dark:text-slate-100">
                            {subItem.title}
                          </p>
                          {subItem.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {subItem.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950 dark:hover:to-indigo-950 focus:bg-gradient-to-r focus:from-blue-50 focus:to-indigo-50 dark:focus:from-blue-950 dark:focus:to-indigo-950 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </div>
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-slate-600 dark:text-slate-400 mt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
