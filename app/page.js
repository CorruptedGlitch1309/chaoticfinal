'use client';
import React, { Suspense } from "react";
import TeamNumberSelector from "./ui/player_randomizer/teamnumber";
import SelectAll from "./ui/player_randomizer/selectall";
import Buttons from "./ui/player_randomizer/buttons";
import CreatePlayer from "./ui/player_randomizer/createplayer";
import { deleteSelected, createPlayer, randomize, generatePlayers, getStorage, getSelected, playerRoute, addTeamName } from "./lib/actions";
import { useSearchParams, useRouter, usePathname } from "next/navigation";


export default function page() {
const [players, setPlayers] = React.useState(getStorage() || []);
const [loaded, setLoaded] = React.useState(false);
const [selectedParams, setSelectedParams] = React.useState([]);

const router = useRouter();
const searchParams = useSearchParams();
const pathname = usePathname();

function getSelectedParams () {
  return JSON.parse(searchParams.get("selected") ? searchParams.get("selected") : "[]");
};

React.useEffect(() => {
  setLoaded(true);
  setSelectedParams(getSelectedParams());
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
              setSelectedParams(randomized);
            }}
            deleteAction={(e) => {
              e.preventDefault();
              setPlayers(deleteSelected(players));
            }} />
          </div>

          <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {loaded ? generatePlayers(players, players, true) : <h2 className="text-2xl text-center w-full">Loading</h2>}

            <CreatePlayer onClick={(e) => {
                  e.preventDefault();
                  setPlayers(createPlayer(document.getElementById("new-player").value, players));
            }} />

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