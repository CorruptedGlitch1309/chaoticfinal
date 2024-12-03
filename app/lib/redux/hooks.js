import { SETPLAYERS, SETNEWPLAYERS, SETSELECTEDPARAMS, SETLOADED } from "./delarations";


export function setPlayers (payload) {
    return {
        type: SETPLAYERS,
        payload
    };
};

export function setNewPlayers (payload) {
    return {
        type: SETNEWPLAYERS,
        payload
    };
};

export function setSelectedParams (payload) {
    return {
        type: SETSELECTEDPARAMS,
        payload
    };
};

export function setLoaded () {
    return {
        type: SETLOADED
    };
};
