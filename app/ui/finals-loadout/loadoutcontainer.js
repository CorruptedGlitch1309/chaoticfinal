import { loadoutCards } from "@/app/lib/finals-actions";
import { useSelector } from "react-redux";

export default function LoadoutContainer () {
    const loadouts = useSelector((state) => state.loadoutParams);

    return (
        <div id="loadouts" className="w-full flex flex-wrap gap-y-5">
              {loadoutCards(loadouts)}
        </div>
    )
}