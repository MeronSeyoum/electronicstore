import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
            <button onClick={toggleDropdown} className=" space-x-2 flex flex-grow items-center justify-center w-full
                 px-2 lg:px-5">
                <Image
                    src={userService.userValue?.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-8 h-6 rounded-full border"
                    width={20}
                    height={20}
                />
                <span className="">{userService.userValue?.first_name}</span>

            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg text-sm">
                    <a
                        href={`/users/Profile/${userService.userValue?.id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Profile
                    </a>
                    <a
                        href="/settings"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Settings
                    </a>
                    <button
                        onClick={userService.logout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
