import React from 'react';

import Routing from 'components/Routing/Routing';

export const RestaurantsStateContext = React.createContext();
export const ProfileStateContext = React.createContext();
export const LoggedStateContext = React.createContext();

function Context(props) {

    const [restaurants, setRestaurants] = React.useState([]);
    const [profile, setProfile] = React.useState(null);
    const [logged, setLogged] = React.useState(null);

    return (
        <LoggedStateContext.Provider value={[logged, setLogged]}>
            <RestaurantsStateContext.Provider value={[restaurants, setRestaurants]}>
                <ProfileStateContext.Provider value={[profile, setProfile]}>
                    <Routing />
                </ProfileStateContext.Provider>
            </RestaurantsStateContext.Provider>
        </LoggedStateContext.Provider>
    );
}

export default Context;