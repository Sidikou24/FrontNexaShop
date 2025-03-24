<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md h-full">
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-xl font-bold text-gray-800">Bienvenue dans votre boutique  Nom de la boutique</h1>
      </div>
      <nav class="mt-4">
        <ul>
          <li
            class="px-4 py-2 cursor-pointer"
            :class="activeTab === 'aperçu' ? 'bg-gray-200 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'aperçu'"
          >
          <i class="fas fa-tachometer-alt mr-2"></i> Dashboard
          </li>
          <li
            class="px-4 py-2 cursor-pointer"
            :class="activeTab === 'produits' ? 'bg-gray-200 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'produits'"
          >
          <i class="fas fa-box mr-2"></i> Produits
          </li>
          <li
            class="px-4 py-2 cursor-pointer"
            :class="activeTab === 'commandes' ? 'bg-gray-200 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'commandes'"
          >
          <i class="fas fa-shopping-cart mr-2"></i> Commandes
          </li>
          <!--<li
            class="px-4 py-2 cursor-pointer"
            :class="activeTab === 'clients' ? 'bg-gray-200 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'clients'"
          >
            Clients
          </li>-->
          <li
            class="px-4 py-2 cursor-pointer"
            :class="activeTab === 'parametres' ? 'bg-gray-200 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'parametres'"
          >
          <i class="fas fa-cog mr-2"></i> Paramètres
          </li>
        </ul>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 overflow-auto">
      <header class="bg-white shadow-sm p-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ getHeaderTitle() }}
        </h2>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              class="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
            <span class="text-gray-700 font-medium">ok</span>
          </div>
        </div>
      </header>

      <main class="p-6">
        <!-- Contenu de l'aperçu -->
        <div v-if="activeTab === 'aperçu'">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Ventes totales (mois)</h3>
              <p class="text-2xl font-bold text-gray-800">{{ statsAperçu.ventesTotales }}</p>
              <p class="text-xs text-green-600 mt-1">↑ +15% vs mois dernier</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Commandes aujourd'hui</h3>
              <p class="text-2xl font-bold text-gray-800">{{ statsAperçu.commandesAujourdhui }}</p>
              <p class="text-xs text-green-600 mt-1">↑ +3 vs hier</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Produits actifs</h3>
              <p class="text-2xl font-bold text-gray-800">{{ statsAperçu.produitsActifs }}</p>
              <p class="text-xs text-gray-600 mt-1">2 en rupture de stock</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-2">Visiteurs aujourd'hui</h3>
              <p class="text-2xl font-bold text-gray-800">{{ statsAperçu.visiteurs }}</p>
              <p class="text-xs text-red-600 mt-1">↓ -8% vs semaine dernière</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white rounded-lg shadow p-4">
              <h3 class="font-medium text-gray-800 mb-4">Évolution des ventes</h3>
              <div class="h-64 flex items-center justify-center bg-gray-100 rounded">
                <p class="text-gray-500">Graphique d'évolution des ventes (chargé depuis le backend)</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-medium text-gray-800 mb-4">Commandes récentes</h3>
              <div class="space-y-3">
                <div class="flex justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p class="font-medium">#1342</p>
                    <p class="text-sm text-gray-500">2 produits</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium">1500fcfa</p>
                    <p class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">En cours</p>
                  </div>
                </div>
                <div class="flex justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p class="font-medium">#1341</p>
                    <p class="text-sm text-gray-500">1 produit</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium">34000fcfa</p>
                    <p class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Expédié</p>
                  </div>
                </div>
                <div class="flex justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p class="font-medium">#1340</p>
                    <p class="text-sm text-gray-500">3 produits</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium">28000fcfa</p>
                    <p class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Livré</p>
                  </div>
                </div>
              </div>
              <button class="mt-4 w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                Voir toutes les commandes →
              </button>
            </div>
          </div>
        </div>

        <!-- Contenu des produits -->
        <div v-if="activeTab === 'produits'">
          <div class="flex justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium">Liste des produits</h3>
              <p class="text-sm text-gray-500">Gérez votre catalogue de produits</p>
            </div>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Ajouter un produit
            </button>
          </div>

          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="flex border-b p-4 bg-gray-50 text-sm font-medium text-gray-600">
              <div class="w-16">Image</div>
              <div class="flex-1">Nom du produit</div>
              <div class="w-24 text-right">Prix</div>
              <div class="w-24 text-right">Stock</div>
              <div class="w-24 text-right">Statut</div>
              <div class="w-24 text-right">Actions</div>
            </div>

            <div class="p-2 text-gray-500 text-center py-8">
              Les produits seront chargés depuis le backend
            </div>
          </div>
        </div>

        <!-- Contenu des commandes -->
        <div v-if="activeTab === 'commandes'">
          <div class="flex justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium">Commandes</h3>
              <p class="text-sm text-gray-500">Suivi et gestion des commandes</p>
            </div>
            <div class="flex space-x-2">
              <select class="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Tous les statuts</option>
                <option>En attente</option>
                <option>En cours</option>
                <option>Expédié</option>
                <option>Livré</option>
                <option>Annulé</option>
              </select>
              <select class="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Cette semaine</option>
                <option>Ce mois</option>
                <option>Ce trimestre</option>
                <option>Cette année</option>
              </select>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="flex border-b p-4 bg-gray-50 text-sm font-medium text-gray-600">
              <div class="w-24">Commande</div>
              <div class="w-40">Date</div>
              <div class="w-40">Client</div>
              <div class="flex-1">Produits</div>
              <div class="w-24 text-right">Total</div>
              <div class="w-32 text-right">Statut</div>
              <div class="w-24 text-right">Actions</div>
            </div>

            <div class="p-2 text-gray-500 text-center py-8">
              Les commandes seront chargées depuis le backend
            </div>
          </div>
        </div>

        <!-- Contenu des clients -->
        <div v-if="activeTab === 'clients'">
          <div class="flex justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium">Vos clients</h3>
              <p class="text-sm text-gray-500">Gestion de votre clientèle</p>
            </div>
            <div class="flex space-x-2">
              <input
                type="text"
                placeholder="Rechercher un client..."
                class="px-3 py-2 border border-gray-300 rounded-lg w-64"
              >
              <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Exporter
              </button>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="flex border-b p-4 bg-gray-50 text-sm font-medium text-gray-600">
              <div class="w-40">Client</div>
              <div class="w-40">Email</div>
              <div class="w-40">Téléphone</div>
              <div class="flex-1">Adresse</div>
              <div class="w-32 text-right">Commandes</div>
              <div class="w-32 text-right">Dépenses</div>
              <div class="w-24 text-right">Actions</div>
            </div>

            <div class="p-2 text-gray-500 text-center py-8">
              Les données clients seront chargées depuis le backend
            </div>
          </div>
        </div>

        <!-- Contenu des paramètres -->
        <div v-if="activeTab === 'parametres'" class="max-w-2xl">
          <div class="mb-6">
            <h3 class="text-lg font-medium">Paramètres du compte</h3>
            <p class="text-sm text-gray-500">Configurer les paramètres de votre boutique</p>
          </div>

          <div class="bg-white shadow rounded-lg p-6 mb-6">
            <h4 class="font-medium mb-4">Informations de la boutique</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la boutique
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  v-model="boutiqueInfo.nom"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  v-model="boutiqueInfo.description"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email de contact
                </label>
                <input
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  v-model="boutiqueInfo.email"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  v-model="boutiqueInfo.telephone"
                >
              </div>
            </div>
            <button class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" @click="sauvegarderInfos">
              Enregistrer les modifications
            </button>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <h4 class="font-medium mb-4">Paramètres de livraison</h4>
            <div class="space-y-4">
              <div v-for="(methode, index) in methodesLivraison" :key="index" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p class="font-medium">{{ methode.nom }}</p>
                  <p class="text-sm text-gray-500">{{ methode.delai }}</p>
                </div>
                <div class="flex items-center">
                  <p class="font-medium mr-4">{{ methode.prix }} fcfa</p>
                  <button class="text-blue-600 hover:text-blue-800" @click="modifierMethode(index)">Modifier</button>
                </div>
              </div>
              <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" @click="ajouterMethode">
                + Ajouter une méthode de livraison
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreView',
  data() {
    return {
      activeTab: 'aperçu',
      statsAperçu: {
        ventesTotales: '240.000fcfa',
        commandesAujourdhui: 14,
        produitsActifs: 27,
        visiteurs: 142
      },
      boutiqueInfo: {
        nom: 'Ma Boutique',
        description: 'Vente de produits artisanaux de qualité.',
        email: 'contact@maboutique.fr',
        telephone: '+227 91 69 11 23'
      },
      methodesLivraison: [
        {
          nom: 'Livraison standard',
          delai: '3-5 jours ouvrables',
          prix: '1500'
        },
        {
          nom: 'Livraison express',
          delai: '1-2 jours ouvrables',
          prix: '2000'
        }
      ]
    };
  },
  methods: {
    getHeaderTitle() {
      switch (this.activeTab) {
        case 'aperçu':
          return 'Aperçu de votre activité';
        case 'produits':
          return 'Gestion des produits';
        case 'commandes':
          return 'Suivi des commandes';
        case 'clients':
          return 'Vos clients';
        case 'parametres':
          return 'Paramètres du compte';
        default:
          return '';
      }
    },
    sauvegarderInfos() {
      // Cette fonction enverra les données au backend
      alert('Informations sauvegardées');
    },
    modifierMethode(index) {
      // Dans une vraie application, ouvrirait un modal pour éditer
      alert(`Modification de la méthode ${this.methodesLivraison[index].nom}`);
    },
    ajouterMethode() {
      // Dans une vraie application, ouvrirait un modal pour ajouter
      alert('Ajout d\'une nouvelle méthode de livraison');
    }
  }
};
</script>

<style>

</style>
