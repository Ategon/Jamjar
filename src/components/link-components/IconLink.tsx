import { Link } from "@nextui-org/react";
import { ReactNode } from "react";

interface IconLinkProps {
  icon: ReactNode;
  href: string;
}

export default function IconLink({ icon, href }: IconLinkProps) {
  return (
    <Link
      href={href}
      className="text-white flex justify-center duration-500 ease-in-out transition-all transform hover:scale-125"
    >
      {icon}
    </Link>
  );
}