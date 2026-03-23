<script>
    import { authService } from "../services/auth.svelte.js";
</script>

<nav>
    <div class="menu">
        <button
            class:active={authService.data.currentPage === "productos"}
            onclick={() => authService.navigate("productos")}
        >
            📦 Productos
        </button>
        <button
            class:active={authService.data.currentPage === "perfil"}
            onclick={() => authService.navigate("perfil")}
        >
            👤 Mi Perfil
        </button>
    </div>

    <div class="user-info">
        <span
            >{authService.data.user?.username} ({authService.data.user
                ?.role})</span
        >
        <button onclick={() => authService.logout()} class="logout-btn"
            >Salir</button
        >
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        padding: 0.8rem 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .links {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 8px 12px;
        border-radius: 6px;
        transition: all 0.2s;
    }

    .active {
        background: #ff3e0015;
        color: #ff3e00;
    }

    /* Responsive: en móvil ocultamos texto largo o apilamos */
    @media (max-width: 600px) {
        nav {
            padding: 0.5rem;
            flex-direction: column;
            gap: 10px;
        }
        .user {
            font-size: 0.8rem;
        }
    }
</style>
