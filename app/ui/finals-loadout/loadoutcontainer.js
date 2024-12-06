import { addTeamName, generatePlayers } from "@/app/lib/actions";
import { loadoutCards } from "@/app/lib/finals-actions";
import { useSelector } from "react-redux";

export default function LoadoutContainer () {
    const loadouts = useSelector((state) => state.loadouts);

    return (
        <div id="loadouts" className="flex flex-wrap gap-3">
              {loadoutCards(loadouts)}
        </div>
    )
}