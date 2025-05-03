<template>
  <div class="p-6">
    <!-- Message d'erreur ou de succès -->
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>

    <!-- Bouton Ajouter Produit -->
    <button
      @click="openAddModal"
      class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition mb-6 shadow"
    >
      Ajouter Produit
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
      <div class="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl my-10 max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">{{ editMode ? 'Modifier le produit' : 'Ajouter un produit' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">       
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
            <input
              v-model="newProduct.name"
              type="text"
              placeholder="Nom du produit"
              class="input w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select 
              v-model="newProduct.category" 
              class="input w-full p-2 border border-gray-300 rounded" 
              required
            >
              <option value="" disabled>Sélectionnez une catégorie</option>
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
              class="input w-full p-2 border border-gray-300 rounded"
              :required="!editMode"
              accept="image/*"
            />
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="w-24 h-24 object-cover mt-2 rounded shadow"
              alt="Aperçu de l'image"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newProduct.description"
              placeholder="Description du produit"
              class="input w-full p-2 border border-gray-300 rounded"
              required
              rows="3"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
            <input
              v-model.number="newProduct.price"
              type="number"
              placeholder="Prix en FCFA"
              class="input w-full p-2 border border-gray-300 rounded"
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
              class="input w-full p-2 border border-gray-300 rounded"
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
              class="input w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
            <input
              v-model="newProduct.color"
              type="text"
              placeholder="Couleur principale du produit"
              class="input w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div class="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              class="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              {{ editMode ? 'Mettre à jour' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tableau des produits -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div> 

    <div v-else-if="products.length === 0" class="text-center py-8">
      <p class="text-gray-500">Aucun produit disponible pour le moment.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-3 border">Nom</th>
            <th class="px-4 py-3 border">Description</th>
            <th class="px-4 py-3 border">Prix (FCFA)</th>
            <th class="px-4 py-3 border">Stock</th>
            <th class="px-4 py-3 border">Garantie</th>
            <th class="px-4 py-3 border">Couleur</th>
            <th class="px-4 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="text-center hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3 border">{{ product.name }}</td>
            <td class="px-4 py-3 border text-left">{{ truncateText(product.description, 50) }}</td>
            <td class="px-4 py-3 border">{{ formatPrice(product.price) }}</td>
            <td class="px-4 py-3 border">{{ product.stock }}</td>
            <td class="px-4 py-3 border">{{ product.warranty || 'None' }}</td>
            <td class="px-4 py-3 border">{{ product.color || 'None' }}</td>
            <td class="px-4 py-3 border">
              <div class="flex gap-2 justify-center">
                <button
                  @click="editProduct(product)"
                  class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                >
                <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="confirmDeleteProduct(product.id)"
                  class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                <i class="fas fa-trash"></i> 
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
import apiService from '../../services/apiService';
import { Product, type NewProductForm } from '../../models/product';

export default {
  data() {
    return {
      showModal: false,
      loading: true,
      editMode: false,
      errorMessage: '',
      successMessage: '',
      imagePreview: null as string | null,
      products: [] as Product[],
      newProduct: {
        id: null,
        name: '',
        category: '',       // added category string
        categoryId: 0,
        description: '',
        price: 0,
        stock: 0,
        imageFile: null,
        warranty: '',
        color: '',
        storeId: 1, // Valeur par défaut pour le magasin
      } as NewProductForm,
    };
  },
  async mounted() {
    try {
      await this.loadProducts();
    } catch (error) {
      this.showError("Erreur lors du chargement des produits");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async loadProducts() {
      try {
        this.loading = true;
        this.products = await apiService.fetchProducts();
        this.errorMessage = '';
      } catch (err: any) {
        console.error('loadProducts error:', err);
        this.showError('Impossible de charger les produits: ' + err.message);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    openAddModal() {
      this.editMode = false;
      this.resetForm();
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.resetForm();
    },

    handleImageUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files ? input.files[0] : null;
      if (file) {
        this.newProduct.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },

    validateForm(): boolean {
      if (!this.newProduct.name || this.newProduct.name.trim() === '') {
        this.showError('Le nom du produit est obligatoire');
        return false;
      }

      if (!this.newProduct.description || this.newProduct.description.trim() === '') {
        this.showError('La description du produit est obligatoire');
        return false;
      }

      if (!this.newProduct.categoryId || this.newProduct.categoryId === 0) {
        this.showError('Veuillez sélectionner une catégorie');
        return false;
      }

      if (this.newProduct.price <= 0) {
        this.showError('Le prix doit être supérieur à 0');
        return false;
      }

      if (this.newProduct.stock < 0) {
        this.showError('Le stock ne peut pas être négatif');
        return false;
      }

      if (!this.editMode && !this.newProduct.imageFile) {
        this.showError('Veuillez sélectionner une image pour le produit');
        return false;
      }

      return true;
    },

    async handleSubmit() {
      if (!this.validateForm()) return;

      try {
        this.errorMessage = '';
        const formData = new FormData();
        
        // Ajout des données du produit
        formData.append('ProductName', this.newProduct.name);
        formData.append('ProductDescription', this.newProduct.description);
        formData.append('ProductPrice', String(this.newProduct.price));
        formData.append('ProductQuantity', String(this.newProduct.stock));
        formData.append('Category', String(this.newProduct.category));
        formData.append('CategoryId', String(this.newProduct.categoryId));
        formData.append('StoreId', String(this.newProduct.storeId));
        formData.append('Warranty', this.newProduct.warranty || '');
        formData.append('Color', this.newProduct.color || '');
        
        // Ajout de l'image si présente
        if (this.newProduct.imageFile) {
          formData.append('Image', this.newProduct.imageFile);
        }
        
        // Si en mode édition, on ajoute l'ID
        if (this.editMode && this.newProduct.id) {
          formData.append('ProductId', String(this.newProduct.id));
          await apiService.updateProduct(this.newProduct.id, formData);
          this.showSuccess('Produit mis à jour avec succès');
        } else {
          await apiService.createProduct(formData);
          this.showSuccess('Produit ajouté avec succès');
        }
        
        this.closeModal();
        await this.loadProducts();
      } catch (error: any) {
        this.showError(`Erreur: ${error.message}`);
      }
    },

    resetForm() {
      this.newProduct = {
        id: null,
        name: '',
        category: '',
        categoryId: 0,
        description: '',
        price: 0,
        stock: 0,
        imageFile: null,
        warranty: '',
        color: '',
        storeId: 2, // Valeur par défaut
      };
      this.imagePreview = null;
      this.errorMessage = '';
    },

    editProduct(product: Product) {
      this.editMode = true;
      this.newProduct = {
        id: product.id,
        name: product.name,
        category: '',  // added empty string or could map from categoryId if mapping exists
        categoryId: product.categoryId,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageFile: null,
        warranty: product.warranty || '',
        color: product.color || '',
        storeId: product.storeId
      };
      
      this.imagePreview = product.imageUrl || null;
      this.showModal = true;
    },

    async confirmDeleteProduct(id: number) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
      
      try {
        this.loading = true;
        await apiService.deleteProduct(id);
        this.showSuccess('Produit supprimé avec succès');
        await this.loadProducts();
      } catch (error: any) {
        this.showError(`Erreur lors de la suppression: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },

    showError(message: string) {
      this.errorMessage = message;
      this.successMessage = '';
      // Faire disparaître le message après 5 secondes
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    },

    showSuccess(message: string) {
      this.successMessage = message;
      this.errorMessage = '';
      // Faire disparaître le message après 5 secondes
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    },

    truncateText(text: string, maxLength: number): string {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },

    formatPrice(price: number): string {
      return price.toLocaleString('fr-FR');
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/ProduitComponent.css";
.input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.input {
  transition: border-color 0.2s, box-shadow 0.2s;
}
</style>
