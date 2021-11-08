import instance from "auth/orderAxios";


const getAllOrders = () => {
    console.log(instance)
    return instance.get(`/orders`);
};

const getOrderById = (orderId) => {
    return instance.get(`/orders/${orderId}`);
}

const updateOrderById = (orderId, data) => {
    return instance.put(`/orders/${orderId}`, data);

}

export const OrderService = {
    getAllOrders,
    getOrderById,
    updateOrderById,
};
