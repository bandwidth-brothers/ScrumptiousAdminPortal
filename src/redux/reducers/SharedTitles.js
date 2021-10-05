const sharedTitle = (state = "", action) => {
    switch (action.type) {
        case 'RESTAURANTS':
            return "Restaurants";
        case 'HOME':
            return "Home"
        case 'MENU_ITEMS':
            return "Menu Items";
        default:
            return state;
    }
}

export default sharedTitle