import { authService } from './auth.svelte.js';

// --- ESTADO PRINCIPAL ($state) ---
let products = $state([]);
let selected = $state(null);
let searchTerm = $state(""); // Nueva runa para el buscador

export const productService = {
    // Getters y Setters básicos
    get list() { return products; },
    get current() { return selected; },
    set current(val) { selected = val; },

    // Getter y Setter para el buscador (se usará con bind:value en el input)
    get searchTerm() { return searchTerm; },
    set searchTerm(val) { searchTerm = val; },

    // --- VALORES DERIVADOS ($derived) ---

    // REQUISITO: Lista filtrada automáticamente según el buscador
    get filteredList() {
        // Esta propiedad se recalcula sola cada vez que cambia 'products' o 'searchTerm'
        return products.filter(p =>
            p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },

    // REQUISITO: Estadísticas derivadas (Contador de activos)
    get stats() {
        return {
            total: products.length,
            activos: products.filter(p => p.activo).length
        };
    },

    // --- MÉTODOS DE API ---

    async fetchAll() {
        const res = await fetch('http://localhost:3000/productos', {
            headers: { 'Authorization': `Bearer ${authService.data.token}` }
        });
        if (res.ok) products = await res.json();
    },

    async save(productData) {
        const isEdit = !!productData.id;
        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `http://localhost:3000/productos/${productData.id}` : 'http://localhost:3000/productos';

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authService.data.token}`
            },
            body: JSON.stringify(productData)
        });
        if (res.ok) {
            await this.fetchAll();
            selected = null;
        }
    },

    async remove(id) {
        const res = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authService.data.token}` }
        });
        if (res.ok) await this.fetchAll();
    }
};