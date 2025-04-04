<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h1>Tableau de bord<br><span>Administrateur</span></h1>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li @click="activeTab = 'aperçu'" :class="{active: activeTab === 'aperçu'}">
            <i class="fas fa-tachometer-alt"></i> Aperçu
          </li>
          <li @click="activeTab = 'boutiques'" :class="{active: activeTab === 'boutiques'}">
            <i class="fas fa-store"></i> Boutiques
          </li>
          <li @click="activeTab = 'transactions'" :class="{active: activeTab === 'transactions'}">
            <i class="fas fa-exchange-alt"></i> Transactions
          </li>
          <li @click="activeTab = 'rapports'" :class="{active: activeTab === 'rapports'}">
            <i class="fas fa-chart-pie"></i> Rapports
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
            <div class="stat-card boutiques">
              <div class="stat-icon">
                <i class="fas fa-store"></i>
              </div>
              <div class="stat-info">
                <h3>Boutiques actives</h3>
                <p class="stat-value">{{ adminStats.boutiquesActives }}</p>
                <p class="stat-change positive">↑ +12% ce mois</p>
              </div>
            </div>

            <div class="stat-card boutiquiers">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h3>Boutiquiers inscrits</h3>
                <p class="stat-value">{{ adminStats.boutiquiersInscrits }}</p>
                <p class="stat-change positive">↑ +8% ce mois</p>
              </div>
            </div>

            <div class="stat-card transactions">
              <div class="stat-icon">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="stat-info">
                <h3>Transactions totales</h3>
                <p class="stat-value">{{ formatCurrency(adminStats.transactionsTotales) }}</p>
                <p class="stat-change positive">↑ +22% vs mois dernier</p>
              </div>
            </div>

            <div class="stat-card revenus">
              <div class="stat-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="stat-info">
                <h3>Revenus plateforme</h3>
                <p class="stat-value">{{ formatCurrency(adminStats.revenusPlateforme) }}</p>
                <p class="stat-change positive">↑ +18% vs mois dernier</p>
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="charts-section">
            <div class="charts-header">
              <h3>Analyse des performances</h3>
              <select v-model="selectedTimeRange" @change="updateChartsData">
                <option value="30">30 derniers jours</option>
                <option value="7">7 derniers jours</option>
                <option value="year">Cette année</option>
              </select>
            </div>
            
            <div class="charts-grid">
              <div class="chart-container">
                <h4>Évolution des transactions</h4>
                <apexchart width="100%" height="350" type="area" :options="areaChartOptions" :series="areaSeries"></apexchart>
              </div>
              
              <div class="chart-container">
                <h4>Répartition par boutique</h4>
                <apexchart width="100%" height="350" type="donut" :options="donutChartOptions" :series="donutSeries"></apexchart>
              </div>
            </div>
          </div>

          <!-- Top Boutiques -->
          <div class="top-boutiques">
            <div class="section-header">
              <h3>Top 5 des boutiques</h3>
              <button @click="activeTab = 'boutiques'">Voir toutes</button>
            </div>
            <div class="boutiques-list">
              <div class="boutique-item" v-for="(boutique, index) in topBoutiques" :key="index">
                <div class="boutique-rank">{{ index + 1 }}</div>
                <div class="boutique-info">
                  <h4>{{ boutique.nom }}</h4>
                  <p>{{ boutique.vendeur }}</p>
                </div>
                <div class="boutique-stats">
                  <div class="stat">
                    <i class="fas fa-chart-line"></i>
                    <span>{{ formatCurrency(boutique.chiffreAffaire) }}</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-shopping-bag"></i>
                    <span>{{ boutique.transactions }}</span>
                  </div>
                </div>
                <div class="boutique-actions">
                  <button @click="viewBoutique(boutique.id)">
                    <i class="fas fa-eye"></i> Voir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Boutiques Management -->
        <div v-if="activeTab === 'boutiques'" class="boutiques-section">
          <div class="section-header">
            <h2>Gestion des boutiques</h2>
            <div class="header-actions">
              <button @click="showAddBoutiqueModal">
                <i class="fas fa-plus"></i> Ajouter boutique
              </button>
            </div>
          </div>
          
          <div class="filters">
            <select v-model="boutiqueFilter.status">
              <option value="all">Tous les statuts</option>
              <option value="active">Actives</option>
              <option value="inactive">Inactives</option>
              <option value="suspended">Suspendues</option>
            </select>
            <input v-model="boutiqueFilter.search" placeholder="Rechercher une boutique...">
          </div>
          
          <div class="boutiques-table">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Propriétaire</th>
                  <th>Statut</th>
                  <th>Transactions</th>
                  <th>CA (30j)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="boutique in filteredBoutiques" :key="boutique.id">
                  <td>{{ boutique.nom }}</td>
                  <td>{{ boutique.proprietaire }}</td>
                  <td>
                    <span :class="'status-' + boutique.statut">{{ getStatusText(boutique.statut) }}</span>
                  </td>
                  <td>{{ boutique.transactions }}</td>
                  <td>{{ formatCurrency(boutique.chiffreAffaire) }}</td>
                  <td class="actions">
                    <button @click="editBoutique(boutique)" class="btn-edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      @click="toggleBoutiqueStatus(boutique)" 
                      :class="['btn-status', boutique.statut === 'active' ? 'btn-deactivate' : 'btn-activate']"
                    >
                      <i :class="boutique.statut === 'active' ? 'fas fa-times-circle' : 'fas fa-check-circle'"></i>
                    </button>
                    <button @click="viewBoutique(boutique.id)" class="btn-view">
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span>Page {{ currentPage }} sur {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- Modal pour gérer les boutiques -->
          <div v-if="showBoutiqueModal" class="modal">
            <div class="modal-content">
              <h3>{{ isEditingBoutique ? 'Modifier la boutique' : 'Ajouter une boutique' }}</h3>
              <div class="form-group">
                <label>Nom de la boutique</label>
                <input v-model="boutiqueForm.nom" placeholder="Nom">
              </div>
              <div class="form-group">
                <label>Propriétaire</label>
                <select v-model="boutiqueForm.proprietaireId">
                  <option v-for="user in users" :value="user.id" :key="user.id">
                    {{ user.nom }} ({{ user.email }})
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Catégorie</label>
                <select v-model="boutiqueForm.categorie">
                  <option value="alimentation">Alimentation</option>
                  <option value="vetements">Vêtements</option>
                  <option value="electronique">Électronique</option>
                  <option value="maison">Maison</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div class="form-group">
                <label>Statut</label>
                <select v-model="boutiqueForm.statut">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspendue</option>
                </select>
              </div>
              <div class="modal-actions">
                <button @click="saveBoutique" class="btn-save">
                  {{ isEditingBoutique ? 'Modifier' : 'Ajouter' }}
                </button>
                <button @click="closeBoutiqueModal" class="btn-cancel">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Transactions Management -->
        <div v-if="activeTab === 'transactions'" class="transactions-section">
          <div class="section-header">
            <h2>Gestion des transactions</h2>
            <div class="header-actions">
              <button @click="exportTransactions">
                <i class="fas fa-file-export"></i> Exporter
              </button>
            </div>
          </div>
          
          <div class="filters">
            <div class="filter-group">
              <label>Date de début</label>
              <input type="date" v-model="transactionFilter.startDate">
            </div>
            <div class="filter-group">
              <label>Date de fin</label>
              <input type="date" v-model="transactionFilter.endDate">
            </div>
            <div class="filter-group">
              <label>Statut</label>
              <select v-model="transactionFilter.status">
                <option value="all">Tous</option>
                <option value="completed">Complétées</option>
                <option value="pending">En attente</option>
                <option value="failed">Échouées</option>
              </select>
            </div>
            <button @click="applyTransactionFilters" class="btn-apply">
              Appliquer
            </button>
          </div>
          
          <div class="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Boutique</th>
                  <th>Date</th>
                  <th>Montant</th>
                  <th>Commission</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                  <td>#{{ transaction.id }}</td>
                  <td>{{ transaction.boutique }}</td>
                  <td>{{ formatDate(transaction.date) }}</td>
                  <td>{{ formatCurrency(transaction.montant) }}</td>
                  <td>{{ formatCurrency(transaction.commission) }}</td>
                  <td>
                    <span :class="'status-' + transaction.statut">
                      {{ getTransactionStatusText(transaction.statut) }}
                    </span>
                  </td>
                  <td class="actions">
                    <button @click="viewTransaction(transaction.id)" class="btn-view">
                      <i class="fas fa-eye"></i> Détails
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <button @click="prevTransactionPage" :disabled="currentTransactionPage === 1">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span>Page {{ currentTransactionPage }} sur {{ totalTransactionPages }}</span>
            <button @click="nextTransactionPage" :disabled="currentTransactionPage === totalTransactionPages">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Rapports -->
        <div v-if="activeTab === 'rapports'" class="rapports-section">
          <div class="section-header">
            <h2>Rapports analytiques</h2>
            <div class="header-actions">
              <button @click="generateReport">
                <i class="fas fa-file-pdf"></i> Générer PDF
              </button>
            </div>
          </div>
          
          <div class="rapports-grid">
            <div class="rapport-card">
              <h3>Performances globales</h3>
              <div class="rapport-content">
                <apexchart width="100%" height="300" type="radar" :options="radarChartOptions" :series="radarSeries"></apexchart>
              </div>
              <button @click="exportPerformanceData">
                <i class="fas fa-download"></i> Exporter données
              </button>
            </div>
            
            <div class="rapport-card">
              <h3>Tendances mensuelles</h3>
              <div class="rapport-content">
                <apexchart width="100%" height="300" type="line" :options="lineChartOptions" :series="lineSeries"></apexchart>
              </div>
              <button @click="exportTrendsData">
                <i class="fas fa-download"></i> Exporter données
              </button>
            </div>
            
            <div class="rapport-card full-width">
              <h3>Analyse des transactions</h3>
              <div class="rapport-content">
                <apexchart width="100%" height="350" type="heatmap" :options="heatmapChartOptions" :series="heatSeries"></apexchart>
              </div>
              <div class="rapport-actions">
                <button @click="exportTransactionAnalysis">
                  <i class="fas fa-download"></i> Exporter analyse
                </button>
                <button @click="showTransactionInsights">
                  <i class="fas fa-lightbulb"></i> Voir insights
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Paramètres -->
        <div v-if="activeTab === 'parametres'" class="parametres-section">
          <h2>Paramètres administratifs</h2>
          
          <div class="settings-grid">
            <div class="settings-card">
              <h3><i class="fas fa-percentage"></i> Commission</h3>
              <div class="setting-item">
                <label>Taux de commission (%)</label>
                <input type="number" v-model="settings.commissionRate" min="0" max="30">
              </div>
              <div class="setting-item">
                <label>Commission minimale</label>
                <input type="number" v-model="settings.minCommission" min="0">
              </div>
              <button @click="saveCommissionSettings" class="btn-save">
                Enregistrer
              </button>
            </div>
            
            <div class="settings-card">
              <h3><i class="fas fa-bell"></i> Notifications</h3>
              <div class="setting-item">
                <label>Alertes transactions</label>
                <toggle-button v-model="settings.transactionAlerts"/>
              </div>
              <div class="setting-item">
                <label>Alertes boutiques</label>
                <toggle-button v-model="settings.boutiqueAlerts"/>
              </div>
              <div class="setting-item">
                <label>Email de rapport</label>
                <input type="email" v-model="settings.reportEmail">
              </div>
              <button @click="saveNotificationSettings" class="btn-save">
                Enregistrer
              </button>
            </div>
            
            <div class="settings-card full-width">
              <h3><i class="fas fa-shield-alt"></i> Sécurité</h3>
              <div class="security-settings">
                <div class="setting-item">
                  <label>Authentification à deux facteurs</label>
                  <toggle-button v-model="settings.twoFactorAuth"/>
                </div>
                <div class="setting-item">
                  <label>Changer le mot de passe</label>
                  <button @click="showChangePasswordModal" class="btn-change-password">
                    Modifier
                  </button>
                </div>
                <div class="setting-item">
                  <label>Journal d'activité</label>
                  <button @click="viewActivityLog" class="btn-view-log">
                    Voir les logs
                  </button>
                </div>
              </div>
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
  name: "AdminDashboard",
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      activeTab: "aperçu",
      selectedTimeRange: "30",
      currentPage: 1,
      itemsPerPage: 10,
      currentTransactionPage: 1,
      transactionsPerPage: 10,
      adminStats: {
        boutiquesActives: 142,
        boutiquiersInscrits: 165,
        transactionsTotales: 1254300,
        revenusPlateforme: 376290,
        transactionsMensuelles: 3245,
        nouvellesBoutiques: 18,
        tauxConversion: 4.2
      },
      topBoutiques: [
        { id: 1, nom: "Boutique Excellence", vendeur: "Jean Dupont", chiffreAffaire: 125000, transactions: 142 },
        { id: 2, nom: "Électronique Pro", vendeur: "Marie Lambert", chiffreAffaire: 118000, transactions: 135 },
        { id: 3, nom: "Mode Élégante", vendeur: "Sophie Martin", chiffreAffaire: 98000, transactions: 121 },
        { id: 4, nom: "Alimentation Santé", vendeur: "Paul Bernard", chiffreAffaire: 87500, transactions: 98 },
        { id: 5, nom: "Maison Cosy", vendeur: "Lucie Petit", chiffreAffaire: 76500, transactions: 87 }
      ],
      boutiqueFilter: {
        status: "all",
        search: ""
      },
      boutiques: [
        { id: 1, nom: "Boutique Excellence", proprietaire: "Jean Dupont", statut: "active", transactions: 142, chiffreAffaire: 125000 },
        { id: 2, nom: "Électronique Pro", proprietaire: "Marie Lambert", statut: "active", transactions: 135, chiffreAffaire: 118000 },
        { id: 3, nom: "Mode Élégante", proprietaire: "Sophie Martin", statut: "active", transactions: 121, chiffreAffaire: 98000 },
        { id: 4, nom: "Alimentation Santé", proprietaire: "Paul Bernard", statut: "inactive", transactions: 98, chiffreAffaire: 87500 },
        { id: 5, nom: "Maison Cosy", proprietaire: "Lucie Petit", statut: "suspended", transactions: 87, chiffreAffaire: 76500 },
        // ... Ajoutez plus de boutiques pour le démo
      ],
      showBoutiqueModal: false,
      isEditingBoutique: false,
      boutiqueForm: {
        id: null,
        nom: "",
        proprietaireId: null,
        categorie: "autre",
        statut: "active"
      },
      users: [
        { id: 1, nom: "Jean Dupont", email: "jean@example.com" },
        { id: 2, nom: "Marie Lambert", email: "marie@example.com" },
        { id: 3, nom: "Sophie Martin", email: "sophie@example.com" },
        // ... autres utilisateurs
      ],
      transactionFilter: {
        startDate: null,
        endDate: null,
        status: "all",
        boutique: ""
      },
      transactions: [
        { id: 1001, boutique: "Boutique Excellence", date: "2023-05-15", montant: 15000, commission: 750, statut: "completed" },
        { id: 1002, boutique: "Électronique Pro", date: "2023-05-15", montant: 12500, commission: 625, statut: "completed" },
        { id: 1003, boutique: "Mode Élégante", date: "2023-05-14", montant: 9800, commission: 490, statut: "completed" },
        { id: 1004, boutique: "Alimentation Santé", date: "2023-05-14", montant: 7600, commission: 380, statut: "pending" },
        { id: 1005, boutique: "Maison Cosy", date: "2023-05-13", montant: 5400, commission: 270, statut: "failed" },
        // ... Ajoutez plus de transactions pour le démo
      ],
      settings: {
        commissionRate: 5,
        minCommission: 100,
        transactionAlerts: true,
        boutiqueAlerts: true,
        reportEmail: "admin@example.com",
        twoFactorAuth: true
      },
      // Options pour les graphiques
      areaSeries: [{
        name: "Transactions",
        data: []
      }],
      areaChartOptions: {
        chart: {
          type: "area",
          height: 350,
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: [],
          type: "datetime"
        },
        yaxis: {
          title: {
            text: "Montant (FCFA)"
          }
        },
        tooltip: {
          x: {
            format: "dd/MM/yy"
          },
          y: {
            formatter: function (val) {
              return val.toLocaleString() + " FCFA";
            }
          }
        },
        colors: ["#4f46e5"]
      },
      donutSeries: [],
      donutChartOptions: {
        chart: {
          type: "donut",
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }],
        colors: ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"]
      },
      radarSeries: [{
        name: "Performance",
        data: []
      }],
      radarChartOptions: {
        chart: {
          type: "radar",
          height: 350
        },
        labels: ["Transactions", "Nouvelles boutiques", "Revenus", "Satisfaction", "Conversion"],
        colors: ["#4f46e5"],
        markers: {
          size: 4,
          hover: {
            size: 6
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      },
      lineSeries: [{
        name: "Transactions",
        data: []
      }],
      lineChartOptions: {
        chart: {
          type: "line",
          height: 350
        },
        stroke: {
          curve: "smooth",
          width: 3
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: "Nombre de transactions"
          }
        },
        colors: ["#4f46e5"]
      },
      heatSeries: [{
        name: "Transactions",
        data: []
      }],
      heatmapChartOptions: {
        chart: {
          type: "heatmap",
          height: 350
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#a5b4fc", "#4f46e5"],
        xaxis: {
          type: "category",
          categories: []
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " transactions";
            }
          }
        }
      }
    };
  },
  computed: {
    filteredBoutiques() {
      let filtered = this.boutiques;
      
      // Filtre par statut
      if (this.boutiqueFilter.status !== "all") {
        filtered = filtered.filter(b => b.statut === this.boutiqueFilter.status);
      }
      
      
      
      // Pagination
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return filtered.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.boutiques.length / this.itemsPerPage);
    },
    filteredTransactions() {
      let filtered = this.transactions;
      
      // Filtre par statut
      if (this.transactionFilter.status !== "all") {
        filtered = filtered.filter(t => t.statut === this.transactionFilter.status);
      }
      
      // Filtre par date
      if (this.transactionFilter.startDate) {
        filtered = filtered.filter(t => t.date >= this.transactionFilter.startDate);
      }
      
      if (this.transactionFilter.endDate) {
        filtered = filtered.filter(t => t.date <= this.transactionFilter.endDate);
      }
      
      // Pagination
      const start = (this.currentTransactionPage - 1) * this.transactionsPerPage;
      return filtered.slice(start, start + this.transactionsPerPage);
    },
    totalTransactionPages() {
      return Math.ceil(this.transactions.length / this.transactionsPerPage);
    }
  },
  methods: {
    getHeaderTitle() {
      const titles = {
        aperçu: "Aperçu administratif",
        boutiques: "Gestion des boutiques",
        transactions: "Suivi des transactions",
        rapports: "Rapports analytiques",
        parametres: "Paramètres administratifs"
      };
      return titles[this.activeTab] || "";
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("fr-FR", { 
        style: "currency", 
        currency: "XOF" 
      }).format(value).replace("XOF", "FCFA");
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    },
    getStatusText(status) {
      const statusText = {
        active: "Active",
        inactive: "Inactive",
        suspended: "Suspendue"
      };
      return statusText[status] || status;
    },
    getTransactionStatusText(status) {
      const statusText = {
        completed: "Complétée",
        pending: "En attente",
        failed: "Échouée"
      };
      return statusText[status] || status;
    },
    updateChartsData() {
      // Mise à jour des données des graphiques en fonction de la période sélectionnée
      if (this.selectedTimeRange === "7") {
        this.areaSeries = [{
          name: "Transactions",
          data: [12000, 19000, 15000, 18000, 21000, 25000, 22000]
        }];
        this.areaChartOptions.xaxis.categories = [
          "2023-05-09", "2023-05-10", "2023-05-11", 
          "2023-05-12", "2023-05-13", "2023-05-14", "2023-05-15"
        ];
        
        this.donutSeries = [35, 25, 20, 15, 5];
        this.donutChartOptions.labels = [
          "Boutique Excellence", 
          "Électronique Pro", 
          "Mode Élégante", 
          "Alimentation Santé", 
          "Autres"
        ];
      } else if (this.selectedTimeRange === "30") {
        this.areaSeries = [{
          name: "Transactions",
          data: Array.from({length: 30}, () => Math.floor(Math.random() * 30000) + 5000)
        }];
        this.areaChartOptions.xaxis.categories = Array.from({length: 30}, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - 30 + i);
          return date.toISOString().split("T")[0];
        });
        
        this.donutSeries = [30, 22, 18, 15, 15];
        this.donutChartOptions.labels = [
          "Électronique", 
          "Vêtements", 
          "Alimentation", 
          "Maison", 
          "Autres"
        ];
      } else {
        this.areaSeries = [{
          name: "Transactions",
          data: [125000, 130000, 120000, 110000, 100000, 95000, 90000, 85000, 80000, 75000, 70000, 65000]
        }];
        this.areaChartOptions.xaxis.categories = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
        
        this.donutSeries = [120, 90, 70, 50, 30];
        this.donutChartOptions.labels = [
          "Q1", 
          "Q2", 
          "Q3", 
          "Q4", 
          "Hors saison"
        ];
      }
      
      // Mise à jour des graphiques de rapports
      this.radarSeries = [{
        name: "Performance",
        data: [
          this.adminStats.transactionsMensuelles / 100,
          this.adminStats.nouvellesBoutiques * 2,
          this.adminStats.revenusPlateforme / 10000,
          80, // Satisfaction (simulé)
          this.adminStats.tauxConversion * 10
        ]
      }];
      
      this.lineSeries = [{
        name: "Transactions",
        data: Array.from({length: 12}, (_, i) => Math.floor(Math.random() * 200) + 50)
      }];
      this.lineChartOptions.xaxis.categories = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
      
      // Configuration du heatmap
      const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
      const hours = Array.from({length: 24}, (_, i) => i + "h");
      
      this.heatSeries = days.map(day => {
        return {
          name: day,
          data: hours.map(hour => {
            return {
              x: hour,
              y: Math.floor(Math.random() * 50) + (hour >= "8h" && hour <= "20h" ? 20 : 0)
            };
          })
        };
      });
      this.heatmapChartOptions.xaxis.categories = hours;
    },
    showAddBoutiqueModal() {
      this.isEditingBoutique = false;
      this.boutiqueForm = { 
        id: null,
        nom: "",
        proprietaireId: null,
        categorie: "autre",
        statut: "active"
      };
      this.showBoutiqueModal = true;
    },
    editBoutique(boutique) {
      this.isEditingBoutique = true;
      this.boutiqueForm = { ...boutique };
      this.showBoutiqueModal = true;
    },
    saveBoutique() {
      if (this.isEditingBoutique) {
        const index = this.boutiques.findIndex(b => b.id === this.boutiqueForm.id);
        this.boutiques[index] = { ...this.boutiqueForm };
      } else {
        const newBoutique = { 
          ...this.boutiqueForm, 
          id: Math.max(...this.boutiques.map(b => b.id)) + 1,
          transactions: 0,
          chiffreAffaire: 0
        };
        this.boutiques.push(newBoutique);
      }
      this.closeBoutiqueModal();
    },
    closeBoutiqueModal() {
      this.showBoutiqueModal = false;
    },
    toggleBoutiqueStatus(boutique) {
      const newStatus = boutique.statut === "active" ? "inactive" : "active";
      const index = this.boutiques.findIndex(b => b.id === boutique.id);
      this.boutiques[index].statut = newStatus;
    },
    viewBoutique(id) {
      console.log("Voir boutique:", id);
      // Ici vous pourriez naviguer vers une page détaillée ou ouvrir un modal
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    applyTransactionFilters() {
      this.currentTransactionPage = 1; // Reset à la première page
    },
    prevTransactionPage() {
      if (this.currentTransactionPage > 1) this.currentTransactionPage--;
    },
    nextTransactionPage() {
      if (this.currentTransactionPage < this.totalTransactionPages) this.currentTransactionPage++;
    },
    viewTransaction(id) {
      console.log("Voir transaction:", id);
      // Ici vous pourriez naviguer vers une page détaillée ou ouvrir un modal
    },
    exportTransactions() {
      console.log("Exportation des transactions...");
      // Ici vous pourriez implémenter l'export CSV/Excel
    },
    generateReport() {
      console.log("Génération du rapport PDF...");
      // Ici vous pourriez implémenter la génération de PDF
    },
    exportPerformanceData() {
      console.log("Export des données de performance...");
    },
    exportTrendsData() {
      console.log("Export des données de tendances...");
    },
    exportTransactionAnalysis() {
      console.log("Export de l'analyse des transactions...");
    },
    showTransactionInsights() {
      console.log("Affichage des insights...");
    },
    saveCommissionSettings() {
      console.log("Enregistrement des paramètres de commission...");
      alert("Paramètres de commission enregistrés avec succès!");
    },
    saveNotificationSettings() {
      console.log("Enregistrement des paramètres de notification...");
      alert("Paramètres de notification enregistrés avec succès!");
    },
    showChangePasswordModal() {
      console.log("Ouverture du modal de changement de mot de passe...");
    },
    viewActivityLog() {
      console.log("Affichage du journal d'activité...");
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

<!-- Ajoutez dans votre balise head -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">