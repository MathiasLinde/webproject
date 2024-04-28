export const fetchProductData = async () => {
    try {
        const response = await fetch('http://localhost:5000/get_products/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}