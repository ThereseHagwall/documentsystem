import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 flex items-center justify-around h-24 bg-purple-400 text-black ">
            <Link href="/">
                <h1 className="text-4xl  ">Dokumenthanteringssystem</h1>
            </Link>
            <nav>
                <ul className="list-none flex gap-2">
                    <li>
                        <Link href="/">Startsida</Link>
                    </li>
                    <li>
                        <Link href="/documentList">Dokument</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
