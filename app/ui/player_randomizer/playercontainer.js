import { useSelector } from "react-redux";
import { generatePlayers } from "@/app/lib/actions";
import TypeSelect from "./typeselect";
import NewPlayers from "./newplayers";
import TeamsContainer from "./teamscontainer";
import LoadoutContainer from "../finals-loadout/loadoutcontainer";

export default function PlayerContainer () {
    const players = useSelector((state) => state.players);
    const randomizerType = useSelector((state) => state.randomizerType);
    const loaded = useSelector((state) => state.loaded);

    function generateContainer (type) {
        if (type == "team-randomizer") return <TeamsContainer />
        if (type == "finals-loadout") return <LoadoutContainer />
    };

    return (
        <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {loaded ? <>{generatePlayers(players, players, true)} <NewPlayers /></> : <h2 className="text-2xl text-center w-full">Loading</h2>}

            <hr className="mx-4 w-full"/>

            <TypeSelect />

            <hr className="mx-4 w-full"/>

            {generateContainer(randomizerType)}

          </div>
    )
}