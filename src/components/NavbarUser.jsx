import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
import React, { useContext} from 'react';
import { NavLink,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css'; 


const navigation = [
  { name: 'Home', href: '/'},
  { name: 'Search', href: '/search'},
  { name: 'My Items', href: '/items'},
  { name: 'Transactions', href: '/transactions'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
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
                    alt="Oh my goods logo"
                  />
                  <img
                    className="hidden h-20 w-auto lg:block"
                    src="https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-white_vplijm.png"
                    alt="Oh my goods logo"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <NavLink to="/" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      Home
                    </NavLink>
                    <NavLink to="/search" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 " : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      Search
                    </NavLink>
                    <NavLink to="/items" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 " : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      My Items
                    </NavLink>
                    <NavLink to="/transactions" className= {(element) => element.isActive ? "rounded-md px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 " : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>
                      Transactions
                    </NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <NavLink
                    to='/items/add'
                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    <span>New Item</span>
                  </NavLink>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <InitialsAvatar name={user ? user.fullName : 'User Name'} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                          {({ active }) => (
                            <Link to='/private'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Edit Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames( 
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => logOutUser()}
                            >
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
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
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                {<InitialsAvatar name={user ? user.fullName : 'User Name'} />}
                </div>
                <div className="ml-3">
                <div className="text-base font-medium text-white">{user ? user.fullName : 'User Name'}</div>
                  <div className="text-sm font-medium text-gray-400">{user ? user.email : 'Email'}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
              <Disclosure.Button
                  as="a"
                  href="/private"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Edit Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  onClick={() => logOutUser()}
                >
                  Log out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}