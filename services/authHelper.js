const AuthHelper = {
    isAuthenticated() {
        const token = localStorage.getItem("access_token");
        return !!token;
    },

    getToken() {
        return localStorage.getItem("access_token");
    }
};

export default AuthHelper;
