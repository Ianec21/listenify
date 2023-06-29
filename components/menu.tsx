"use client";

import { FunctionComponent, forwardRef } from "react";
import Link from "next/link";

import HomeIcon from "../assets/icons/home.svg";
import SearchIcon from "../assets/icons/search.svg";

const menuButtons = [
    {id: 0, text: "Home", href:"/", icon: HomeIcon},
    {id: 1, text: "Search", href:"/search", icon: SearchIcon},
]

const Menu: FunctionComponent = forwardRef<HTMLDivElement>(() => {
    return <main className="h-[100vh] min-w-[300px] bg-slate-200 p-2">
        <div className="ml-3 mt-3 mb-3">
            <h1 className="text-3xl font-bold">Listenify</h1>
            <p>Listen anytime, anywhere.</p>
        </div>

        <div className="flex flex-col gap-1">
            {menuButtons.map(button => {
                const Icon: any = button.icon;
                return <Link 
                    key={`menu_button_${button.id}`} 
                    href={button.href}
                    className="text-black hover:text-white drop-shadow-lg flex align-center gap-2 text-md hover:bg-slate-600 p-2 rounded-md [&>svg]:fill-slate-600 [&>svg]:hover:fill-slate-200 [&>svg]:stroke-slate-600 [&>svg]:hover:stroke-slate-200"
                >
                    <Icon/>
                    {button.text}
                </Link>
            })}
        </div>
    </main>
});

export default Menu;