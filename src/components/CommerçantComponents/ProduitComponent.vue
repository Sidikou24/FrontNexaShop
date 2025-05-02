<template>
  <div class="p-6">
    <!-- Bouton Ajouter Produit -->
    <button
      @click="showModal = true"
      class="bg-green-600 text-white px-6 py-2 rounded-lg hover-bg-green-700 transition mb-6 shadow"
    >
      Ajouter Produit
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
      <div class="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl my-10 max-h-[90vh] overflow-y-auto">
        
        <form @submit.prevent="handleSubmit" class="space-y-4">       
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
            <input
              v-model="newProduct.name"
              type="text"
              placeholder="Nom du produit"
              class="input"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select v-model="newProduct.category" class="input" required>
              <option value="" disabled selected>Sélectionnez une catégorie</option>
              <option value="electronique">Électronique</option>
              <option value="vetements">Vêtements</option>
              <option value="alimentaire">Alimentaire</option>
              <!-- Ajoutez d'autres catégories selon vos besoins -->
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              @change="handleImageUpload"
              class="input"
              :required="!newProduct.id"
            />
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="w-24 h-24 object-cover mt-2 rounded shadow"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newProduct.description"
              placeholder="Description du produit"
              class="input"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
            <input
              v-model.number="newProduct.price"
              type="number"
              placeholder="Prix en FCFA"
              class="input"
              min="0"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              v-model.number="newProduct.stock"
              type="number"
              placeholder="Quantité en stock"
              class="input"
              min="0"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Garantie</label>
              <input
              v-model="newProduct.warranty"
              type="text"
              placeholder="Durée de la garantie (ex: 6 mois)"
              class="input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
              <input
              v-model="newProduct.color"
              type="text"
              placeholder="Couleur principale du produit"
              class="input"
              />
          </div>
          
          <div class="flex justify-end pt-2">
            <button type="submit" class="bg-green-600 text-white px-5 py-2 rounded hover-bg-green-700 transition">
              Enregistrer
            </button> 
            <button @click="showModal = false" class="bg-red-600 text-white px-5 py-2 rounded hover-bg-red-700 transition">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tableau des produits -->
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-3 border">Nom</th>
            <th class="px-4 py-3 border">Description</th>
            <th class="px-4 py-3 border">Prix (FCFA)</th>
            <th class="px-4 py-3 border">Stock</th>
            <th class="px-4 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="text-center hover-bg-gray-50 transition"
          >
            <td class="px-4 py-3 border">{{ product.name }}</td>
            <td class="px-4 py-3 border text-left">{{ product.description }}</td>
            <td class="px-4 py-3 border">{{ product.price }}</td>
            <td class="px-4 py-3 border">{{ product.stock }}</td>
            <td class="px-4 py-3 border">
              <div class="flex gap-2 justify-center">
                <button
                  @click="editProduct(product)"
                  class="bg-blue-500 text-white px-4 py-1 rounded hover-bg-blue-600 transition"
                >
                  Modifier
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="bg-red-600 text-white px-4 py-1 rounded hover-bg-red-700 transition"
                >
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import apiService from '@/services/apiService';
import type { Product } from '@/models/Product';

export default {
  data() {
    return {
      showModal: false,
      errorMessage: '',
      successMessage: '',
      imagePreview: null,
      products: [] as Product[],
      newProduct: {
        id: null,
        name: '',
        category: '', 
        description: '',
        price: 0,
        stock: 0,
        imageFile: null,
        warranty: '',
        color: '',
      },
    };
  },
  async mounted() {
    this.products = await apiService.fetchProducts();
  },
  methods: {
    // async fetchProducts () {
    //   try {
    //     const raw = await apiService.fetchProducts(); // toujours un tableau
    //
    //     /* mapping → vue */
    //     this.products = raw.map(p => ({
    //       id:          p.productId,
    //       name:        p.productName,
    //       description: p.productDescription,
    //       price:       p.productPrice,
    //       stock:       p.productQuantity
    //     }));
    //
    //   } catch (err) {
    //     console.error('fetchProducts (vue)', err);
    //     this.errorMessage = 'Impossible de charger les produits : ' + err.message;
    //     this.products = [];           // évite d’autres erreurs d’affichage
    //   }
    // },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newProduct.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async handleSubmit() {
      if (!this.newProduct.name || !this.newProduct.description || !this.newProduct.category || this.newProduct.price < 0 || this.newProduct.stock < 0) {
        alert('Veuillez remplir tous les champs requis correctement.');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.newProduct.name);
      formData.append('category', this.newProduct.category); // Ajout de la catégorie
      formData.append('description', this.newProduct.description);
      formData.append('price', this.newProduct.price);
      formData.append('stock', this.newProduct.stock);
      if (this.newProduct.imageFile) {
        formData.append('image', this.newProduct.imageFile);
      }
      formData.append('warranty', this.newProduct.warranty || '');
      formData.append('color', this.newProduct.color || '');
      try {
        if (this.newProduct.id) {
          await apiService.updateProduct(this.newProduct.id, formData);
        } else {
          await apiService.createProduct(formData);
        }
        this.showModal = false;
        this.resetForm();
        this.fetchProducts();
      } catch (error) {
        console.error(error);
        alert("Erreur lors de l'enregistrement du produit");
      }
    },
    resetForm() {
      this.newProduct = {
        id: null,
        name: '',
        category: '', // Réinitialisation de la catégorie
        description: '',
        price: 0,
        stock: 0,
        imageFile: null,
      };
      this.imagePreview = null;
    },
    editProduct(product) {
      this.newProduct = { ...product, imageFile: null };
      this.imagePreview = product.imageUrl;
      this.showModal = true;
    },
    async deleteProduct(id) {
      if (!confirm('Supprimer ce produit ?')) return;
      try {
        await apiService.deleteProduct(id);
        this.fetchProducts();
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la suppression");
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/ProduitComponent.css";
</style>
