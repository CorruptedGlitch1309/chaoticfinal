import { createPlayer } from "@/app/lib/actions";
import { setNewPlayers, setPlayers } from "@/app/lib/redux/hooks";
import { useDispatch, useSelector } from "react-redux";
import CreatePlayer from "./createplayer";


export default function NewPlayers () {
    const players = useSelector((state) => state.players);
    const newPlayers = useSelector((state) => state.newPlayers);
    const dispatch = useDispatch();

    return [...newPlayers].map((player) => {
        return (
          <CreatePlayer onClick={(e) => {
            const { stateNewPlayers, statePlayers } = createPlayer(e.target, players, newPlayers, player);
            dispatch(setNewPlayers(stateNewPlayers));
            dispatch(setPlayers(statePlayers));
          }}
          key={player}/>
        )
      })
}