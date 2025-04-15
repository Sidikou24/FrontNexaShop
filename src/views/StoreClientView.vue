<template>
  <div>
    <GlobalNavbar />
    <main class="store-client-view">
      <div class="store-header">
        <h1 class="store-title">Nom de la Boutique</h1>
        <div class="search-filter-container">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Entrer le nom d'un produit pour voir s'il existe dans cette boutique..."
              class="search-input"
              @input="handleSearch"
            />
            <i class="bi bi-search search-icon"></i>
          </div>
          <select v-model="selectedCategory" class="category-select">
            <option value="">Toutes les Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <div class="products-grid">
        <ProductItemCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product-id="product.id"
          :product-title="product.name"
          :product-category="product.category"
          :product-price="product.price"
          :product-image="product.image"
          :class="{ 'favorite': product.isFavorite }"
          @favorite="toggleFavorite(product.id)"
        />
      </div>
    </main>
    <GlobalFooter />
  </div>
</template>

<script>
import ProductItemCard from '@/components/productsComponent/ProductItemCard.vue'
import GlobalNavbar from '@/components/headerComponents/GlobalNavbar.vue'
import GlobalFooter from '@/components/footerComponents/GlobalFooter.vue'

export default {
  name: 'StoreClientView',
  components: {
    ProductItemCard,
    GlobalNavbar,
    GlobalFooter
  },
  data() {
    return {
      searchQuery: '',
      errorMessage: '',
      successMessage: '',
      selectedCategory: '',
      categories: ['Electronics', 'Vêtement', 'Maison', 'Beauté', 'Sports'],
      products: [
        {
          id: 1,
          name: 'Casque sans fil',
          category: 'Electronics',
          price: '15.000',
          image: '/assets/images/OIP.jpeg',
          isFavorite: false
        },
        {
          id: 2,
          name: 'Montre intelligente',
          category: 'Electronics',
          price: '25.000',
          image: '/assets/images/montre.jpeg',
          isFavorite: false
        },
        {
          id: 3,
          name: 'Chaussures sport',
          category: 'Sports',
          price: '10.000',
          image: '/assets/images/shoes.jpeg',
          isFavorite: false
        },
        {
          id: 4,
          name: 'Cotton T-Shirt',
          category: 'Vêtement',
          price: '5.000',
          image: '/assets/images/Tshirt.jpeg',
          isFavorite: false
        },
        {
          id: 5,
          name: 'Mixer',
          category: 'Maison',
          price: '12.000',
          image: '/assets/images/Mixer.jpeg',
          isFavorite: false
        },
        {
          id: 6,
          name: 'Parfum',
          category: 'Beauté',
          price: '12.000',
          image: '/assets/images/parfum.jpeg',
          isFavorite: false
        }
      ],
      searchTimeout: null
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory
        return matchesSearch && matchesCategory
      })
    } 
  },
  methods: {
    handleSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        // Search logic handled in computed property
      }, 300)
    },
    toggleFavorite(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.isFavorite = !product.isFavorite
      }
    }
  }
}
</script>

<style scoped>
.store-client-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.store-header {
  margin-bottom: 2rem;
  text-align: center;
}

.store-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.store-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}

.category-select {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 200px;
}

.category-select:focus {
  outline: none;
  border-color: #42b983;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.favorite :deep(.bi-heart) {
  color: red;
  opacity: 1;
}
</style>