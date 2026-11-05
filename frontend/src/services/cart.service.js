import API_URL from './api';

// ADD PRODUCT TO CART
export const addToCart = async (product) => {
    const token = localStorage.getItem('token');

    const productId = product.id || product._id || product.productId;

    console.log('PRODUCT ID SENT:', productId);

    const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            productId: productId,
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
        method: 'GET',
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


// REMOVE PRODUCT
export const removeCartProduct = async (productId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to remove product');
    }

    return data;
};
