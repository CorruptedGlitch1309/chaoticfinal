import Image from "next/image";
import CreatePlayer from "../ui/player_randomizer/createplayer";

function setStorage(array) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("RandomizerPlayers", JSON.stringify(array));
  };
};

export function getStorage() {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem("RandomizerPlayers"));
  } else return [];
};

export function deleteSelected(players) {
    if (confirm("Are you sure? This cannot be undone.")) {
      const deletedPlayers = players.filter((player) => !document.getElementById(player.id).checked)
      setStorage(deletedPlayers);
      if (deletedPlayers.length === 0) document.getElementById("select-all").checked = false;
      return deletedPlayers;
    };
    return players;
};

export function createPlayer (button, players, newPlayers, key) {
  const input = button.parentElement.querySelector(".create-player");
  const name = input.value;
    if (name == "") {
      alert("Please enter a name.");
      return { stateNewPlayers: newPlayers, statePlayers: players};
    };
    if (players.some((player) => player.id == name.toLowerCase().replace(" ", ""))) {
      alert("Player already exists.");
      return { stateNewPlayers: newPlayers, statePlayers: players};
    };
  
    return {
      stateNewPlayers: newPlayers.filter((player) => player != key),
      statePlayers: [...players, {
        name,
        id: name.toLowerCase().replace(" ", "")
      }]
    }
};

export function getSelected (players) {
    return [...players].map((object) => {
      if (document.getElementById(object.id).checked == true) return object;
    }).filter((player) => player);
};

export function randomize (players, teamNumber) {
  const randomized = players.sort(() => 0.5 - Math.random());

  const teams = [ [], [], [], [] ]

  let loops = 0;
  randomized.forEach((player) => {
    teams[loops].unshift(player);
    loops++;
    if (loops == teamNumber) loops = 0;
  });

  return teams;
};

export const generatePlayers = (players, array, input) => {
  if (array == {}) return array;
  setStorage(players);
  return [...array].map(({name, id}) => {
  
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
              {input ? <input id={id} type="checkbox" value={id} className="w-3 h-3 mt-5 ml-1"/> : <></>}
            </div>
        </div>
    )
  })
};

export function playerRoute(players, teamNumber, searchParams) {
  const params = new URLSearchParams(searchParams.toString);
  params.set("selected", JSON.stringify(players));
  return params.toString();
};

export function addTeamName (team, index) {
  team.unshift( team.length > 0 ? <h2 className="text-2xl w-full" key={"team-name" + index}>Team {index + 1}</h2> : "" );
  return team;
}

export function createBlankPlayer (newPlayers) {
  const key = new Date().getTime().toString()
  return [...newPlayers, key]
}