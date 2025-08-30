"use client";

import Logo from "@/components/Logo";
import NavUser from "@/components/NavUser";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface IChildNavigationLink {
  name: string;
  url: string;
}

interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const isMenuItemActive = (menu: INavigationLink | IChildNavigationLink, pathname: string) => {
  return (
    (pathname === `${menu.url}/` || pathname === menu.url) &&
    "text-primary font-semibold dark:text-white dark:bg-gray-700 rounded-md"
  );
};

const Header: React.FC<{ children: any }> = ({ children }) => {
  const [navbarShadow, setNavbarShadow] = useState(false);
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setNavbarShadow(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-30 bg-white dark:bg-darkmode-body ${
        settings.sticky_header && "sticky top-0"
      } ${navbarShadow ? "shadow-sm" : ""}`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Menu (desktop) */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {main.map((menu, i) =>
            menu.hasChildren ? (
              <li key={`menu-${i}`} className="relative group">
                <span
                  className={`cursor-pointer inline-flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    menu.children?.some(
                      (c) => c.url === pathname || `${c.url}/` === pathname
                    )
                      ? "text-primary font-semibold dark:text-white dark:bg-gray-700"
                      : ""
                  }`}
                >
                  {menu.name}
                  <svg
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
                <ul className="absolute left-0 mt-2 hidden w-44 rounded-md bg-white dark:bg-gray-800 shadow-md group-hover:block">
                  {menu.children?.map((child, j) => (
                    <li key={`child-${j}`}>
                      <Link
                        href={child.url}
                        className={`block px-4 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isMenuItemActive(child, pathname) || ""
                        }`}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={`menu-${i}`}>
                <Link
                  href={menu.url}
                  className={`px-3 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isMenuItemActive(menu, pathname)
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            )
          )}
          {navigation_button.enable && (
            <li>
              <Link
                className="btn btn-outline-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>

        {/* Right: Search, Theme, User, Mobile toggle */}
        <div className="flex items-center space-x-4">
          {settings.search && (
            <Suspense>
              <SearchBar />
            </Suspense>
          )}
          <ThemeSwitcher className="" />
          {settings.account && <NavUser />}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 border rounded"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white dark:bg-darkmode-body border-t">
          <ul className="flex flex-col p-4 space-y-3">
            {main.map((menu, i) =>
              menu.hasChildren ? (
                <li key={`menu-mobile-${i}`}>
                  <details>
                    <summary className="cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      {menu.name}
                    </summary>
                    <ul className="ml-4 mt-2 space-y-2">
                      {menu.children?.map((child, j) => (
                        <li key={`child-mobile-${j}`}>
                          <Link
                            href={child.url}
                            className={`block px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              isMenuItemActive(child, pathname) || ""
                            }`}
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={`menu-mobile-${i}`}>
                  <Link
                    href={menu.url}
                    className={`block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isMenuItemActive(menu, pathname)
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {menu.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
