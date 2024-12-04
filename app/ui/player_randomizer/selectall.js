

export default function SelectAll (props) {
    const select = [ "selected", "bg-gray-400" ];
    const unselect = [ "unselect", "bg-gray-600" ];



    const selectAll = (players) => players.forEach((name) => {
        const element = document.getElementById(name.toLowerCase().replace(" ", ""));
        const isSelected = document.getElementById("select-all").checked;

        (isSelected ? select : unselect).forEach((text) => element.classList.add(text));
        (!isSelected ? select : unselect).forEach((text) => element.classList.remove(text));
    });

    

    return (
        <>
            <label htmlFor="select-all">Select All:</label>
            <input onChange={() => selectAll(props.players)} className="w-4 h-4 mr-2" id="select-all" type="checkbox" name="select-all" />
        </>
    );
};