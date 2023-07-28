"use client";
import Image from "next/image";
import React from "react";
import trelloLogo from "/public/images/trello-white-logo.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";

function Header() {
  const [searchQuery, setSearchQuery] = useBoardStore((state) => [state.searchQuery, state.setSearchQuery]);
  return (
    <div>
    <header className="flex justify-between items-center p-3 bg-transparent border-black border-solid  flex-col lg:flex-row md:flex-row">
      {/* Trello Logo */}
      <Image
        src={trelloLogo}
        alt={"Trello logo"}
        className="w-32 md:w-24 pb-5 md:pb-0 object-contain"
      />

      <div className="flex items-center w-full space-x-5 flex-1 justify-end">
        {/* Search Bar */}
        <form className="flex items-center space-x-5 bg-white p-2 rounded shadow-sm flex-1 md:flex-initial">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search" className="outline-none flex-1" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <button type="submit" hidden>
            Search
          </button>
        </form>
        
        {/* User Avatar */}
        <Avatar name="Hien Doan" round size="40" color="#0055D1"/>
      </div>
    </header>

    </div>
  );
}

export default Header;
