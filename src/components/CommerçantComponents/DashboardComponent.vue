<template>
  <div class="dashboard-overview">
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
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "DashboardComponent",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    statsAperçu: {
      type: Object,
      required: true
    },
    recentOrders: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTimeRange: "30",
      barSeries: [{ name: "Ventes", data: [] }],
      barChartOptions: {
        chart: { type: "bar", height: 350 },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ["transparent"] },
        xaxis: { categories: [] },
        yaxis: { title: { text: "Montant en FCFA" } },
        fill: { opacity: 1 },
        tooltip: {
          y: { formatter: function (val) { return val + " FCFA"; } }
        },
        colors: ["#4f46e5"]
      },
      pieSeries: [],
      pieChartOptions: {
        chart: { type: 'pie' },
        labels: ["Électronique", "Vêtements", "Alimentation", "Maison", "Autres"],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: 'bottom' }
          }
        }],
        colors: ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"]
      }
    };
  },
  methods: {
    updateChartsData() {
      if (this.selectedTimeRange === "7") {
        this.barSeries = [{ name: "Ventes", data: [120, 140, 145, 150, 149, 160, 170] }];
        this.barChartOptions.xaxis.categories = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
        this.pieSeries = [35, 40, 15, 5, 5];
      } else if (this.selectedTimeRange === "30") {
        this.barSeries = [{ name: "Ventes", data: Array.from({length: 30}, () => Math.floor(Math.random() * 200) + 50) }];
        this.barChartOptions.xaxis.categories = Array.from({length: 30}, (_, i) => `J${i+1}`);
        this.pieSeries = [44, 55, 41, 17, 15];
      } else {
        this.barSeries = [{ name: "Ventes", data: [1250, 1300, 1200, 1100, 1000, 950, 900, 850, 800, 750, 700, 650] }];
        this.barChartOptions.xaxis.categories = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
        this.pieSeries = [120, 90, 70, 50, 30];
      }
    }
  },
  mounted() {
    this.updateChartsData();
  }
};
</script>

<style scoped>
/* Styles from StoreView.vue will be inherited */
@import "../../assets/css/dashbord-style.css";
</style>
