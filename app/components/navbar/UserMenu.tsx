"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "../../hooks/useRegisterModal";
import { useLoginModal } from "../../hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRentModal } from "../../hooks/useRentModal";
import { useRouter } from "next/navigation";

type UserMenu = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: UserMenu) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex items-center gap-3'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label='My Trips'
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label='My Favorites'
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label='My Reservations'
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label='My Properties'
                />
                <MenuItem onClick={rentModal.onOpen} label='Airbnb My Home' />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label='Log out'
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  label='Log in'
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  label='Sign up'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
