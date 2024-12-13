import GameClassList from "./gameclasslist";

export default function FinalsControls () {
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
            <GameClassList gameClass={"light"} />
            <GameClassList gameClass={"medium"} />
            <GameClassList gameClass={"heavy"} />
        </div>
    );
};