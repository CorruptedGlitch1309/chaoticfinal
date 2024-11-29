import Image from "next/image";

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
    if (confirm("Are you sure? This cannot be undone.")) return players.filter((player) => !document.getElementById(player.id).checked);
    setStorage(players);
    return players;
};

export function createPlayer (name, players) {
    if (name == "") {
      alert("Please enter a name.");
      return players;
    };
    if (players.some((player) => player.id == name.toLowerCase().replace(" ", ""))) {
      alert("Player already exists.");
      return players;
    };
    document.getElementById("new-player").value = "";
  
    return [...players, {
        name,
        id: name.toLowerCase().replace(" ", "")
      }]
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

  export const generatePlayers = (players, array, input) => [...array].map(({name, id}) => {
    setStorage(players);

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

  export function playerRoute(players, teamNumber, searchParams) {
    const params = new URLSearchParams(searchParams.toString);
    params.set("selected", JSON.stringify(players));
    params.set("teamNumber", JSON.stringify(teamNumber));
    params.set("info", "true");
    return params.toString();
  };

  export function addTeamName (team, index) {
    team.unshift( team.length > 0 ? <h2 className="text-2xl w-full" key={index}>Team {index + 1}</h2> : "" );
    return team;
  }