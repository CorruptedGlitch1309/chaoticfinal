import GameClassList from "./gameclasslist";
import { gameClasses } from "@/app/lib/finals-actions";

export default function FinalsControls () {

    function runToggle (type) {
        gameClasses.forEach((gameClass) => {
            const select = [ "weapon-selected" ];
            const unselect = [ "weapon-unselect" ];
            const elements = document.getElementById(`${type}-container-${gameClass}`).querySelectorAll("button");
            const checked = document.getElementById(`${type}-checkbox`).checked;

            (checked ? select : unselect).forEach((text) => elements.forEach(target => target.classList.add(text)));
            (!checked ? select : unselect).forEach((text) => elements.forEach(target => target.classList.remove(text)));
        })
    };

    return (
        <div>
            
            <div className="w-7/12 mx-auto mb-3">
                <h3 className="text-xl">Toggles:</h3>
                    <div className="border p-1 mx-auto w-11/12">
                        <div className="flex px-3">
                        
                            <span className="w-1/3">
                            <label htmlFor="light-checkbox">Light: </label>
                            <input id="light-checkbox" type="checkbox" className="mr-4" defaultChecked />
                            </span>
                            <span className="w-1/3">
                            <label htmlFor="medium-checkbox">Medium: </label>
                            <input id="medium-checkbox" type="checkbox" className="mr-4" defaultChecked />
                            </span>
                            <span className="w-1/3">
                            <label htmlFor="heavy-checkbox">Heavy: </label>
                            <input id="heavy-checkbox" type="checkbox" className="mr-4" defaultChecked />
                            </span>

                        </div>

                        <hr className="mx-4" />

                        <div className="flex px-3">

                            <span className="w-1/3">
                            <label htmlFor="weapon-checkbox">Weapons: </label>
                            <input id="weapon-checkbox" type="checkbox" className="mr-4" defaultChecked
                            onChange={() => runToggle("weapon")} />
                            </span>
                            <span className="w-1/3">
                            <label htmlFor="gadgets-checkbox">Gadgets: </label>
                            <input id="gadgets-checkbox" type="checkbox" className="mr-4" defaultChecked
                            onChange={() => runToggle("gadgets")} />
                            </span>
                            <span className="w-1/3">
                            <label htmlFor="specs-checkbox">Specs: </label>
                            <input id="specs-checkbox" type="checkbox" className="mr-4" defaultChecked
                            onChange={() => runToggle("specs")} />
                            </span>

                            </div>
                    </div>
            </div>

            <GameClassList gameClass={"light"} />
            <GameClassList gameClass={"medium"} />
            <GameClassList gameClass={"heavy"} />

        </div>
    );
};