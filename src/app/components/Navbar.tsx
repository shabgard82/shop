"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

export default function Navbar() {
  const pathName = usePathname();
  const navLinks = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/store",
      title: "Store",
    },
    {
      href: "/cart",
      title: "Cart",
    },
    {
      href: "/login",
      title: "Login",
    },
  ];
  return (
    <nav className="shadow p-4">
      <Container>
        {navLinks.map((item) => (
          <Link
            className={`mr-4 ${pathName === item.href ? "text-sky-500" : ""}`}
            key={item.href}
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </Container>
    </nav>
  );
}
