'use client';
import Image from "next/image";
import React from "react";
import TeamNumberSelector from "./ui/player_randomizer/teamnumber";
import SelectAll from "./ui/player_randomizer/selectall";
import Buttons from "./ui/player_randomizer/buttons";
import CreatePlayer from "./ui/player_randomizer/createplayer";
import { deleteSelected, createPlayer, randomize, generatePlayers } from "./lib/actions";

function getStorage() {
    return JSON.parse(localStorage.getItem("RandomizerPlayers"))
}

export default function page() {
const [teamState, setTeam] = React.useState([[], [], [], []]);
const [players, setPlayers] = React.useState([]);

React.useEffect(() => {
  setPlayers(getStorage());
}, []);

  return (
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
              setPlayers(randomize(players));
            }}
            deleteAction={(e) => {
              e.preventDefault();
              setPlayers(deleteSelected(players));
            }} />
          </div>

          <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {generatePlayers(players, true)}

            <CreatePlayer onClick={(e) => {
                  e.preventDefault();
                  setPlayers(createPlayer(document.getElementById("new-player").value, players));
            }} />

            <hr className="mx-4 w-full"/>

            <div id="teams" className="flex flex-wrap gap-3">
              {...teamState}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}