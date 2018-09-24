export default (state = {
    items: [],
}, action) => {
    switch (action.type) {
        case 'CREATE_TODO':
            return {
                ...state,
                items: [action.data, ...state.items],
            };
        case 'TOGGLE_COMPLETE_TODO':
            return {
                ...state,
                items: state.items.map((item, index) => {
                    if (index === action.data.index) {
                        return {
                            ...item,
                            completed: !item.completed,
                        };
                    }
                    return item;
                }),
            };
        default:
            return state;
    }
}