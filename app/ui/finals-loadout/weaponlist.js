import clsx from "clsx";
import { heavyGadgets, heavySpecializations, heavyWeapons, lightGadgets, lightSpecializations, lightWeapons, mediumGadgets, mediumSpecializations, mediumWeapons } from "@/app/lib/finals-actions";
import { generateWeapons } from "@/app/lib/finals-actions";
import { useDispatch, useSelector } from "react-redux";
import { setClassToggle } from "@/app/lib/redux/hooks";


export default function GameClassList(props) {
    const dispatch = useDispatch();
    const {
        lightWeaponsToggle, mediumWeaponsToggle,
        heavyWeaponsToggle, lightGadgetsToggle,
        mediumGadgetsToggle, heavyGadgetsToggle,
        lightSpecToggle, mediumSpecToggle,
        heavySpecToggle,
    } = useSelector((state) => state.toggles);

    const gameClass = props.gameClass;
    const filler = (<>
        <div className="w-1/6 mx-auto filler" />
        <div className="w-1/6 mx-auto filler" />
        <div className="w-1/6 mx-auto filler" />
    </>);

function getToggle(type) {
    if (gameClass == "light") {
        if (type == "weapon") return lightWeaponsToggle;
        if (type == "gadgets") return lightGadgetsToggle;
        if (type == "specs") return lightSpecToggle;
    };
    
    if (gameClass == "medium") {
        if (type == "weapon") return mediumWeaponsToggle;
        if (type == "gadgets") return mediumGadgetsToggle;
        if (type == "specs") return mediumSpecToggle;
    };

    if (gameClass == "heavy") {
        if (type == "weapon") return heavyWeaponsToggle;
        if (type == "gadgets") return heavyGadgetsToggle;
        if (type == "specs") return heavySpecToggle;
    };
    
};

function getWeapons() {
    if (gameClass == "light") return lightWeapons;
    if (gameClass == "medium") return mediumWeapons;
    if (gameClass == "heavy") return heavyWeapons;
};

function getGadgets() {
    if (gameClass == "light") return lightGadgets;
    if (gameClass == "medium") return mediumGadgets;
    if (gameClass == "heavy") return heavyGadgets;
};

function getSpecs() {
    if (gameClass == "light") return lightSpecializations;
    if (gameClass == "medium") return mediumSpecializations;
    if (gameClass == "heavy") return heavySpecializations;
};

    return (
        <>
            <div
            className="w-24 text-2xl bg-gray-200 text-black px-1.5 rounded-t-md"
            >{gameClass.charAt(0).toUpperCase()}{gameClass.substring(1)}</div>

            <div className="w-full bg-gray-200 min-h-5 rounded-r-md rounded-b-md player-button mb-3 text-black">

                <button className="text-xl ml-1.5 block"
                onClick={() => dispatch(setClassToggle(gameClass, "weapon", getToggle("weapon")))}
                >Weapons {getToggle("weapon") ? "v" : ">"}</button>

                <div
                id={`weapons-container-${gameClass}`}
                className={clsx(
                    "flex flex-wrap gap-1 gap-y-3 py-3",
                    { "hidden": !getToggle("weapon") }
                )}>
                    {generateWeapons(getWeapons(), gameClass, false)}
                    {filler}
                </div>

                <button className="text-xl ml-1.5 block"
                onClick={() => dispatch(setClassToggle(gameClass, "gadgets", getToggle("gadgets")))}
                >Gadgets {getToggle("gadgets") ? "v" : ">"}</button>

                <div
                id={`gadgets-container-${gameClass}`}
                className={clsx(
                    "flex flex-wrap gap-1 gap-y-3 py-3",
                    { "hidden": !getToggle("gadgets") }
                )}>
                    {generateWeapons(getGadgets(), gameClass, "gadgets")}
                    {filler}
                </div>

                <button className="text-xl ml-1.5 block"
                onClick={() => dispatch(setClassToggle(gameClass, "specs", getToggle("specs")))}
                >Specializations {getToggle("specs") ? "v" : ">"}</button>

                <div
                id={`specs-container-${gameClass}`}
                className={clsx(
                    "flex flex-wrap gap-1 gap-y-3 py-3",
                    { "hidden": !getToggle("specs") }
                )}>
                    {generateWeapons(getSpecs(), gameClass, "specs")}
                    {filler}
                </div>

            </div>
        </>
    )
}