export default {
    state () {
        return{
            products: [],
        }
    },
    getters: {
        products(state){
            return state.products;
        }
    },
    mutations: {
        setProducts(state, payload){
            state.products = payload.products;
        }
    },
    actions: {
        async getAllProducts(context){
            const requestOptions = {
                method: "GET"
            };

            const response = await fetch(context.getters.apiUrl + "product/all", requestOptions);
            const data = await response.json();

            if (!response.ok) {
                const error = new Error(
                    'Failed to fetch products'
                );
                throw error;
            }

            context.commit('setProducts', {products: data});
        }
    }
}