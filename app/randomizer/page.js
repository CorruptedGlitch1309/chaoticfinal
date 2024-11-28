'use client';
import Image from "next/image";
import Nav from "../ui/nav";
import React from "react";
import TeamNumberSelector from "../ui/player_randomizer/teamnumber";
import SelectAll from "../ui/player_randomizer/selectall";
import Buttons from "../ui/player_randomizer/buttons";
import CreatePlayer from "../ui/player_randomizer/createplayer";
import { deleteSelected, createPlayer, randomize, generatePlayers, getStorage } from "../lib/actions";
import Link from "next/link";

export default function page() {
const [teamState, setTeam] = React.useState([[], [], [], []]);
const [players, setPlayers] = React.useState(getStorage() || []);
const [loaded, setLoaded] = React.useState(false);
const stringPlayers = JSON.stringify(players);

React.useEffect(() => {
  setLoaded(true);
}, []);



  return (
    <div>
      <Nav players={loaded ? stringPlayers : []} />

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
              setTeam(randomize(players));
            }}
            deleteAction={(e) => {
              e.preventDefault();
              setPlayers(deleteSelected(players));
            }} />
          </div>

          <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {loaded ? generatePlayers(players, true) : <h2 className="text-2xl text-center w-full">Loading</h2>}

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
    </div>
  );
}