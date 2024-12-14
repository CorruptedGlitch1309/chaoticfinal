'use client';
import React from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedParams, setLoaded, setLoadoutParams, setType } from "./lib/redux/hooks";
import Inputs from "./ui/player_randomizer/inputs";
import PlayerContainer from "./ui/player_randomizer/playercontainer";

export default function page() {
const dispatch = useDispatch();
const searchParams = useSearchParams();

const getSelectedParams = () => JSON.parse(searchParams.get("selected") ? searchParams.get("selected") : "[[]]");
const getLoadoutParams = () => JSON.parse(searchParams.get("loadouts") ? searchParams.get("loadouts") : "[]");
const getRandomizerParams = () => searchParams.get("randomizerType") ? searchParams.get("randomizerType") : "team-randomizer";

React.useEffect(() => {
  dispatch(setLoaded());
  dispatch(setSelectedParams(getSelectedParams()));
  dispatch(setType(getRandomizerParams()));
  dispatch(setLoadoutParams(getLoadoutParams()));
}, []);

  return (
    <div>
      <div className="bg-customgray w-11/12 max-w-screen-lg min-h-screen h-2xl m-auto p-5">
      <main>
        <h2 className="text-2xl mb-3">Player List</h2>
        <div>
          <Inputs />
          <PlayerContainer />
        </div>
      </main>
    </div>
    </div>
  );
}