'use client';
import React, { Suspense } from "react";
import TeamNumberSelector from "./ui/player_randomizer/teamnumber";
import SelectAll from "./ui/player_randomizer/selectall";
import Buttons from "./ui/player_randomizer/buttons";
import CreatePlayer from "./ui/player_randomizer/createplayer";
import { deleteSelected, createPlayer, randomize, generatePlayers, getStorage, getSelected, playerRoute, addTeamName, createBlankPlayer } from "./lib/actions";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { setPlayers, setNewPlayers, setSelectedParams, setLoaded } from "./lib/redux/hooks";

export default function page() {
const players = useSelector((state) => state.players);
const newPlayers = useSelector((state) => state.newPlayers);
const selectedParams = useSelector((state) => state.selectedParams);
const loaded = useSelector((state) => state.loaded);
const dispatch = useDispatch();

const router = useRouter();
const searchParams = useSearchParams();
const pathname = usePathname();

function getSelectedParams () {
  return JSON.parse(searchParams.get("selected") ? searchParams.get("selected") : "[]");
};

React.useEffect(() => {
  dispatch(setLoaded());
  dispatch(setSelectedParams(getSelectedParams()));
}, []);

  return (
    <div>
      <div className="bg-customgray w-11/12 max-w-screen-lg min-h-screen h-2xl m-auto p-5">
      <main>
        <h2 className="text-2xl mb-4">Team Randomizer</h2>
        <div>
          <div>
            <TeamNumberSelector />
            <SelectAll players={players} />
            <Buttons
            randomAction={(e) => {
              e.preventDefault();
              const randomized = randomize(getSelected(players), document.getElementById("teamQuantity").value);
              router.push(getSelected(players).length > 0 ? pathname + '?' + playerRoute(randomized, document.getElementById("teamQuantity").value, searchParams) : pathname);
              dispatch(setSelectedParams(randomized));
            }}
            deleteAction={(e) => {
              e.preventDefault();
              dispatch(setPlayers(deleteSelected(players)));
            }}
            createAction={(e) => {
              e.preventDefault();
              dispatch(setNewPlayers(createBlankPlayer(newPlayers)));
            }} />
          </div>

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
        </div>
      </main>
    </div>
    </div>
  );
}