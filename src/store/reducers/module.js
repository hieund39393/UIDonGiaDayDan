const module = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MODULE':
            return {
                ...state,
                moduleList: action.payload,
            };
        default:
            return state;
    }
};

export default module;
