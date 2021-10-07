import instance from "../axios";


const getRestaurantList = () => {
    console.log(instance)
    return instance.get(`/restaurants/restaurants`);
};

const createRestaurant = (data) => {
    return instance.post(`restaurants/restaurants`, data);
};

const updateRestaurant = (ownerId, itemId, data) => {
    return instance.put(`restaurants/owner/${ownerId}/restaurants/${itemId}`, data);
};

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
    createRestaurant,
    updateRestaurant,
    // createMenu,
    // getMenuList,
    // getMenuItemById,
    // updateMenuItemById,
    // getProfile,
    // updateProfile
};