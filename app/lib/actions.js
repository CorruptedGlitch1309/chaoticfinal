import Image from "next/image";
import CreatePlayer from "../ui/player_randomizer/createplayer";

function setStorage(array) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("RandomizerPlayers2", JSON.stringify(array));
  };
};

export function getStorage() {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem("RandomizerPlayers2"));
  } else return [];
};

export function deleteSelected(players) {
    if (confirm("Are you sure? This cannot be undone.")) {
      const deletedPlayers = players.filter((player) => !document.getElementById(player.toLowerCase().replace(" ", "")).checked)
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
    if (players.some((player) => player == name)) {
      alert("Player already exists.");
      return { stateNewPlayers: newPlayers, statePlayers: players};
    };
  
    return {
      stateNewPlayers: newPlayers.filter((player) => player != key),
      statePlayers: [...players, name]
    }
};

export const getSelected = (players) => [...document.querySelectorAll(".selected")].map((element) => element.lastChild.textContent);

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
  setStorage(players);

  function select(button) {
    const testFor = (target, text) => target.classList.value.includes(text);
    const target = testFor(button, "player-button") ? button : button.parentElement;
    if (!testFor(target, "player-button")) return;
    const select = [ "selected", "bg-gray-400" ];
    const unselect = [ "unselect", "bg-gray-600" ];
    const isSelected = testFor(target, "selected");

    (!isSelected ? select : unselect).forEach((text) => target.classList.add(text));
    (isSelected ? select : unselect).forEach((text) => target.classList.remove(text));
  }

  const html = (name) => <>
          <Image
            src="/user.png"
            height={50}
            width={50}
            alt=""
            className="rounded-full mr-2"
          />
          <div className="flex justify-between w-8/12 text-xl mt-3">{name}</div>
  </>

  return [...array].map((name) => {
    const id = name.toLowerCase().replace(" ", "");
  
    return input ? (
      <button
      className="flex bg-gray-600 w-56 rounded-full player-button unselect"
      key={id}
      id={id}
      onClick={(e) => select(e.target)}
      >{html(name)}</button>
    )
    : (
      <div
      className="flex bg-gray-600 w-56 rounded-full player-button unselect"
      key={id}
      >{html(name)}</div>
    );
  });
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