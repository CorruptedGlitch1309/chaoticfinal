import { initialState } from "./initialState";
import { SETPLAYERS, SETNEWPLAYERS, SETSELECTEDPARAMS, SETLOADED } from "./delarations";

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
        default:
            return state;
            break;
    }
};