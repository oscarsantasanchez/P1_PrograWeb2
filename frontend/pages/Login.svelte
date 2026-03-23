<script>
    import { authService } from "../services/auth.svelte.js";
    let username = $state("");
    let password = $state("");
    let error = $state("");

    async function handleLogin(e) {
        e.preventDefault();
        const result = await authService.login(username, password);
        if (!result.success) error = result.message;
    }
</script>

<form onsubmit={handleLogin}>
    <h2>Login</h2>
    <input bind:value={username} placeholder="Usuario" required />
    <input type="password" bind:value={password} placeholder="Clave" required />
    {#if error}<p style="color:red">{error}</p>{/if}
    <button type="submit">Entrar</button>
</form>
