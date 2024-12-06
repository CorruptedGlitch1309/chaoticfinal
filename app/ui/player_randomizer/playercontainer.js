import { useDispatch, useSelector } from "react-redux";
import { generatePlayers, createPlayer, generateControls } from "@/app/lib/actions";
import { setNewPlayers, setPlayers, setType } from "@/app/lib/redux/hooks";
import CreatePlayer from "./createplayer";
import TeamsContainer from "./teamscontainer";
import LoadoutContainer from "../finals-loadout/loadoutcontainer";

export default function PlayerContainer () {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const newPlayers = useSelector((state) => state.newPlayers);
    const randomizerType = useSelector((state) => state.randomizerType);
    const loaded = useSelector((state) => state.loaded);


    return (
        <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {loaded ? generatePlayers(players, players, true) : <h2 className="text-2xl text-center w-full">Loading</h2>}

            {loaded ? newPlayers == [] ? <></> : [...newPlayers].map((player) => {
              return (
                <CreatePlayer onClick={(e) => {
                  e.preventDefault();
                  const { stateNewPlayers, statePlayers } = createPlayer(e.target, players, newPlayers, player);
                  dispatch(setNewPlayers(stateNewPlayers));
                  dispatch(setPlayers(statePlayers));
                }}
                key={player}/>
              )
            }) : <></>}

            <hr className="mx-4 w-full"/>

            <div className="min-w-96 w-11/12 min-h-24 mx-auto p-2 bg-gray-600 rounded-md">
              <select
              className="bg-gray-600 text-2xl mx-auto block text-center"
              id="type-select"
              value={randomizerType}
              onChange={() => dispatch(setType(document.getElementById("type-select").value))}>
                <option value="team-randomizer">Team Randomizer</option>
                <option value="finals-loadout">Finals Loadout Generator</option>
              </select>
              <hr className="my-2 w-full"/>

              {generateControls(randomizerType)}

            </div>

            <hr className="mx-4 w-full"/>

            {randomizerType == "team-randomizer" ? <TeamsContainer /> :
             randomizerType == "finals-loadout" ? <LoadoutContainer /> : <></>}

          </div>
    )
}