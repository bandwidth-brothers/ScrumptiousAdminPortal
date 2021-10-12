import instance from "auth/restaurantAxios";


const getRestaurantList = () => {
    console.log(instance)
    return instance.get(`/restaurants/restaurants`);
};

const getRestaurantById = (restaurantId) => {
    console.log(instance)
    return instance.get(`/restaurants/restaurants/${restaurantId}`);
};

const createRestaurant = (data) => {
    return instance.post(`restaurants/restaurants`, data);
};

const updateRestaurant = (ownerId, restaurantId, data) => {
    return instance.put(`restaurants/owners/${ownerId}/restaurants/${restaurantId}`, data);
};

const getOwnersList = () => {
    return instance.get(`/admins/owners`);
}

const getOwnerByRestaurantId = (restaurantId) => {
    return instance.get(`/admins/restaurants/${restaurantId}/owner`);
}


// const createMenu = (ownerId, restaurantId, data) => {
//     return instance.post(`/owner/${ownerId}/restaurant/${restaurantId}/menu-items`, data);
// };

// const getMenuList = (ownerId, restaurantId) => {
//     return instance.get(`/owner/${ownerId}/restaurant/${restaurantId}/menu-items`);
// };

// const getMenuItemById = (ownerId, itemId) => {
//     return instance.get(`/owner/${ownerId}/restaurant/menu-items/${itemId}`);
// };

// const updateMenuItemById = (ownerId, itemId, data) => {
//     return instance.put(`/owner/${ownerId}/restaurant/menu-items/${itemId}`, data);
// };



export const RestaurantService = {
    getRestaurantList,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    getOwnersList,
    getOwnerByRestaurantId,
    // createMenu,
    // getMenuList,
    // getMenuItemById,
    // updateMenuItemById,
    // getProfile,
    // updateProfile
};