'use client';
import Image from "next/image";
import React from "react";


const players = [
  {
    name: "Casual",
    image: "/casual.png",
    skill: 3,
  },
  {
    name: "Seven",
    image: "/sector.png",
    skill: 8,
  },
  {
    name: "Alpha",
    image: "/alpha.png",
    skill: 3,
  },
  {
    name: "Ace",
    image: "/ace.png",
    skill: 3,
  },
  {
    name: "Echo",
    image: "/echo.png",
    skill: 2,
  },
  {
    name: "Glitch",
    image: "/glitch.png",
    skill: 6,
  },
  {
    name: "Kim",
    image: "/kim.png",
    skill: 5,
  },
  {
    name: "One",
    image: "/one.png",
    skill: 10,
  }
]

function generatePlayers (array, input) {
  const html = [...array].map(({name, image}) => {
    return (
      <div className="flex bg-gray-600 w-44 rounded-full" key={name}>
            <Image
            src={image}
            height={50}
            width={50}
            alt=""
            className="rounded-full mr-2"
            />
            <div className="flex justify-between w-7/12">
              <label htmlFor={name} className="text-2xl mt-2">{name}</label>
              <input id={name} type="checkbox" value={name} className={"w-5 h-5 mt-3 ml-1 " + input ? "" : "hidden"} />
            </div>
        </div>
    )
  });
  return html;
}


export default function Home() {
const [team1, setTeam1] = React.useState((<div/>));
const [team2, setTeam2] = React.useState((<div/>));
const [team3, setTeam3] = React.useState((<div/>));
const [team4, setTeam4] = React.useState((<div/>));
const [teamNumber, setTeamNumber] = React.useState(0);


function randomize () {
  const currentPlayers = [...players].map(({name}) => {
    if (document.getElementById(name).checked == true) {
      return name;
    };
  }).filter((name) => name ? name : false);
  const teamNumber = document.getElementById("teamQuantity").value;
  console.log(teamNumber);
  if (currentPlayers.length < teamNumber) {
    alert("Not enough players!");
    return;
  }

  const teams = [
    [],
    [],
    [],
    []
  ]

  const randomPlayers = currentPlayers.sort(() => 0.5 - Math.random());

  let loops = 0;
  randomPlayers.forEach((player) => {
    teams[loops].unshift(player);
    loops++;
    if (loops == teamNumber) {
      loops = 0;
    };
  });

  let teamHtml = [
    [],
    [],
    [],
    []
  ]

  teams.forEach((team, index) => {
    team.forEach((player) => {
      players.forEach((object) => {
        if (object.name == player) {
          teamHtml[index].unshift(object);
        };
      });
    });
  });

  setTeam1(generatePlayers(teamHtml[0], false));
  setTeam2(generatePlayers(teamHtml[1], false));
  setTeam3(generatePlayers(teamHtml[2], false));
  setTeam4(generatePlayers(teamHtml[3], false));
  setTeamNumber(teamNumber);
}

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
            <label htmlFor="skillcheck">Skill Check:</label>
            <input className="w-4 h-4 mr-2" id="skillcheck" type="checkbox" name="skillcheck" disabled />
            <button
            className="bg-red-600 p-0.5 rounded"
            onClick={(e) => {
              e.preventDefault();
              randomize();
            }}
            >Randomize</button>
          </div>

          <div className="bg-gray-500 p-3 mt-3 rounded-md flex flex-wrap gap-3">
            {generatePlayers(players, true)}
            <hr className="mx-4 w-full"/>
            <div id="teams" className="flex flex-wrap gap-3">
              <h2 className={teamNumber >= 2 ? "text-2xl w-full" : "hidden"}>Team One</h2>
              {team1}
              <h2 className={"" + teamNumber >= 2 ? "text-2xl w-full" : "hidden"}>Team Two</h2>
              {team2}
              <h2 className={"" + teamNumber >= 3 ? "text-2xl w-full" : "hidden"}>Team Three</h2>
              {team3}
              <h2 className={"" + teamNumber >= 4 ? "text-2xl w-full" : "hidden"}>Team Four</h2>
              {team4}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
