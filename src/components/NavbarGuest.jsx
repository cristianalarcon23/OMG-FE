import { Fragment } from 'react'
import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css'; 



export default function Navbar() {


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                {/* <div className="flex-shrink-0">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src=""
                    alt="Oh my goods logo"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src=""
                    alt="Oh my goods logo"
                  />
                </div> */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
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
              <div className="-mr-2 flex sm:hidden">
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
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Log in
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/signup"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign up
              </Disclosure.Button>
            </div>
            
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}