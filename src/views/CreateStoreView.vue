<template>
    <main class="form-signin w-100 m-auto pt-5">
        <div class="formbx col-lg-4 col-10 mx-auto p-lg-5 container mt-lg-0 mt-4">
            <form class="w-100 form">

                <!-- Titre -->
                <h1 class="display-6 mb-1 fw-bold d-flex align-items-center justify-content-center" align="center">
                    Créez votre boutique
                </h1>
                <p class="w-80 mb-4 mx-auto d-flex align-items-center justify-content-center opacity-50" align="center">
                    Remplissez les informations pour créer votre boutique et commencez à vendre.
                </p>

                <!-- Champ Nom -->
                <div class="form-floating my-3">
                    <input type="text" class="form-control bg-light rounded rounded-0" id="floatingNom"
                        placeholder="Nom de la boutique">
                    <label for="floatingNom" class="text-muted">Nom de la boutique</label>
                </div>

                <!-- Champ Adresse -->
                <div class="form-floating my-3">
                    <input type="text" class="form-control bg-light rounded rounded-0" id="floatingAdresse"
                        placeholder="Adresse">
                    <label for="floatingAdresse" class="text-muted">Adresse</label>
                </div>

                <!-- Champ Description -->
                <div class="form-floating my-3">
                    <textarea class="form-control bg-light rounded rounded-0" id="floatingDescription"
                        placeholder="Description" rows="4"></textarea>
                    <label for="floatingDescription" class="text-muted">Description</label>
                </div>

                <router-link 
                   class="btn btn-light primary-btn w-100 py-2 text-white d-flex align-items-center justify-content-center rounded-0 text-decoration-none">
                     Créer ma boutique
                  </router-link>

                <!-- Bouton de soumission -->
                <router-link to="/store"
                   class="btn btn-light primary-btn w-100 py-2 text-white d-flex align-items-center justify-content-center rounded-0 text-decoration-none mt-5">
                     Accèder à ma boutique 
                  </router-link>
            </form>

        </div>
    </main>
</template>

<script>
export default {
    name: "CreateBoutique",
};
</script>

<style scoped>
.formbx {
    min-width: 390px !important;
}

.line {
    height: 2px;
    background-color: #e8ecf0;
}

input.form-control:focus,
textarea.form-control:focus {
    background-color: #ffffff !important;
    border: 1px solid #0b9768 !important;
}

button:active {
    background-color: #214e4e !important;
}

.btndark:active {
    background-color: #1a1a1a !important;
}
</style>