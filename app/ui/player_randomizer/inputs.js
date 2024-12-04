'use client';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { setNewPlayers, setPlayers, setSelectedParams } from "@/app/lib/redux/hooks";
import { randomize, getSelected, playerRoute, deleteSelected, createBlankPlayer } from "@/app/lib/actions";
import TeamNumberSelector from "./teamnumber";
import SelectAll from "./selectall";
import Buttons from "./buttons";

export default function Inputs () {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const newPlayers = useSelector((state) => state.newPlayers);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    return (
        <div>
            <TeamNumberSelector />
            <SelectAll players={players} />
            <Buttons
            randomAction={(e) => {
              e.preventDefault();
              const randomized = randomize(getSelected(players), document.getElementById("teamQuantity").value);
              router.push(getSelected(players).length > 0 ? pathname + '?' + playerRoute(randomized, document.getElementById("teamQuantity").value, searchParams) : pathname);
              dispatch(setSelectedParams(randomized));
            }}
            deleteAction={(e) => {
              e.preventDefault();
              dispatch(setPlayers(deleteSelected(players)));
            }}
            createAction={(e) => {
              e.preventDefault();
              dispatch(setNewPlayers(createBlankPlayer(newPlayers)));
            }} />
          </div>
    )
}