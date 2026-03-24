<script>
    import { productService } from "../services/products.svelte.js";
    import { authService } from "../services/auth.svelte.js";
    import ProductForm from "../components/ProductForm.svelte";

    let showForm = $state(false);
    let loading = $state(false);

    $effect(() => {
        loading = true;
        productService.fetchAll().finally(() => {
            loading = false;
        });
    });

    function openEdit(product) {
        productService.current = product;
        showForm = true;
    }

    function openCreate() {
        productService.current = null;
        showForm = true;
    }

    async function confirmDelete(id) {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            await productService.remove(id);
        }
    }
</script>

<div class="products-container">
    <header class="table-header">
        <div>
            <h2>Gestión de Productos</h2>
            <p class="stats-text">
                Mostrando <strong>{productService.stats.total}</strong>
                productos ({productService.stats.activos} activos)
            </p>
        </div>
        <button class="btn-add" onclick={openCreate}> + Nuevo Producto </button>
    </header>

    <div class="search-container">
        <input
            type="text"
            placeholder="🔍 Buscar por nombre..."
            bind:value={productService.searchTerm}
            class="search-input"
        />
    </div>

    {#if showForm}
        <div class="modal-overlay">
            <ProductForm onCancel={() => (showForm = false)} />
        </div>
    {/if}

    {#if loading}
        <div class="loading-state">Cargando productos...</div>
    {:else}
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each productService.filteredList as p}
                        <tr>
                            <td><strong>{p.nombre}</strong></td>
                            <td>{p.precio}€</td>
                            <td>
                                <span
                                    class="status-badge {p.activo
                                        ? 'active'
                                        : 'inactive'}"
                                >
                                    {p.activo ? "✅ Activo" : "❌ Inactivo"}
                                </span>
                            </td>
                            <td class="actions">
                                <button
                                    class="btn-edit"
                                    onclick={() => openEdit(p)}>Editar</button
                                >

                                {#if authService.data.user?.role === "admin"}
                                    <button
                                        class="btn-delete"
                                        onclick={() => confirmDelete(p.id)}
                                        >Borrar</button
                                    >
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    /* Nuevos estilos para el buscador y stats */
    .stats-text {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }

    .search-container {
        margin-bottom: 20px;
    }

    .search-input {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #eee;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    .search-input:focus {
        outline: none;
        border-color: #2196f3;
        background: #f1f8ff;
    }

    /* Estilo para cuando no hay resultados */
    tr:only-child td:empty {
        display: none;
    }

    /* El resto del CSS que ya tenías (table-header, btn-add, etc.) */
    .products-container {
        padding: 20px 0;
    }
    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .btn-add {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 6px;
        font-weight: bold;
    }
    .btn-edit {
        background-color: #2196f3;
        color: white;
        border: none;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 4px;
    }
    .btn-delete {
        background-color: #f44336;
        color: white;
        border: none;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 4px;
    }
    .table-responsive {
        width: 100%;
        overflow-x: auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
    }
    th {
        background-color: #f8f9fa;
        color: #333;
        padding: 16px;
        text-align: left;
        font-size: 0.75rem;
        text-transform: uppercase;
    }
    td {
        padding: 16px;
        border-bottom: 1px solid #eee;
    }
    .status-badge {
        padding: 4px 8px;
        border-radius: 20px;
        font-size: 0.8rem;
    }
    .active {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    .inactive {
        background-color: #ffebee;
        color: #c62828;
    }
    .actions {
        display: flex;
        gap: 8px;
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
</style>
