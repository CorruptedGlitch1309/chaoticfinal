import Image from "next/image";
import { getSelected } from "./actions";

const gameClasses = [
    "light",
    "medium",
    "heavy"
];

const universalGadgets = [
    "Flashbang",
    "Frag_Grenade",
    "Gas_Grenade",
    "Goo_Grenade",
    "Pyro_Grenade",
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

export const lightGadgets = [
    "Breach_Charge",
    "Gateway",
    "Glitch_Grenade",
    "Smoke_Grenade",
    "Thermal_Vision",
    "Tracking_Dart",
    "Vanishing_Bomb",
    ...universalGadgets
];

export const lightSpecializations = [
    "Cloaking_Device",
    "Evasive_Dash",
    "Gappling_Hook",
]

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

export const mediumGadgets = [
    "APS_Turret",
    "Defibrillator",
    "Explosive_Mine",
    "Gas_Mine",
    "Glitch_Trap",
    "Jump_Pad",
    "Zipline",
    ...universalGadgets
];

export const mediumSpecializations = [
    "Dematerializer",
    "Guardian_Turret",
    "Healing_Beam",
]

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

export const heavyGadgets = [
    "Anti-Gravity_Cube",
    "Barricade",
    "C4",
    "Dome_Shield",
    "Explosive_Mine",
    "Motion_Sensor",
    "Pyro_Mine",
    "RPG-7",
    ...universalGadgets
];

export const heavySpecializations = [
    "Charge_N_Slam",
    "Goo_Gun",
    "Mesh_Shield",
    "Winch_Claw",
];

export function generateWeapons (weapons, gameClass, type) {
    function select(button) {
        const testFor = (target, text) => target.classList.value.includes(text);
        const target = testFor(button, "weapon-button") ? button : button.parentElement;
        if (!testFor(target, "weapon-button")) return;
        const select = [ "weapon-selected" ];
        const unselect = [ "weapon-unselect" ];
        const isSelected = testFor(target, "weapon-selected");

        if (
            isSelected &&
            document.getElementById(`${type}-container-${gameClass}`).querySelectorAll(".weapon-selected")
            .length <= 1
        ) return;
    
        (!isSelected ? select : unselect).forEach((text) => target.classList.add(text));
        (isSelected ? select : unselect).forEach((text) => target.classList.remove(text));
      }

      function getURLPiece (type) {
        if (type == "gadgets") return "gadgets/";
        if (type == "specs") return "specializations/";
        return "";
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
            src={`/${gameClass}/${getURLPiece(type)}${weapon}.png`}
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
    if (players.length == 0) {
        alert("Select a player");
        return [];
    }

    function getClasses () {
        let array = [];
        gameClasses.forEach(
            (type) => document.getElementById(`${type}-checkbox`).checked ? array.unshift(type) : array
        );
        return array.length == 0 ? gameClasses : array;
    };

    function getSelectedWeapons (type) {
        return [...document.getElementById(`weapons-container-${type}`).children].map(
            (element) => element.classList.value.includes("weapon-selected") ? element.id : false
        ).filter((item) => item)
    };

    function getSelectedGadgets (type) {
        return [...document.getElementById(`gadgets-container-${type}`).children].map(
            (element) => element.classList.value.includes("weapon-selected") ? element.id : false
        ).filter((item) => item)
    };

    function getSelectedSpecs (type) {
        return [...document.getElementById(`specs-container-${type}`).children].map(
            (element) => element.classList.value.includes("weapon-selected") ? element.id : false
        ).filter((item) => item)
    };

    const listOfClasses = getClasses();

    const lightSelectedWeapons = getSelectedWeapons("light");
    const mediumSelectedWeapons = getSelectedWeapons("medium");
    const heavySelectedWeapons = getSelectedWeapons("heavy");

    const lightSelectedGadgets = getSelectedGadgets("light");
    const mediumSelectedGadgets = getSelectedGadgets("medium");
    const heavySelectedGadgets = getSelectedGadgets("heavy");

    const lightSelectedSpecs = getSelectedSpecs("light");
    const mediumSelectedSpecs = getSelectedSpecs("medium");
    const heavySelectedSpecs = getSelectedSpecs("heavy");

    return [...players].map((player) => {
        const type = listOfClasses[Math.floor(Math.random() * listOfClasses.length)];

        const weaponList =
        (type == "heavy" ? heavySelectedWeapons :
        type == "medium" ? mediumSelectedWeapons :
        lightSelectedWeapons).sort(() => 0.5 - Math.random());
        
        const gadgetList =
        (type == "heavy" ? heavySelectedGadgets :
        type == "medium" ? mediumSelectedGadgets :
        lightSelectedGadgets).sort(() => 0.5 - Math.random());
        
        const specsList =
        (type == "heavy" ? heavySelectedSpecs :
        type == "medium" ? mediumSelectedSpecs :
        lightSelectedSpecs).sort(() => 0.5 - Math.random());

        return {
            name: player,
            type,
            weapon: weaponList[Math.floor(Math.random() * weaponList.length)],
            spec: specsList[0],
            gadgets: [gadgetList[0], gadgetList[1], gadgetList[2]]
        }
    })
};

export function loadoutCards (info) {
    const filler = [
        (<div key="filler1" className="w-5/12 mx-auto filler" />),
        (<div key="filler2"  className="w-5/12 mx-auto filler" />),
        (<div key="filler3"  className="w-5/12 mx-auto filler" />),
        (<div key="filler4"  className="w-5/12 mx-auto filler" />),
        (<div key="filler5"  className="w-5/12 mx-auto filler" />),
        (<div key="filler6"  className="w-5/12 mx-auto filler" />),
    ];

    return [...[...info].map(({ name, weapon, type, spec, gadgets }) => {
        return (
            <div
            key={`${name}${weapon}`}
            id={`${name}${weapon}`}
            className="w-5/12 mx-auto border-4 border-red-600 rounded-md"
            >

            <span
            className="text-xl w-full bg-red-600 text-white block text-nowrap px-2"
            >{name}</span>

            <hr className=""></hr>

            <p
            className="text-lg w-full bg-red-600 text-white block text-nowrap px-2"
            >{`Class: ${type.charAt(0).toUpperCase()}${type.substring(1)}`}</p>

            <div className="flex justify-between text-lg px-2 bg-red-600">
                <span>{weapon.replace("_", " ")}</span>
                <span>{spec.replace("_", " ")}</span>
            </div>

                <div className="flex">
                <Image
                height={300}
                width={300}
                src={`/${type}/${weapon}.png`}
                className="w-1/2"
                alt=""
                />
                <Image
                height={300}
                width={300}
                src={`/${type}/specializations/${spec}.png`}
                alt=""
                className="w-1/2"
                />
                </div>

            <div className="flex">
                <Image
                height={300}
                width={300}
                src={`/${type}/gadgets/${gadgets[0]}.png`}
                alt=""
                className="w-1/3"
                />
                <Image
                height={300}
                width={300}
                src={`/${type}/gadgets/${gadgets[1]}.png`}
                alt=""
                className="w-1/3"
                />
                <Image
                height={300}
                width={300}
                src={`/${type}/gadgets/${gadgets[2]}.png`}
                alt=""
                className="w-1/3"
                />
              </div>

              <div
              className="w-full bg-red-600 text-white text-md text-nowrap flex text-center"
              >
                <span className="w-1/3">{gadgets[0].replace("_", " ")}</span>
                <span className="w-1/3">{gadgets[1].replace("_", " ")}</span>
                <span className="w-1/3">{gadgets[2].replace("_", " ")}</span>
              </div>

            </div>
        )
    }), ...filler]
}