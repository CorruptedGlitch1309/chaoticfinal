

export default function SelectAll (props) {
    function selectAll(players) {
        players.forEach((name) => document.getElementById(name.toLowerCase().replace(" ", "")).checked = document.getElementById("select-all").checked);
    };

    return (
        <>
            <label htmlFor="select-all">Select All:</label>
            <input onChange={() => selectAll(props.players)} className="w-4 h-4 mr-2" id="select-all" type="checkbox" name="select-all" />
        </>
    );
};