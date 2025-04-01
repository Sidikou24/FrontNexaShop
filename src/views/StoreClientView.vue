<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100">
      <!-- En-tête -->
      <header class="w-full bg-white shadow-md p-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">Nom de la Boutique</h1>
          <div class="flex space-x-4">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              class="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Rechercher
            </button>
          </div>
        </div>
      </header>
  
      <!-- Contenu principal -->
      <main class="flex-1 container mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Carte Produit -->
          <div v-for="produit in produits" :key="produit.id" class="bg-white rounded-lg shadow-md overflow-hidden">
            <img :src="produit.image" alt="Produit" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h2 class="text-lg font-medium text-gray-800">{{ produit.nom }}</h2>
              <p class="text-gray-600 mt-2">{{ produit.description }}</p>
              <p class="text-blue-600 font-bold mt-4">{{ produit.prix }} fcfa</p>
              <button class="mt-4 w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Pied de page -->
      <footer class="w-full bg-gray-800 text-white p-4 mt-8">
        <div class="container mx-auto text-center">
          <p>&copy; 2023 Nom de la Boutique. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShopPage',
    data() {
      return {
        produits: [
          {
            id: 1,
            nom: 'Produit 1',
            description: 'Description du produit 1.',
            prix: '10000',
            image: 'https://via.placeholder.com/300'
          },
          {
            id: 2,
            nom: 'Produit 2',
            description: 'Description du produit 2.',
            prix: '15000',
            image: 'https://via.placeholder.com/300'
          },
          {
            id: 3,
            nom: 'Produit 3',
            description: 'Description du produit 3.',
            prix: '20000',
            image: 'https://via.placeholder.com/300'
          }
          // Ajoutez plus de produits ici
        ]
      };
    }
  };
  </script>
  
  <style>
@import "../assets/css/dashbord-style.css";


  </style>
  