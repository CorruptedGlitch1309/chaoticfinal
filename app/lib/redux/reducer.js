import { initialState } from "./initialState";
import { SETPLAYERS, SETNEWPLAYERS, SETSELECTEDPARAMS, SETLOADED, SETTYPE, TOGGLECLASS, SETLOADOUTS, SETLOADOUTPARAMS } from "./delarations";

function weaponOrGadget(type, sub, value) {
    if (type == "light" && sub == "weapon") return { lightWeaponsToggle: !value };
    if (type == "light" && sub == "gadgets") return { lightGadgetsToggle: !value };
    if (type == "light" && sub == "specs") return { lightSpecToggle: !value };
    if (type == "medium" && sub == "weapon") return { mediumWeaponsToggle: !value };
    if (type == "medium" && sub == "gadgets") return { mediumGadgetsToggle: !value };
    if (type == "medium" && sub == "specs") return { mediumSpecToggle: !value };
    if (type == "heavy" && sub == "weapon") return { heavyWeaponsToggle: !value };
    if (type == "heavy" && sub == "gadgets") return { heavyGadgetsToggle: !value };
    if (type == "heavy" && sub == "specs") return { heavySpecToggle: !value };
};

const  newState = (state, newState) => Object.assign({}, state, newState);

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SETPLAYERS: return newState(state, { players: action.payload });
        case SETNEWPLAYERS: return newState(state, { newPlayers: action.payload });
        case SETSELECTEDPARAMS: return newState(state, { selectedParams: action.payload });
        case SETLOADOUTPARAMS: return newState(state, { loadoutParams: action.payload });
        case SETLOADED: return newState(state, { loaded: true });
        case SETTYPE: return newState(state, { randomizerType: action.payload });
        case TOGGLECLASS:
            return newState(state, { 
                toggles: newState(state.toggles, weaponOrGadget(action.value, action.sub, action.payload)) 
        });
        case SETLOADOUTS:
            return Object.assign({}, state, { loadouts: action.payload })
        default: return state;
    }
};