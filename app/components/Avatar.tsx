"use client"
import Image from "next/image"

type AvatarProps = {
  src: string | null | undefined
} 

const Avatar = ({src}: AvatarProps) => {
  return (
    <Image alt="Avatar" height={30} width={30} className="rounded-full" src={src || `/images/placeholder.jpg`} />
  )
}

export default Avatar
