import instance from "auth/restaurantAxios";


const getMenuItemsFromRestaurantId = (restaurantId) => {
    return instance.get(`/menu/restaurants/${restaurantId}/menu-items`);
}

const createNewMenuItem = (restaurantId, data) => {
    return instance.post(`menu/restaurants/${restaurantId}/menu-items`, data)
}


export const MenuService = {
    getMenuItemsFromRestaurantId,
    createNewMenuItem,
};