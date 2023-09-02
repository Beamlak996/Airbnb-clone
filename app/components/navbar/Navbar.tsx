"use client"

import Container from "../Container"
import Categories from "./Categories"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { SafeUser } from "@/app/types"

type NavbarProps = {
  currentUser?: SafeUser | null
}


const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="w-full fixed bg-white z-10 shadow-sm" > 
        <div className="py-4 border-b-[1px]" >
            <Container>
                <div className="flex items-center justify-between gap-2 md:gap-0" >
                    <Logo />
                    <Search />
                    <UserMenu currentUser = {currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar
