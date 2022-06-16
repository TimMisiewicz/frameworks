export default {
    state () {
        return{
            id: null,
            username: null,
            role: null,
            token: null
        }
    },
    getters: {
        id(state) {
            return state.id;
        },
        username(state){
            return state.username;
        },
        role(state){
          return state.role;
        },
        token(state){
            return state.token;
        },
        isAuthenticated(state){
            return !!state.token;
        }
    },
    mutations: {
        setId(state, payload){
            state.id = payload.id;
        },
        setUsername(state, payload){
            state.username = payload.username;
        },
        setRole(state, payload){
            state.role = payload.role;
        },
        setToken(state, payload){
            state.token = payload.token;
        },
        logOut(state){
            state.id = null;
            state.token = null;
            state.role = null;
            state.username = null;

            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
        }
    },
    actions: {
        async login(context, payload){
            const username = payload.username;
            const password = payload.password;

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username: username, password: password})
            };

            const response = await fetch(context.getters.apiUrl + "auth/signin", requestOptions);
            const data = await response.json()

            if (!response.ok) {
                const error = new Error(
                    'Failed to authenticate. Check your login data.'
                );
                throw error;
            }
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.roles[0]);
            localStorage.setItem('token', data.accessToken);
            context.commit('setId', {id: data.id});
            context.commit('setUsername', {username: data.username});
            context.commit('setRole', {role: data.roles[0]});
            context.commit('setToken', {token: data.accessToken});
        }
    }
}