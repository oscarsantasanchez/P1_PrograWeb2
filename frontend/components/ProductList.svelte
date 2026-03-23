<script>
    import { productService } from "../services/products.svelte.js";
    import { authService } from "../services/auth.svelte.js";

    // Cargamos productos al montar el componente
    $effect(() => {
        productService.fetchProducts();
    });
</script>

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
        {#each productService.list as prod}
            <tr>
                <td>{prod.nombre}</td>
                <td>{prod.precio}€</td>
                <td>{prod.activo ? "✅ Activo" : "❌ Inactivo"}</td>
                <td>
                    <button onclick={() => (productService.current = prod)}
                        >Detalle/Editar</button
                    >
                    {#if authService.data.user?.role === "admin"}
                        <button
                            onclick={() =>
                                productService.deleteProduct(prod.id)}
                            >Borrar</button
                        >
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>
