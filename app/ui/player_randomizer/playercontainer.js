import { useDispatch, useSelector } from "react-redux";
import { generatePlayers, createPlayer, addTeamName } from "@/app/lib/actions";
import { setNewPlayers, setPlayers } from "@/app/lib/redux/hooks";
import CreatePlayer from "./createplayer";

export default function PlayerContainer () {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const newPlayers = useSelector((state) => state.newPlayers);
    const selectedParams = useSelector((state) => state.selectedParams);
    const loaded = useSelector((state) => state.loaded);


    return (
        <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {loaded ? generatePlayers(players, players, true) : <h2 className="text-2xl text-center w-full">Loading</h2>}

            {newPlayers == [] ? <></> : [...newPlayers].map((player) => {
              return (
                <CreatePlayer onClick={(e) => {
                  e.preventDefault();
                  const { stateNewPlayers, statePlayers } = createPlayer(e.target, players, newPlayers, player);
                  dispatch(setNewPlayers(stateNewPlayers));
                  dispatch(setPlayers(statePlayers));
                }}
                key={player}/>
              )
            })}

            <hr className="mx-4 w-full"/>

            <div id="teams" className="flex flex-wrap gap-3">
              {[...selectedParams].map((team, index) => addTeamName(generatePlayers(players, team, false), index))}
            </div>

          </div>
    )
}