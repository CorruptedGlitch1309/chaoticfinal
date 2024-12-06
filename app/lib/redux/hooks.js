import { SETPLAYERS, SETNEWPLAYERS, SETSELECTEDPARAMS, SETLOADED, SETTYPE, TOGGLECLASS, SETLOADOUTS } from "./delarations";


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

export function setType (payload) {
    return {
        type: SETTYPE,
        payload
    };
};

export function setClassToggle (payload) {
    return {
        type: TOGGLECLASS,
        payload
    };
};

export function setLoadouts (payload) {
    return {
        type: SETLOADOUTS,
        payload
    };
};
