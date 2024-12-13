'use client';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { setLoadoutParams, setLoadouts, setNewPlayers, setPlayers, setSelectedParams } from "@/app/lib/redux/hooks";
import { getSelected, deleteSelected, createBlankPlayer, randomizeTeams, route } from "@/app/lib/actions";
import SelectAll from "./selectall";
import Buttons from "./buttons";
import { randomizeLoadout } from "@/app/lib/finals-actions";

export default function Inputs () {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const newPlayers = useSelector((state) => state.newPlayers);
    const loadoutParams = useSelector((state) => state.loadoutParams);
    const randomizerType = useSelector((state) => state.randomizerType);
    const selectedParams = useSelector((state) => state.selectedParams);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    function handleParamsTeams () {
      const teamQuantity = document.getElementById("teamQuantity").value;
      const randomized = randomizeTeams(getSelected(players), teamQuantity);

      router.push(`${pathname}?${route(randomized, loadoutParams, randomizerType, searchParams)}`);
      dispatch(setSelectedParams(randomized));
    };

    function handleParamsLoadouts() {
      const loadouts = randomizeLoadout(!loadoutParams.length > 0);

      router.push(`${pathname}?${route(selectedParams, loadouts, randomizerType, searchParams)}`);
      dispatch(setLoadoutParams(loadouts));
    }

    return (
        <div>
            <SelectAll players={players} />
            <Buttons
            randomAction={() => {
              switch (document.getElementById("type-select").value) {
                case "team-randomizer": return handleParamsTeams();
                case "finals-loadout": handleParamsLoadouts();
              };
            }}
            deleteAction={() => {
              const deletedPlayers = deleteSelected(players);
              dispatch(setPlayers(deletedPlayers));
              if (deletedPlayers.length === 0) dispatch(setNewPlayers(createBlankPlayer([])));
            }}
            createAction={() => dispatch(setNewPlayers(createBlankPlayer(newPlayers)))} />
          </div>
    )
}