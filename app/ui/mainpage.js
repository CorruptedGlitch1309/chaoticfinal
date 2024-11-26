'use client';
import Image from "next/image";
import React from "react";

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

function selectAll() {
  players.forEach(({id}) => document.getElementById(id).checked = document.getElementById("select-all").checked);
};


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
  setPlayers([...players, {
    name,
    id: name.toLowerCase().replace(" ", "")
  }]);
  document.getElementById("new-player").value = "";
};

function deleteSelected() {
  setPlayers(players.filter((player) => !document.getElementById(player.id).checked))
};

  return (
    <div className="bg-customgray w-11/12 max-w-screen-lg min-h-screen h-2xl m-auto p-5">
      <main>
        <h2 className="text-2xl mb-4">Team Randomizer</h2>
        <form>
          <div>
            <label htmlFor="teamQuantity">Teams:</label>
            <select className="bg-gray-500 mr-3" id="teamQuantity">
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <label htmlFor="select-all">Select All:</label>
            <input onChange={selectAll} className="w-4 h-4 mr-2" id="select-all" type="checkbox" name="select-all" />
            <button
            className="bg-red-600 p-0.5 mr-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              randomize();
            }}
            >Randomize</button>
            <button
            className="bg-red-600 p-0.5 rounded"
            onClick={(e) => {
              e.preventDefault();
              deleteSelected();
            }}
            >Delete Selected</button>
          </div>

          <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {generatePlayers(players, true)}

            <div className="flex bg-gray-700 w-56 rounded-full">
              <Image
              src="/user.png"
              height={50}
              width={50}
              alt=""
              className="rounded-full mr-2"
              />
              <div className="flex justify-between w-8/12">
                <input placeholder="New Player" id="new-player" type="text" className="w-10/12 h-full bg-gray-700 text-xl" />
                <button
                className="text-2xl bg-gray-300 rounded-full my-2 w-5 text-gray-600"
                onClick={(e) => {
                  e.preventDefault();
                  createPlayer(document.getElementById("new-player").value);
                }}>+</button>
              </div>
            </div>

            <hr className="mx-4 w-full"/>

            <div id="teams" className="flex flex-wrap gap-3">
              {teamState[0]}
              {teamState[1]}
              {teamState[2]}
              {teamState[3]}
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}
