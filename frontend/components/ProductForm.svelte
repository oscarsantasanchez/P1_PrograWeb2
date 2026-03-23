<script>
    import { productService } from "../services/products.svelte.js";
    let { onCancel } = $props(); // Callback de hijo a padre [cite: 40]

    let nombre = $state(productService.current?.nombre || "");
    let precio = $state(productService.current?.precio || 0);
    let activo = $state(productService.current?.activo ?? true);

    async function handleSubmit(e) {
        e.preventDefault();
        await productService.save({
            id: productService.current?.id,
            nombre,
            precio,
            activo,
        });
        onCancel();
    }
</script>

<div class="modal">
    <form onsubmit={handleSubmit}>
        <h3>{productService.current ? "Editar" : "Nuevo"} Producto</h3>
        <input bind:value={nombre} placeholder="Nombre" required />
        <input type="number" bind:value={precio} step="0.01" required />
        <label><input type="checkbox" bind:checked={activo} /> Activo</label>
        <button type="submit">Guardar</button>
        <button type="button" onclick={onCancel}>Cancelar</button>
    </form>
</div>
