<script>
    import { productService } from "../services/products.svelte.js";
    import { authService } from "../services/auth.svelte.js";
    import ProductForm from "../components/ProductForm.svelte";

    let showForm = $state(false);
    let loading = $state(false); // UX: Estado de carga

    // Punto Extra Svelte 5: Carga de datos con efecto y feedback
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

    // UX: Confirmación antes de borrar
    async function confirmDelete(id) {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            await productService.remove(id);
        }
    }
</script>

<div class="products-container">
    <header class="table-header">
        <h2>Gestión de Productos</h2>
        <button class="btn-add" onclick={openCreate}> + Nuevo Producto </button>
    </header>

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
                    {#each productService.list as p}
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
                                    >
                                        Borrar
                                    </button>
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
    .products-container {
        padding: 20px 0;
    }

    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    /* UX: Botones con colores semánticos */
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
    }
    .btn-delete {
        background-color: #f44336;
        color: white;
        border: none;
        cursor: pointer;
    }

    /* Estilos de la tabla */
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
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
    }

    th,
    td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }

    tr:hover {
        background-color: #fcfcfc;
    }

    /* Badges de estado */
    .status-badge {
        padding: 4px 8px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
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

    /* Modal Overlay */
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

    .loading-state {
        text-align: center;
        padding: 40px;
        color: #666;
        font-style: italic;
    }

    /* Responsive */
    @media (max-width: 600px) {
        .table-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
        }

        button {
            width: 100%;
            margin-bottom: 5px;
        }
    }
</style>
