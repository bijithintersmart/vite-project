import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/react.svg";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import SunIcon from "../assets/sun-icon.svg";
import MoonIcon from "../assets/moon-icon.svg";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/feature" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              data-text={item.name}
              className={`nav-link text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 ${
                location.pathname === item.href ? "active" : ""
              }`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {/* Theme Switcher Slider */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative inline-flex h-9 w-20 items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <motion.div
              className="absolute top-1 left-1 h-7 w-7 rounded-full bg-white shadow-lg flex items-center justify-center"
              animate={{ x: theme === "dark" ? 44 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={theme === "dark" ? MoonIcon : SunIcon}
                alt={theme === "dark" ? "Dark mode" : "Light mode"}
                className="h-4 w-4"
              />
            </motion.div>
          </button>

          <Link
            to="/login"
            data-text="Log in"
            className={`nav-link text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 ${
              location.pathname === "/login" ? "active" : ""
            }`}
          >
            <span>
              Log in <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      location.pathname === item.href ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {/* Theme Switcher Slider for mobile */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 w-full text-left"
                  role="switch"
                  aria-checked={theme === "dark"}
                >
                  <span className="sr-only">Toggle theme</span>
                  <motion.span
                    className="pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white shadow ring-0"
                    aria-hidden="true"
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    x={theme === "dark" ? 32 : 0}
                  >
                    <motion.span
                      className={`absolute inset-0 flex h-full w-full items-center justify-center`}
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: theme === "light" ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={SunIcon} alt="Light mode" className="h-5 w-5" />
                    </motion.span>
                    <motion.span
                      className={`absolute inset-0 flex h-full w-full items-center justify-center`}
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: theme === "dark" ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={MoonIcon} alt="Dark mode" className="h-5 w-5" />
                    </motion.span>
                  </motion.span>
                </button>
                <Link
                  to="/login"
                  className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}