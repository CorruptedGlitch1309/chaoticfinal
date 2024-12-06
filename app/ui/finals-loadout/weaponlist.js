import clsx from "clsx";
import { heavyWeapons, lightWeapons, mediumWeapons } from "@/app/lib/finals-actions";
import { generateWeapons } from "@/app/lib/finals-actions";
import { useDispatch, useSelector } from "react-redux";
import { setClassToggle } from "@/app/lib/redux/hooks";


export default function WeaponList(props) {
    const dispatch = useDispatch();
    const lightToggle = useSelector((state) => state.light);
    const mediumToggle = useSelector((state) => state.medium);
    const heavyToggle = useSelector((state) => state.heavy);

    const gameClass = props.gameClass;
    const filler = (<>
        <div className="w-1/6 mx-auto filler" />
        <div className="w-1/6 mx-auto filler" />
        <div className="w-1/6 mx-auto filler" />
    </>);

function getToggle() {
    if (gameClass == "light") return lightToggle;
    if (gameClass == "medium") return mediumToggle;
    if (gameClass == "heavy") return heavyToggle;
}

function getWeapons() {
    if (gameClass == "light") return lightWeapons;
    if (gameClass == "medium") return mediumWeapons;
    if (gameClass == "heavy") return heavyWeapons;
}

    return (
        <>
            <button
            className="w-24 text-2xl bg-gray-200 text-black px-1.5 rounded-t-md"
            onClick={() => dispatch(setClassToggle(gameClass))}
            >{gameClass.charAt(0).toUpperCase()}{gameClass.substring(1)}</button>

            <div className="w-full bg-gray-200 min-h-5 rounded-r-md rounded-b-md player-button mb-3">
                <div
                id={`weapons-container-${gameClass}`}
                className={clsx("text-black flex flex-wrap gap-1 gap-y-3 py-3", { "hidden": !getToggle() })}>
                    {generateWeapons(getWeapons(), gameClass)}
                    {filler}
                </div>
            </div>
        </>
    )
}