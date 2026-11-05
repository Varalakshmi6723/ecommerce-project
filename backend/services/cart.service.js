import API_URL from './api';

// ADD PRODUCT TO CART

export const addToCart = async (product, productId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            productId: productId || product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to add product');
    }

    return data;
};
// GET CART
export const getCart = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch cart');
    }

    return data;
};


// REMOVE PRODUCT FROM CART
export const removeCartProduct = async (productId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(
        `${API_URL}/cart/${productId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to remove product');
    }

    return data;
};
