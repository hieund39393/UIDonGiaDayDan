const setModule = (moduleObj) => {
    return {
        type: 'SET_MODULE',
        payload: moduleObj,
    };
};

export default { setModule };
