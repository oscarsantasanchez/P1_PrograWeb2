// Recuperamos datos iniciales de localStorage si existen
const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

let authData = $state({
    token: savedToken,
    user: savedUser,
    isAuthenticated: !!savedToken,
    currentPage: savedToken ? 'productos' : 'login'
});

// REQUISITO EXTRA: $effect para persistencia y sincronización (Side Effect)
$effect.root(() => {
    $effect(() => {
        if (authData.token) {
            localStorage.setItem('token', authData.token);
            localStorage.setItem('user', JSON.stringify(authData.user));
        } else {
            // Si el token pasa a ser null (Logout), limpiamos todo
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            authData.isAuthenticated = false;
        }
    });
});

export const authService = {
    get data() { return authData; },

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
            authData.currentPage = 'productos';

            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },

    logout() {
        authData.token = null;
        authData.user = null;
        authData.isAuthenticated = false;
        authData.currentPage = 'login';
    }
};