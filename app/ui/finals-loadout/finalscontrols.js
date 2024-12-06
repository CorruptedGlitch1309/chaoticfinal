import { useSelector, useDispatch } from "react-redux";
import WeaponList from "./weaponlist";

export default function FinalsControls () {
    const dispatch = useDispatch();

    return (
        <div>

            <div className="text-center">
                <label htmlFor="light-checkbox">Light: </label>
                <input id="light-checkbox" type="checkbox" className="mr-4" defaultChecked />
                <label htmlFor="medium-checkbox">Medium: </label>
                <input id="medium-checkbox" type="checkbox" className="mr-4" defaultChecked />
                <label htmlFor="heavy-checkbox">Heavy: </label>
                <input id="heavy-checkbox" type="checkbox" className="mr-4" defaultChecked />
            </div>

            <WeaponList gameClass={"light"} />
            <WeaponList gameClass={"medium"} />
            <WeaponList gameClass={"heavy"} />

        </div>
    )
}