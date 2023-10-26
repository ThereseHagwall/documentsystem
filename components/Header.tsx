'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from 'classnames';

export default function Header() {
    const currentPath = usePathname();
    const links = [
        { label: "Startsida", href: "/" },
        { label: "Alla dokument", href: "/documentList" },
        { label: "Nytt dokument", href: "/addNewDoc" },
    ];

    return (
        <header className="sticky top-0 flex flex-col lg:flex-row items-center justify-between h-auto lg:h-24 bg-purple-200 text-black z-10 shadow-md p-4">
            <Link href="/">
                <h1 className="ml-10 md:text-3xl font-semibold cursor-pointer">
                    Dokumenthanteringssystem
                </h1>
            </Link>
            <nav className="mt-4 lg:mt-0">
                <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 mx-4 lg:mx-64">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            className={classnames({
                                "text-zinc-900 font-bold": link.href === currentPath,
                                "text-zinc-500": link.href !== currentPath,
                                "hover:text-zinc-800 hover:underline transition-colors": true,
                            })}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
