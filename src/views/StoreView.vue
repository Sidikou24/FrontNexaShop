<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h1>Bienvenue dans votre boutique<br><span>Nom de la boutique</span></h1>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li @click="activeTab = 'aperçu'" :class="{active: activeTab === 'aperçu'}">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </li>
          <li @click="activeTab = 'produits'" :class="{active: activeTab === 'produits'}">
            <i class="fas fa-box"></i> Produits
          </li>
          <li @click="activeTab = 'commandes'" :class="{active: activeTab === 'commandes'}">
            <i class="fas fa-shopping-cart"></i> Commandes
          </li>
          <li @click="activeTab = 'parametres'" :class="{active: activeTab === 'parametres'}">
            <i class="fas fa-cog"></i> Paramètres
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <header class="main-header">
        <h2>{{ getHeaderTitle() }}</h2>
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Rechercher...">
          </div>
          <div class="user-profile">
            <img src="https://via.placeholder.com/40" alt="Profile">
          </div>
        </div>
      </header>

      <main>
        <!-- Dashboard Overview -->
        <div v-if="activeTab === 'aperçu'" class="dashboard-overview">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card sales">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-info">
                <h3>Ventes totales</h3>
                <p class="stat-value">{{ statsAperçu.ventesTotales }}</p>
                <p class="stat-change positive">↑ +15% vs mois dernier</p>
              </div>
            </div>

            <div class="stat-card orders">
              <div class="stat-icon">
                <i class="fas fa-shopping-bag"></i>
              </div>
              <div class="stat-info">
                <h3>Commandes</h3>
                <p class="stat-value">{{ statsAperçu.commandesAujourdhui }}</p>
                <p class="stat-change positive">↑ +3 vs hier</p>
              </div>
            </div>

            <div class="stat-card products">
              <div class="stat-icon">
                <i class="fas fa-cubes"></i>
              </div>
              <div class="stat-info">
                <h3>Produits actifs</h3>
                <p class="stat-value">{{ statsAperçu.produitsActifs }}</p>
                <p class="stat-change neutral">2 en rupture</p>
              </div>
            </div>

            <div class="stat-card visitors">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h3>Visiteurs</h3>
                <p class="stat-value">{{ statsAperçu.visiteurs }}</p>
                <p class="stat-change negative">↓ -8% vs semaine dernière</p>
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="charts-section">
            <div class="charts-header">
              <h3>Analyse des ventes</h3>
              <select v-model="selectedTimeRange" @change="updateChartsData">
                <option value="30">30 derniers jours</option>
                <option value="7">7 derniers jours</option>
                <option value="year">Cette année</option>
              </select>
            </div>
            
            <div class="charts-grid">
              <div class="chart-container">
                <h4>Évolution des ventes</h4>
                <apexchart width="100%" height="350" type="bar" :options="barChartOptions" :series="barSeries"></apexchart>
              </div>
              
              <div class="chart-container">
                <h4>Répartition par catégorie</h4>
                <apexchart width="100%" height="350" type="pie" :options="pieChartOptions" :series="pieSeries"></apexchart>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="recent-orders">
            <div class="orders-header">
              <h3>Commandes récentes</h3>
              <button>Voir tout</button>
            </div>
            <div class="orders-list">
              <div class="order-item" v-for="(order, index) in recentOrders" :key="index">
                <div class="order-id">#{{ order.id }}</div>
                <div class="order-date">{{ order.date }}</div>
                <div class="order-amount">{{ order.amount }} fcfa</div>
                <div class="order-status" :class="order.status">{{ order.statusText }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Management -->
        <div v-if="activeTab === 'produits'" class="produits-section">
          <h2>Gestion des produits</h2>
          <div class="actions">
            <button @click="showAddProductModal">Ajouter un produit</button>
          </div>
          <div class="product-list">
            <div class="product-item" v-for="product in products" :key="product.id">
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>Prix: {{ product.price }} fcfa</p>
                <p>Stock: {{ product.stock }}</p>
              </div>
              <div class="product-actions">
                <button @click="editProduct(product)">Modifier</button>
                <button @click="deleteProduct(product.id)">Supprimer</button>
              </div>
            </div>
          </div>

          <!-- Modal pour ajouter un produit -->
          <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <h3>{{ isEditing ? 'Modifier le produit' : 'Ajouter un produit' }}</h3>
        <input v-model="productForm.name" placeholder="Nom du produit" />
        <input v-model="productForm.price" placeholder="Prix" type="number" />
        <input v-model="productForm.stock" placeholder="Quantité en stock" type="number" />
        <button @click="saveProduct">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
        <button @click="closeModal">Annuler</button>
      </div>
</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ProfessionalDashboard",
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      activeTab: "aperçu",
      selectedTimeRange: "30",
      statsAperçu: {
        ventesTotales: "240.000 fcfa",
        commandesAujourdhui: 14,
        produitsActifs: 27,
        visiteurs: 142
      },
      recentOrders: [
        { id: "1342", date: "Aujourd'hui", amount: "1500", status: "processing", statusText: "En cours" },
        { id: "1341", date: "Hier", amount: "34000", status: "shipped", statusText: "Expédié" },
        { id: "1340", date: "Hier", amount: "28000", status: "delivered", statusText: "Livré" }
      ],
      products: [
        { id: 1, name: "Produit A", price: 1000, stock: 10 },
        { id: 2, name: "Produit B", price: 2000, stock: 5 },
      ],
      isModalVisible: false,
      isEditing: false,
      productForm: {
        id: null,
        name: "",
        price: 0,
        stock: 0,
      },
      barSeries: [{
        name: "Ventes",
        data: []
      }],
      barChartOptions: {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: "Montant en FCFA"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " FCFA";
            }
          }
        },
        colors: ["#4f46e5"]
      },
      pieSeries: [],
      pieChartOptions: {
        chart: {
          type: 'pie',
        },
        labels: ["Électronique", "Vêtements", "Alimentation", "Maison", "Autres"],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        colors: ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"]
      }
    };
  },
  methods: {
    getHeaderTitle() {
      const titles = {
        aperçu: "Aperçu de votre activité",
        produits: "Gestion des produits",
        commandes: "Suivi des commandes",
        parametres: "Paramètres du compte"
      };
      return titles[this.activeTab] || "";
    },
    updateChartsData() {
      if (this.selectedTimeRange === "7") {
        this.barSeries = [{
          name: "Ventes",
          data: [120, 140, 145, 150, 149, 160, 170]
        }];
        this.barChartOptions.xaxis.categories = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
        this.pieSeries = [35, 40, 15, 5, 5];
      } else if (this.selectedTimeRange === "30") {
        this.barSeries = [{
          name: "Ventes",
          data: Array.from({length: 30}, () => Math.floor(Math.random() * 200) + 50)
        }];
        this.barChartOptions.xaxis.categories = Array.from({length: 30}, (_, i) => `J${i+1}`);
        this.pieSeries = [44, 55, 41, 17, 15];
      } else {
        this.barSeries = [{
          name: "Ventes",
          data: [1250, 1300, 1200, 1100, 1000, 950, 900, 850, 800, 750, 700, 650]
        }];
        this.barChartOptions.xaxis.categories = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
        this.pieSeries = [120, 90, 70, 50, 30];
      }
    },
    showAddProductModal() {
      this.isEditing = false;
      this.productForm = { id: null, name: "", price: 0, stock: 0 };
      this.isModalVisible = true;
    },
    editProduct(product) {
      this.isEditing = true;
      this.productForm = { ...product };
      this.isModalVisible = true;
    },
    deleteProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId);
    },
    saveProduct() {
      if (this.isEditing) {
        const index = this.products.findIndex(p => p.id === this.productForm.id);
        this.products[index] = { ...this.productForm };
      } else {
        const newProduct = { ...this.productForm, id: Date.now() };
        this.products.push(newProduct);
      }
      this.closeModal();
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  mounted() {
    this.updateChartsData();
  }
};
</script>
<style scoped>
@import "../assets/css/dashbord-style.css";
</style>

<!-- Add in your head tag -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>