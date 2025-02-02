"use client";
import { useState } from "react";
import { buttonStyle } from "../styles/elements";

export const About = () => {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <button
        className="text-3xl mr-8 hover:underline hover:italic"
        onClick={(e) => {
          e.preventDefault();
          setGuideOpen(!guideOpen);
        }}
      >
        About
      </button>
      <dialog
        className="absolute top-24 bg-gray-200 min-w-1/2 max-w-screen-sm mx-auto rounded-b-lg rounded-t-xl text-black border border-black text-xl"
        open={guideOpen}
      >
        <h3 className="text-center text-2xl text-white w-full bg-red-600 rounded-t-lg">
          Guide
        </h3>
        <div className="px-4 py-4">
          <p className="indent-3">
            Welcome to chaotic final! Here is a short guide on how to use the
            randomizer.
          </p>
          <p className="indent-3 mt-4">
            To use the randomizer, first create a list of players using the "Add
            Player" button. Once you've created your list, click on a player to
            select them. Choose between team or loadout randomizer, modify the
            settings, and click randomize!
          </p>
          <p className="indent-3 mt-4">
            "Toggle All" can be used to quickly select and deselect players.
          </p>
          <p className="indent-3 mt-4">
            Loadouts and teams can be shared and saved by copying the link.
          </p>
          <p className="indent-3 mt-4">
            In the loadout creator you can toggle classes, weapons, gadgets, and
            specializations.
          </p>
        </div>
        <div className="flex w-full justify-end">
          <button
            className={"text-lg text-white px-1 rounded-lg m-2" + buttonStyle}
            onClick={(e) => {
              e.preventDefault();
              setGuideOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default About;
