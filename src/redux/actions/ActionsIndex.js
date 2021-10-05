
export const logIn = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}



export const changeTitle = (title) => {
    switch (title) {
        case 'Restaurants':
            return {
                type: 'RESTAURANTS'
            }
        case 'Home':
            return {
                type: 'HOME'
            }
        default:
            return {
                type: ''
            }
    }
}