<script>
    import { authService } from "../services/auth.svelte.js";
</script>

<div class="profile-page">
    <h2>Perfil del Usuario</h2>
    <div class="card">
        <p><strong>Username:</strong> {authService.data.user?.username}</p>
        <p><strong>Rol en el sistema:</strong> {authService.data.user?.role}</p>
        <p><strong>ID de Usuario:</strong> {authService.data.user?.id}</p>
    </div>
</div>

<style>
    .card {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
        max-width: 400px;
    }
</style>
