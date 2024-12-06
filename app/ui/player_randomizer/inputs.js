'use client';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { setLoadouts, setNewPlayers, setPlayers, setSelectedParams } from "@/app/lib/redux/hooks";
import { getSelected, playerRoute, deleteSelected, createBlankPlayer, randomizeTeams } from "@/app/lib/actions";
import SelectAll from "./selectall";
import Buttons from "./buttons";
import { randomizeLoadout } from "@/app/lib/finals-actions";

export default function Inputs () {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const newPlayers = useSelector((state) => state.newPlayers);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <div>
            <SelectAll players={players} />
            <Buttons
            randomAction={(e) => {
              e.preventDefault();
              const randomizeType = document.getElementById("type-select").value;

              if (randomizeType == "team-randomizer") {
                const randomized = randomizeTeams(getSelected(players), document.getElementById("teamQuantity").value);
                router.push(getSelected(players).length > 0 ? pathname + '?' + playerRoute(randomized, document.getElementById("teamQuantity").value, searchParams) : pathname);
                dispatch(setSelectedParams(randomized));
              };

              if (randomizeType == "finals-loadout") {
                dispatch(setLoadouts(randomizeLoadout()));
              };
              
            }}
            deleteAction={(e) => {
              e.preventDefault();
              const deletedPlayers = deleteSelected(players);
              dispatch(setPlayers(deletedPlayers));
              if (deletedPlayers.length === 0) dispatch(setNewPlayers(createBlankPlayer([])));
            }}
            createAction={(e) => {
              e.preventDefault();
              dispatch(setNewPlayers(createBlankPlayer(newPlayers)));
            }} />
          </div>
    )
}