export default function Buttons (props) {
    return <>
            <button
                className="bg-red-600 p-0.5 mr-2 rounded"
                onClick={props.randomAction}
                >Randomize</button>
            <button
                className="bg-red-600 p-0.5 mr-2 rounded"
                onClick={props.deleteAction}
                >Delete Selected</button>
            <button
                className="bg-red-600 p-0.5 rounded"
                onClick={props.createAction}
                >Add Player</button>
        </>
}