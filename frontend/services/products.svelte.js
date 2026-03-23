import { authService } from './auth.svelte.js';

let products = $state([]);
let selected = $state(null); // Para el detalle/edición [cite: 18, 20]

export const productService = {
    get list() { return products; },
    get current() { return selected; },
    set current(val) { selected = val; },

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