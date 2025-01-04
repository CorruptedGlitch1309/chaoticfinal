'use client';
import React from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedParams, setLoaded, setLoadoutParams, setType } from "./lib/redux/hooks";
import Inputs from "./ui/player_randomizer/inputs";
import PlayerContainer from "./ui/player_randomizer/playercontainer";

export default function page() {
const [guideOpen, setGuideOpen] = React.useState(false);

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

        <div className="text-2xl mb-3 flex">
          <h2>Player List</h2>
          <button
          className="bg-gray-200 w-7 h-7 border-2 border-black rounded-md ml-2 text-black text-xl"
          onClick={(e) => {
            e.preventDefault();
            setGuideOpen(!guideOpen);
          }}>?</button>
        </div>

        <dialog className="bg-gray-200 min-w-1/2 max-w-screen-sm mx-auto rounded-b-lg rounded-t-xl text-black border border-black" open={guideOpen}>
          <h3 className="text-center text-xl w-full bg-gray-400 rounded-t-lg">Guide</h3>
          <div className="px-2 py-4">
            <p
            className="indent-3"
            >To use the randomizer, first create a list of players using the "Add Player" button. Once you've created your list, click on a player to select them. Choose between team or loadout randomizer, modify the settings, and click randomize!</p>
            <p className="indent-3 mt-4">"Toggle All" can be used to quickly select and deselect players.</p>
            <p className="indent-3 mt-4">Loadouts and teams can be shared and saved by copying the link.</p>
            <p className="indent-3 mt-4">In the loadout creator you can toggle classes, weapons, gadgets, and specializations.</p>
          </div>
          <div className="flex w-full justify-end">
          <button className="bg-red-600 text-lg text-white px-1 rounded-lg m-2"
          onClick={(e) => {
            e.preventDefault();
            setGuideOpen(false);
          }}>Close</button>
          </div>
        </dialog>

        <div>
          <Inputs />
          <PlayerContainer />
        </div>

      </main>
    </div>
    </div>
  );
}