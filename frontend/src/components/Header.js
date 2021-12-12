import { Fragment, useEffect } from 'react'
import { Popover, Menu, Transition } from '@headlessui/react'
import {
    AnnotationIcon,
    ChatAlt2Icon,
    InboxIcon,
    MenuIcon,
    QuestionMarkCircleIcon,
    XIcon,
} from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { classNames } from '../common/class-names';
import { logout } from "../store/auth.store";
import { getCart } from "../store/cart.store"

const solutions = [
    {
        name: 'Inbox',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: InboxIcon,
    },
    {
        name: 'Messaging',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: AnnotationIcon,
    },
    { name: 'Live Chat', description: "Your customers' data will be safe and secure.", href: '#', icon: ChatAlt2Icon },
    {
        name: 'Knowledge Base',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: QuestionMarkCircleIcon,
    },
]
const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: 'Partners', href: '/abc' },
    { name: 'Company', href: '/xyz' },
]

export default function Header() {

    const { user } = useSelector((state) => state.auth);
    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    const userNavigation = [
        { name: 'Đơn hàng của tôi', action: () => history.push('/orders') },
        { name: 'Đăng xuất', action: () => dispatch(logout()) },
    ];


    useEffect(() => {
        if (user) {
            dispatch(getCart()).unwrap();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-white">
            <header>
                <Popover className="relative bg-yellow-400 z-20">
                    <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="#">
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src="./assets/—Pngtree—good food logo template design_5301333.png"
                                    alt="logo"
                                />
                            </a>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden md:flex space-x-10">
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                                                        {solutions.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                            >
                                                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white sm:h-12 sm:w-12">
                                                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>

                            {navigation.map((item) => (
                                <NavLink key={item.name} exact={true} activeClassName='border-b-2 border-bottom-green' to={item.href} className="text-nav-color text-base font-medium text-gray-900">
                                    <span>{item.name}</span>
                                </NavLink>

                            ))}
                        </Popover.Group>
                        {user
                            ? <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="group w-full bg-yellow-400 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:opacity-30 focus:outline-none">
                                        <span className="flex w-full justify-between items-center">
                                            <span className="flex min-w-0 items-center justify-between space-x-3">
                                                <img
                                                    className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                                <span className="flex-1 flex flex-col min-w-0">
                                                    <span className="text-white text-sm font-medium truncate">{user.userInfo.name}</span>
                                                    <span className="text-gray-400 text-sm truncate">{user.userInfo.phone_number}</span>
                                                </span>
                                            </span>
                                        </span>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <span
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                        onClick={item.action ? item.action : () => { }}
                                                    >
                                                        {item.name}
                                                    </span>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            : <div className={classNames(!user ? 'ml-10 space-x-4' : 'hidden')}>
                                <Link
                                    to='login'
                                    className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to='register'
                                    className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                                >
                                    Sign up
                                </Link>
                            </div>
                        }
                    </div>

                    <Transition
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <nav className="grid grid-cols-1 gap-7">
                                            {solutions.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                                                >
                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                                <div className="py-6 px-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                exact={true}
                                                key={item.name}
                                                activeClassName="text-blue-700"
                                                to={item.href}
                                                className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                    {
                                        user ? <div></div> :
                                            <div className="mt-6">
                                                <a
                                                    href="#"
                                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                                >
                                                    Sign up
                                                </a>
                                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                                    Existing customer?
                                                    <a href="#" className="text-gray-900">
                                                        Sign in
                                                    </a>
                                                </p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </header>

            <main>
                <div>
                    {/* Hero card */}
                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
                        <div className="max-w-full">
                            <div className="relative shadow-xl  sm:overflow-hidden">
                                <div className="absolute inset-0">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://cltburgerweek.com/wp-content/uploads/2019/03/specials-banner.jpg"
                                        alt="background"
                                    />
                                    <div className="absolute bg-gray-400 inset-0 mix-blend-multiply" />
                                </div>
                                <div className="relative py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                                        Happy our special
                                    </p>
                                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                        <span className="block text-white">Always fresh and Tasty</span>

                                    </h1>
                                    <div className="flex text-center items-center mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                        <div className=" items-center  sm:mx-auto  sm:gap-5">
                                            <a
                                                href="#"
                                                className="flex text-center items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-400 bg-opacity-80 hover:bg-opacity-70 sm:px-8"
                                            >
                                                Order now
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo cloud */}
                    <div className="bg-gray-100">
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                                We offer delicious burgers, pizzas, sapaghetti,...
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img className="h-12 " src="https://cdn1.iconfinder.com/data/icons/food-drinks-55/1096/burger_Converted-512.png" alt="burger" />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img className="h-12" src="https://i.pinimg.com/originals/76/16/81/7616818a1416b2a7e3af6c9cc76cc23e.png" alt="pizza" />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://image.flaticon.com/icons/png/512/851/851631.png"
                                        alt="fries"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://www.inventicons.com/uploads/iconset/1248/wm/512/Foods_chicken-food-roast-40.png"
                                        alt="Fried Chicken"
                                    />
                                </div>
                                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://cdn4.iconfinder.com/data/icons/nutrition-big-set/100/nutrition-56-512.png"
                                        alt="spaghetti"
                                    />
                                </div>
                                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                                    <img
                                        className="h-12"
                                        src="https://i.pinimg.com/originals/cf/c2/9c/cfc29cd95b56c9d3f5debfd67eafd69c.png"
                                        alt="drink"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More main page content here... */}
            </main>
        </div>
    )
}



