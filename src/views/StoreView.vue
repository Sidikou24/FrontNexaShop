<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: !isSidebarOpen }">
      <h1 class="logo">NexaShop</h1>
      <nav>
        <ul>
          <li @click="activeTab = 'aperçu'" :class="{active: activeTab === 'aperçu'}">
            <i class="fas fa-tachometer-alt"></i> <span>Dashboard</span>
          </li>
          <li @click="activeTab = 'produits'" :class="{active: activeTab === 'produits'}">
            <i class="fas fa-box"></i> <span>Produits</span>
          </li>
          <li @click="activeTab = 'commandes'" :class="{active: activeTab === 'commandes'}">
            <i class="fas fa-shopping-cart"></i> <span>Commandes</span>
          </li>
          <router-link to="/settings" custom v-slot="{ navigate }">
            <li @click="navigate" @keypress.enter="navigate" role="link">
              <i class="fas fa-cog"></i> <span>Paramètre</span>
            </li>
          </router-link>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="main-header" >
        <button class="toggle-btn" @click="isSidebarOpen = !isSidebarOpen">
          <i class="fas" :class="isSidebarOpen ? 'fa-bars' : 'fa-times'"></i>
        </button>
        <h2 style="color:white;">{{ getHeaderTitle() }}</h2>
          <div class="header-actions">
            <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Rechercher...">
          </div>
          <div class="user-profile">
            <img src="/assets/images/person_3.jpg" alt="Profile">
          </div>
        </div>
      </header>
      
      
      <main>
        <DashboardComponent 
          v-if="activeTab === 'aperçu'"
          :statsAperçu="statsAperçu"
          :recentOrders="recentOrders"
          :selectedTimeRange="selectedTimeRange"
          :barSeries="barSeries"
          :barChartOptions="barChartOptions"
          :pieSeries="pieSeries"
          :pieChartOptions="pieChartOptions"
          @updateChartsData="updateChartsData"
        />
                
        <!-- Products Management -->
        <ProduitComponent 
          v-if="activeTab === 'produits'"
          :products="products"
          :isModalVisible="isModalVisible"
          :isEditing="isEditing"
          :productForm="productForm"
          :imagePreview="imagePreview"
          @showAddProductModal="showAddProductModal"
          @editProduct="editProduct"
          @deleteProduct="deleteProduct"
          @saveProduct="saveProduct"
          @closeModal="closeModal"
          @imageUpload="(preview) => imagePreview = preview"
        />
      </main>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import ProduitComponent from '@/components/CommerçantComponents/ProduitComponent.vue';
import DashboardComponent from '@/components/CommerçantComponents/DashboardComponent.vue';

export default {
  name: "ProfessionalDashboard",
    components: {
    apexchart: VueApexCharts,
    ProduitComponent,
    DashboardComponent
  },
  data() {
    return {
      isSidebarOpen: true,
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
        image: null
      },
      imagePreview: null,
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
      this.productForm = { id: null, name: "", price: 0, stock: 0, image: null };
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
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
          this.productForm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
