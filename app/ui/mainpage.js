'use client';
import Image from "next/image";
import React from "react";
import TeamNumberSelector from "./player_randomizer/teamnumber";
import SelectAll from "./player_randomizer/selectall";
import CreatePlayer from "./player_randomizer/CreatePlayer";
import Buttons from "./player_randomizer/buttons";

const generatePlayers = (array, input) => [...array].map(({name, id}) => {
  localStorage.setItem("RandomizerPlayers", JSON.stringify(array));
  return (
    <div className="flex bg-gray-600 w-56 rounded-full" key={id}>
          <Image
          src="/user.png"
          height={50}
          width={50}
          alt=""
          className="rounded-full mr-2"
          />
          <div className="flex justify-between w-8/12">
            <label htmlFor={id} className="text-xl mt-3">{name}</label>
            <input id={id} type="checkbox" value={id} className={"w-5 h-5 mt-3 ml-1 " + input ? "" : "hidden"} />
          </div>
      </div>
  )
});

export default function MainPage() {
const [teamState, setTeam] = React.useState([[], [], [], []]);
const [players, setPlayers] = React.useState(JSON.parse(localStorage.getItem("RandomizerPlayers")) || []);


function randomize () {
  const currentPlayers = [...players].map((object) => {
    if (document.getElementById(object.id).checked == true) return object;
  }).filter((player) => player);

  const randomPlayers = generatePlayers(currentPlayers, false).sort(() => 0.5 - Math.random());
  const teamNumber = document.getElementById("teamQuantity").value;

  if (currentPlayers.length < teamNumber) return alert("Not enough players!");

 let teamHtml = [ [], [], [], [] ];

  let loops = 0;
  randomPlayers.forEach((player) => {
    teamHtml[loops].unshift(player);
    loops++;
    if (loops == teamNumber) loops = 0;
  });

 teamHtml.forEach((team, index) => team.unshift( team.length > 0 ? <h2 className="text-2xl w-full" key={index}>Team {index + 1}</h2> : "" ));

  setTeam([ ...teamHtml ]);
}

function createPlayer (name) {
  if (name == "") return alert("Please enter a name.");
  if (players.some((player) => player.name == name)) return alert("Player already exists.");
  document.getElementById("new-player").value = "";

  setPlayers([...players, {
    name,
    id: name.toLowerCase().replace(" ", "")
  }]);
};

function deleteSelected() {
  if (confirm("Are you sure? This cannot be undone.")) setPlayers(players.filter((player) => !document.getElementById(player.id).checked));
};

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
              randomize();
            }}
            deleteAction={(e) => {
              e.preventDefault();
              deleteSelected();
            }} />
          </div>

          <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {generatePlayers(players, true)}

            <CreatePlayer onClick={(e) => {
                  e.preventDefault();
                  createPlayer(document.getElementById("new-player").value);
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
