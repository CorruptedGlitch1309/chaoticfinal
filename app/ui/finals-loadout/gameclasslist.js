import Tab from "./tab";


export default function GameClassList(props) {
    const gameClass = props.gameClass;

    return <>
            <div
            className="w-24 text-2xl bg-gray-200 text-black px-1.5 rounded-t-md"
            >{gameClass.charAt(0).toUpperCase()}{gameClass.substring(1)}</div>

            <div className="w-full bg-gray-200 min-h-5 rounded-r-md rounded-b-md player-button mb-3 text-black">
                <Tab type={"weapon" } gameClass={gameClass} />
                <Tab type={"gadgets" } gameClass={gameClass} />
                <Tab type={"specs" } gameClass={gameClass} />
            </div>
        </>
}