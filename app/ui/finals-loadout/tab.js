import { setClassToggle } from "@/app/lib/redux/hooks";
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx";
import { generateWeapons } from "@/app/lib/finals-actions";
import { heavyGadgets, heavySpecializations, heavyWeapons, lightGadgets, lightSpecializations, lightWeapons, mediumGadgets, mediumSpecializations, mediumWeapons } from "@/app/lib/finals-actions";


export default function Tab (props) {
    const dispatch = useDispatch();
    const {
        lightWeaponsToggle, mediumWeaponsToggle,
        heavyWeaponsToggle, lightGadgetsToggle,
        mediumGadgetsToggle, heavyGadgetsToggle,
        lightSpecToggle, mediumSpecToggle,
        heavySpecToggle,
    } = useSelector((state) => state.toggles);

    const gameClass = props.gameClass;
    const tabType = props.type;

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

    const fetchType = () => tabType == "weapon" ? getWeapons() : tabType == "gadgets" ? getGadgets() : tabType == "specs" ? getSpecs() : [];

    return <>
        <button className="text-xl ml-1.5 block"
        onClick={() => dispatch(setClassToggle(gameClass, tabType, getToggle(tabType)))}
        >{tabType.charAt(0).toUpperCase() + tabType.substring(1)} {getToggle(tabType) ? "v" : ">"}</button>

        <div
        id={`${tabType}-container-${gameClass}`}
        className={clsx(
            "flex flex-wrap gap-1 gap-y-3 py-3",
            { "hidden": !getToggle(tabType) }
        )}>
            {generateWeapons(fetchType(), gameClass, tabType)}
            {filler}
        </div>
    </>
}