import { getStorage, createBlankPlayer } from "../actions";

function checkStorage () {
    if (!getStorage() || getStorage().length == 0) return createBlankPlayer([]);
    return [];
}

export const initialState = {
    players: getStorage() || [],
    newPlayers: checkStorage(),
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