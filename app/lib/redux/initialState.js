import { getStorage, createBlankPlayer } from "../actions";

export const initialState = {
    players: getStorage() || [],
    newPlayers: getStorage().length == 0 ? createBlankPlayer([]) : [],
    selectedParams: [],
    loadouts: [],
    randomizerType: "team-randomizer",
    light: false,
    medium: false,
    heavy: false,
    loaded: false,
}