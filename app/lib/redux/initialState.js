import { getStorage, createBlankPlayer } from "../actions";

export const initialState = {
    players: getStorage() || [],
    newPlayers: !getStorage() ? createBlankPlayer([]) : (getStorage().length == 0 ? createBlankPlayer([]) : []),
    selectedParams: [ [] ],
    loadoutParams: [],
    loadouts: [],
    randomizerType: "team-randomizer",
    toggles: {
        lightWeaponsToggle: false,
        mediumWeaponsToggle: false,
        heavyWeaponsToggle: false,
        lightGadgetsToggle: false,
        mediumGadgetsToggle: false,
        heavyGadgetsToggle: false,
        lightSpecToggle: false,
        mediumSpecToggle: false,
        heavySpecToggle: false,
    },
    loaded: false,
}