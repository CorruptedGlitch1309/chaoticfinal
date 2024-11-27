import Image from "next/image";

export function deleteSelected(players) {
    if (confirm("Are you sure? This cannot be undone.")) return players.filter((player) => !document.getElementById(player.id).checked);
    return players;
};

export function createPlayer (name, players) {
    if (name == "") return alert("Please enter a name.");
    if (players.some((player) => player.name == name)) return alert("Player already exists.");
    document.getElementById("new-player").value = "";
  
    return [...players, {
        name,
        id: name.toLowerCase().replace(" ", "")
      }]
  };

  export function randomize (players) {
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
  
    return [ ...teamHtml ];
  };

function setStorage(array) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("RandomizerPlayers", JSON.stringify(array));
    };
  }

  export const generatePlayers = (array, input) => [...array].map(({name, id}) => {
    setStorage(array);

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