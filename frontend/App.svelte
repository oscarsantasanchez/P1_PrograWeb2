<script>
    import Login from "./pages/Login.svelte";
    import Products from "./pages/Products.svelte";
    import Profile from "./pages/Profile.svelte"; // Nueva pantalla
    import Navbar from "./components/Navbar.svelte"; // Componente para la barra
    import { authService } from "./services/auth.svelte.js";
</script>

<main>
    {#if !authService.data.isAuthenticated}
        <Login />
    {:else}
        <Navbar />

        <div class="container">
            {#if authService.data.currentPage === "productos"}
                <Products />
            {:else if authService.data.currentPage === "perfil"}
                <Profile />
            {/if}
        </div>
    {/if}
</main>

<style>
    /* Estilos que afectan a toda la app */
    :global(body) {
        margin: 0;
        font-family: "Inter", system-ui, sans-serif;
        background-color: #f0f2f5;
        color: #1a1a1a;
    }

    main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .container {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
    }

    /* Ajuste para móviles */
    @media (max-width: 600px) {
        .container {
            padding: 10px;
        }
    }
</style>
