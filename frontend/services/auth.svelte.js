// El estado global se define con $state
let authData = $state({
    token: null,
    user: null,
    isAuthenticated: false,
    currentPage: 'login' // <--- AÑADIDO: Control de navegación
});

export const authService = {
    get data() { return authData; },

    // <--- AÑADIDO: Método para cambiar de pantalla
    navigate(page) {
        authData.currentPage = page;
    },

    async login(username, password) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Usuario o clave incorrectos');

            const res = await response.json();
            const payload = JSON.parse(atob(res.token.split('.')[1]));

            authData.token = res.token;
            authData.user = payload;
            authData.isAuthenticated = true;
            authData.currentPage = 'productos'; // <--- AÑADIDO: Redirigir al entrar

            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },

    logout() {
        authData.token = null;
        authData.user = null;
        authData.isAuthenticated = false;
        authData.currentPage = 'login'; // <--- AÑADIDO: Resetear al salir
    }
};