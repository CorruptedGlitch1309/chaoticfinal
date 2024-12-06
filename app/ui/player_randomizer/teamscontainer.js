import { addTeamName, generatePlayers } from "@/app/lib/actions";
import { useSelector } from "react-redux";

export default function TeamsContainer () {
    const selectedParams = useSelector((state) => state.selectedParams);
    const players = useSelector((state) => state.players);

    return (
        <div id="teams" className="flex flex-wrap gap-3">
              {[...selectedParams].map((team, index) => addTeamName(generatePlayers(players, team, false), index))}
        </div>
    )
}