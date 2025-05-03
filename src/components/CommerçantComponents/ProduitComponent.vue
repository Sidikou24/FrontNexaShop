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
            <!-- Champs cachés pour IdProduit et StoreId -->
            <input type="hidden" v-model="newProduct.id" />
            <input type="hidden" :value="2" />
            
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
            <th class="px-4 py-3 border">Image</th>
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
            <td class="px-4 py-3 border">
              <img :src="product.imageUrl" class="w-16 h-16 object-cover mx-auto rounded shadow" />
            </td>
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
import { defineComponent, ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import type { Product } from '@/types/Product';

export default defineComponent({
  setup() {
    const showModal = ref(false);
    const imagePreview = ref<string | null>(null);
    const products = ref<Product[]>([]);
    
    const newProduct = ref<Partial<Product> & { imageFile?: File | null }>({
      id: 1, // valeur par défaut pour IdProduit (pour test)
      storeId: 2, // valeur par défaut pour StoreId (pour test)
      name: '',
      category: '',
      description: '',
      price: 0,
      stock: 0,
      warranty: '',
      color: '',
      imageFile: null,
    });

    const fetchProducts = async () => {
      try {
        products.value = await apiService.fetchProducts();
      } catch (error) {
        console.error(error);
      }
    };

    const handleImageUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        newProduct.value.imageFile = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    const handleSubmit = async () => {
      const { name, description, category, price, stock } = newProduct.value;
      if (!name || !description || !category || price! < 0 || stock! < 0) {
        alert('Veuillez remplir tous les champs requis correctement.');
        return;
      }

      const formData = new FormData();
      formData.append('storeId', newProduct.value.storeId?.toString() || '2');
      formData.append('id', newProduct.value.id?.toString() || '25');
      formData.append('name', name);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('price', price!.toString());
      formData.append('stock', stock!.toString());
      if (newProduct.value.imageFile) {
        formData.append('image', newProduct.value.imageFile);
      }
      formData.append('warranty', newProduct.value.warranty || '');
      formData.append('color', newProduct.value.color || '');

      try {
        if (newProduct.value.id) {
          await apiService.updateProduct(newProduct.value.id, formData);
        } else {
          await apiService.createProduct(formData);
        }
        showModal.value = false;
        resetForm();
        fetchProducts();
      } catch (error) {
        console.error(error);
        alert("Erreur lors de l'enregistrement du produit");
      }
    };

    const resetForm = () => {
      newProduct.value = {
        id: 2,
        name: '',
        category: '',
        description: '',
        price: 0,
        stock: 0,
        warranty: '',
        color: '',
        imageFile: null,
      };
      imagePreview.value = null;
    };

    const editProduct = (product: Product) => {
      newProduct.value = { ...product, imageFile: null };
      imagePreview.value = product.imageUrl ?? null;
      showModal.value = true;
    };

    const deleteProduct = async (id: number) => {
      if (!confirm('Supprimer ce produit ?')) return;
      try {
        await apiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la suppression");
      }
    };

    onMounted(fetchProducts);

    return {
      showModal,
      imagePreview,
      products,
      newProduct,
      fetchProducts,
      handleImageUpload,
      handleSubmit,
      resetForm,
      editProduct,
      deleteProduct
    };
  }
});
</script>

<style scoped>
@import "../../assets/css/ProduitComponent.css";
</style>
