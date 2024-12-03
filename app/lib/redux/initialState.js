import { getStorage } from "../actions";

export const initialState = {
    players: getStorage() || [],
    newPlayers: [],
    selectedParams: [],
    loaded: false,
}