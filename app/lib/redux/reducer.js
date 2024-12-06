import { initialState } from "./initialState";
import { SETPLAYERS, SETNEWPLAYERS, SETSELECTEDPARAMS, SETLOADED, SETTYPE, TOGGLECLASS, SETLOADOUTS } from "./delarations";

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SETPLAYERS:
            return Object.assign({}, state, { players: action.payload });
            break;
        case SETNEWPLAYERS:
            return Object.assign({}, state, { newPlayers: action.payload });
            break;
        case SETSELECTEDPARAMS:
            return Object.assign({}, state, { selectedParams: action.payload });
            break;
        case SETLOADED:
            return Object.assign({}, state, { loaded: true });
            break;
        case SETTYPE:
            return Object.assign({}, state, { randomizerType: action.payload });
            break;
        case TOGGLECLASS:
            return Object.assign({}, state,
                action.payload == "light" ? { light: !state.light } :
                action.payload == "medium" ? { medium: !state.medium } :
                action.payload == "heavy" ? { heavy: !state.heavy } : {}
            );
            break;
        case SETLOADOUTS:
            return Object.assign({}, state, { loadouts: action.payload })
        default:
            return state;
            break;
    }
};