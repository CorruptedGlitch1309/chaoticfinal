import Link from "next/link";


export default function Nav (props) {
    return (
        <div className="bg-red-600 p-2 text-white text-3xl flex justify-between flex-wrap">
            <h1 className="text-4xl">Chaotic Final</h1>
            <nav className="w-96 flex justify-between mr-8">

                <Link href="/randomizer">Team Generator</Link>

                <Link href={{
                    pathname: "/randomizer/loadout",
                    query: {
                    players: props.players
                }}}
              >Loadouts</Link>

            </nav>
            <hr className="w-full"/>
        </div>
    );
};