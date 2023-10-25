import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 flex items-center justify-between h-24 bg-purple-200 text-black z-10 shadow-md p-4">
            <Link href="/">
                <h1 className="text-4xl font-semibold cursor-pointer">
                    Dokumenthanteringssystem
                </h1>
            </Link>
            <nav>
                <ul className="list-none flex gap-4">
                    <li>
                        <Link href="/" className="text-lg hover:underline cursor-pointer">
                            Startsida
                        </Link>
                    </li>
                    <li>
                        <Link href="/documentList" className="text-lg hover:underline cursor-pointer">
                            Dokument
                        </Link>
                    </li>
                    <li>
                        <Link href="/addNewDoc" className="text-lg hover:underline cursor-pointer">
                            Nytt dokument
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
