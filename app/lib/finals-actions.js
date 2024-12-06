import Image from "next/image";
import { getSelected } from "./actions";

const gameClasses = [
    "light",
    "medium",
    "heavy"
]

export const lightWeapons = [
    "93R",
    "Dagger",
    "LH1",
    "M11",
    "M26",
    "Recurve_Bow",
    "SH1900",
    "SR-84",
    "Sword",
    "Throwing_Knives",
    "V95",
    "XP-54",
];

export const mediumWeapons = [
    "AKM",
    "CL-40",
    "Dual_Blades",
    "Famas",
    "Fcar",
    "Model_1887",
    "Pike-556",
    "R.357",
    "Riot_Shield",
];

export const heavyWeapons = [
    "50_Akimbo",
    "Flamethrower",
    "KS-23",
    "Lewis",
    "M60",
    "MGL32",
    "SA1216",
    "Sledgehammer",
    "Spear",
];

export function generateWeapons (weapons, gameClass) {

    function select(button) {
        const testFor = (target, text) => target.classList.value.includes(text);
        const target = testFor(button, "weapon-button") ? button : button.parentElement;
        if (!testFor(target, "weapon-button")) return;
        const select = [ "weapon-selected" ];
        const unselect = [ "weapon-unselect" ];
        const isSelected = testFor(target, "weapon-selected");
    
        (!isSelected ? select : unselect).forEach((text) => target.classList.add(text));
        (isSelected ? select : unselect).forEach((text) => target.classList.remove(text));
      }

    return [...weapons].map((weapon) => (
        <button
        key={weapon}
        id={weapon}
        className="w-1/6 mx-auto bg-transparent weapon-button weapon-selected"
        onClick={(e) => {
            e.preventDefault();
            select(e.target);
        }}
        >
            <Image
            height={300}
            width={300}
            src={`/${gameClass}/${weapon}.png`}
            alt=""
            className="rounded-t-md relative"
          />
          <span
          className="w-full bg-red-600 text-white block text-center rounded-b-md text-nowrap"
          >{weapon.replace("_", " ")}</span>
        </button>
    ))
};

export function randomizeLoadout () {
    const players = getSelected();

    function getClasses () {
        let array = [];
        gameClasses.forEach(
            (type) => document.getElementById(`${type}-checkbox`).checked ? array.unshift(type) : array
        );
        return array;
    };

    function getSelectedWeapons (type) {
        return [...document.getElementById(`weapons-container-${type}`).children].map(
            (element) => element.classList.value.includes("weapon-selected") ? element.id : false
        ).filter((item) => item)
    };

    const listOfClasses = getClasses();

    const lightSelected = getSelectedWeapons("light");
    const mediumSelected = getSelectedWeapons("medium");
    const heavySelected = getSelectedWeapons("heavy");

    return [...players].map((player) => {
        const type = listOfClasses[Math.floor(Math.random() * listOfClasses.length)];
        const weaponList =
        (type == "heavy" ? heavySelected :
        type == "medium" ? mediumSelected :
        lightSelected).sort(() => 0.5 - Math.random());

        return {
            name: player,
            type,
            weapon: weaponList[Math.floor(Math.random() * weaponList.length)]
        }
    })
};

export function loadoutCards (info) {
    const filler = [
        (<div key="filler1" className="w-1/6 mx-auto filler" />),
        (<div key="filler2"  className="w-1/6 mx-auto filler" />),
        (<div key="filler3"  className="w-1/6 mx-auto filler" />),
        (<div key="filler4"  className="w-1/6 mx-auto filler" />),
        (<div key="filler5"  className="w-1/6 mx-auto filler" />),
        (<div key="filler6"  className="w-1/6 mx-auto filler" />),
    ];

    return [...[...info].map(({ name, weapon, type }) => {
        return (
            <div
            key={`${name}${weapon}`}
            id={`${name}${weapon}`}
            className="w-1/6 mx-auto border-4 border-red-600 rounded-md"
            >
            <span
              className="text-xl w-full bg-red-600 text-white block text-center text-nowrap"
              >{name}</span>
                <Image
                height={300}
                width={300}
                src={`/${type}/${weapon}.png`}
                alt=""
              />
              <p
              className="text-lg w-full bg-red-600 text-white block text-center text-nowrap"
              >{`${type.charAt(0).toUpperCase()}${type.substring(1)}`}</p>
              <p
              className="w-full bg-red-600 text-white block text-center text-nowrap"
              >{weapon.replace("_", " ")}</p>
            </div>
        )
    }), ...filler]
}