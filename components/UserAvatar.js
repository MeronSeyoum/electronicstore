import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function UserAvatar({ userService }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="space-x-2 flex items-center justify-center w-full pl-2 lg:px-5">
                <Image
                    src={userService.userValue?.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-8 h-6 rounded-full border"
                    width={26}
                    height={26}
                />
                <span className="lg:block hidden">{userService.userValue?.first_name}</span>
                <span className='block lg:hidden w-6 h-6'></span>
            </button>
            {isOpen && (
                <div className="absolute -right-10 lg:-right-20 mt-4 lg:w-56 w-44 bg-white border rounded shadow-lg text-sm">
                    <Link
                        href={`/users/Profile/${userService.userValue?.id}`}
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 justify-between"
                    >
                        Profile <FaUser className=" text-primary" /> 
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                       Settings  <FaCog className=" text-primary" />
                    </Link>
                    <button
                        onClick={userService.logout}
                        className="flex items-center justify-between w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                       Logout  <FaSignOutAlt className=" text-primary" />
                    </button>
                </div>
            )}
        </div>
    );
}
