import Link from "next/link";


export default function Nav () {
    return (
        <div className="bg-red-600 p-2 text-white text-3xl flex justify-between flex-wrap">
            <h1 className="text-4xl">Chaotic Final</h1>
            <nav className="w-72 flex justify-between mr-8">
                <Link href="/">Teams</Link>
                <Link href="/loadout">Loadouts</Link>
            </nav>
            <hr className="w-full"/>
        </div>
    );
};