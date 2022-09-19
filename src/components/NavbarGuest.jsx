import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css'; 


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Log in', href: '/login' },
  { name: 'Sign up', href: '/signup' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarGuest() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-20 w-auto lg:hidden"
                    src="https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-white_vplijm.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-20 w-auto lg:block"
                    src="https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-white_vplijm.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                    <NavLink to="/" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      Home
                    </NavLink>
                    <NavLink to="/login" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 " : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      Log in
                    </NavLink>
                    <NavLink to="/signup" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 " : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      Sign up
                    </NavLink>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}