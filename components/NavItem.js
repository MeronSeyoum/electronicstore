"use client"
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';

const NavItem = ({ menuItem, children, changeWidth }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState([]);

  const onMouseEnterMenu = (id) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  const renderMainItem = (item) => {
    return (
      <div className="mx-3 flex shrink-0 items-center font-normal hover:text-primary">
        <Link href={{ pathname: item.href || undefined }}>{item.name}</Link>
      </div>
    );
  };

  const renderDropdownMenu = (menuDropdown) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative list-none"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>{renderMainItem(menuDropdown)}</Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className={`sub-menu absolute z-10 ${changeWidth ? 'w-[670px]' : 'w-[300px]'} left-0 top-full`}
              >
                <div className="relative py-4 shadow-lg">{children}</div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  switch (menuItem.type) {
    case 'dropdown':
      return renderDropdownMenu(menuItem);
    case 'megaMenu':
      return null;
    default:
      return (
        <li className="menu-item shrink-0 list-none">
          {renderMainItem(menuItem)}
        </li>
      );
  }
};

export default NavItem;
