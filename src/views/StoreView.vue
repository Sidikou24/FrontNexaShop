<template>
    <div class="store-view">
      <!-- En-tête de la page -->
      <header>
        <h1>Gestion de boutique</h1>
      </header>
  
      <!-- Contenu principal -->
      <main>
        <p>Bienvenue sur la page de gestion de votre boutique.</p>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "StoreView", // Nom du composant
  };
  </script>
  
  <style scoped>
  /* Style pour la page */
  .store-view {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }
  
  main p {
    font-size: 1.2rem;
    color: #666;
  }
  </style>