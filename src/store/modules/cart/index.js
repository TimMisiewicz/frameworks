export default {
    state() {
        return {
            orderLines: []
        }
    },
    getters: {
        orderLines(state) {
            return state.orderLines;
        }
    },
    mutations: {
        addProduct(state, payload){
            for (let i = 0; i < state.orderLines.length; i++){
                if (state.orderLines[i].product === payload.productId){
                    state.orderLines[i].amount++;
                    return;
                }
            }
            state.orderLines.push({
                order: null,
                product: payload.productId,
                amount: payload.amount
            });
        },
        clearCart(state){
            state.orderLines = [];
        },
        incrementProduct(state, payload){
            for (let i = 0; i < state.orderLines.length; i++){
                if (state.orderLines[i].product === payload.givenId){
                    state.orderLines[i].amount++;
                    return;
                }
            }
        },
        decrementProduct(state, payload){
            for (let i = 0; i < state.orderLines.length; i++){
                if (state.orderLines[i].product === payload.givenId){
                    if (state.orderLines[i].amount === 1) {
                        state.orderLines.splice(i,1);
                    }
                    state.orderLines[i].amount--;
                    return;
                }
            }
        }
    },
}
