/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { PlusIcon, LogoutIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../../Redux/Slices/users/userSlices";
import { ChatState } from "../../../context/ChatContext";
import SearchBar from "../../User/UsersSearch/SearchBar";

import BookData from "../../User/UsersSearch/Data.json";


const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: "Create", href: "/create-post", current: false },
  { name: "Posts", href: "/posts", current: false },
  // { name: "Authors", href: "/users", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PrivateNavbar = ({ isLogin }) => {
  const { notification } = ChatState();

  const userNavigation = [
    { name: "Your Profile", href: `/profile/${isLogin?._id}` },
    // { name: "Change your password", href: "/update-password" },
  ];
  const dispatch = useDispatch();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <BookOpenIcon className="h-10 w-10 text-gray-200" />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    key="Chat"
                    to="/chat"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white"
                    aria-current="page"
                  >
                    Chat{" "}
                    
                    {notification.length > 0 ? (
                      <span class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded ">
                        {notification.length}
                      </span>
                    ) : null}
                  </Link>
                 
                </div>
                
              </div>
              {/* <div><SearchBar placeholder="Enter a Book Name..." data={BookData} /></div> */}
              <div className="flex items-center">
                <div className="flex-shrink-0 ">
                  
                  <Link
                    to="/create-post"
                    className="pr-3  relative inline-flex items-center mr-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white border-gray-200 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>New Post</span>
                  </Link>

                  
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative z-10">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={isLogin?.profilePhoto}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <div
                    onClick={() => dispatch(logoutUserAction())}
                    type="button"
                    className=" hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 overflow-auto border-t-2 border-black"
                  >
                    
                    <span> Logout</span>
                  </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                  
                </div>
                <div>
                  
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
              <a
                    key="Chat"
                    href="/chat"
                    className={classNames(
    
                        "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current="page"
                  >
                    Chat{" "}
                    
                    {notification.length > 0 ? (
                      <span class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded ">
                        {notification.length}
                      </span>
                    ) : null}
                  </a>
            </div>
            {/* Mobile */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={isLogin?.profilePhoto}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {isLogin?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {isLogin?.email}
                  </div>
                </div>
              
              </div>
              <div className="mt-3 px-2 space-y-1 sm:px-3">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
                
              </div>
              <div
                    onClick={() => dispatch(logoutUserAction())}
                    type="button"
                    className="block px-5 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    
                    <span> Logout</span>
                  </div>
            </div>
            
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PrivateNavbar;
