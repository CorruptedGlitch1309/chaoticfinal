

export default function SelectAll (props) {
    function selectAll(players) {
        players.forEach(({id}) => document.getElementById(id).checked = document.getElementById("select-all").checked);
    };

    return (
        <>
            <label htmlFor="select-all">Select All:</label>
            <input onChange={() => selectAll(props.players)} className="w-4 h-4 mr-2" id="select-all" type="checkbox" name="select-all" />
        </>
    );
};