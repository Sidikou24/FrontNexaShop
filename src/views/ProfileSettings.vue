<script setup>
// import_required_components
import GlobalNavbar from "@/components/headerComponents/GlobalNavbar.vue";
import LinkButton from "@/components/btnComponents/GlobalButtons/LinkButton.vue";
</script>

<style scoped>
.navbar,
.mainbanner {
    background-color: #f1f1f1 !important;
}

.accordion-collapse,
.accordion-item {
    border: none !important;
    border-radius: 0px !important;
}

.btn.bg-success-subtle:hover {
    background-color: #b5cec3 !important;
}

.btn.bg-success-subtle:active {
    background-color: #b4e6d0 !important;
}

.form-control:focus {
    border: 1px solid #10ba71 !important;
}
</style>

<template>
    <!-- Header -->
    <GlobalNavbar />
    <!-- ..Header -->


    <main>
        <!-- MainBanner -->
        <section class="mainbanner bg-banner py-5 text-center">
            <div class="container py-4">
                <div class="row py-lg-4">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-bold display-5 opacity-80">Paramétrage.</h1>
                    </div>
                </div>
            </div>
        </section>
        <!-- ../MainBanner -->


        <!-- profile-settings -->
        <div class="container col-lg-5 col-sm-12 my-5 py-5">
            <div class="settings-items accordion" id="settingsItems">
                <div class="header mb-3 px-1 py-1">
                    <h5 class="fw-bold opacity-80 text-black-emphasis">Parametre du compte</h5>
                    <p class="fw-medium text-body-tertiary">
                        Modifier les informations personnelles liées à votre compte NexaShop
                    </p>
                </div>

                <!-- Profile-Settings-Item --username -->
                <div class="settings-item accordion-item username-item">
                    <div
                        class="itemcontent d-flex justify-content-between align-items-center py-2 mt-2 border-bottom accordion-header px-1 mb-0 gap-3">
                        <div class="item-desc">
                            <h5 class="fw-bold">Modifier votre nom d'utilisateur</h5>
                            <span class="d-block fw-normal text-body-secondary">
                                Cliquez pour modifier le nom d'utilisateur affiché sur votre profil 
                                et toutes les factures d'achat de produits.</span>
                        </div>
                        <button
                            class="collapsed item-btn btn btn-success bg-success-subtle text-success-emphasis rounded rounded-1 d-flex justify-content-between align-items-center gap-2"
                            data-bs-toggle="collapse" data-bs-target="#editUserName" aria-expanded="false"
                            aria-controls="editUserName" type="button"><span>Modifier</span> <span
                                class="bi bi-pencil-square"></span></button>
                    </div>
                    <div class="item-form accordion-collapse collapse px-3 py-2 bg-light mt-0" id="editUserName"
                        data-bs-parent="#settingsItems">
                        <span class="d-block fs-5 fw-bold">Modifier le formulaire</span>
                        <span class="d-block fw-normal text-body-secondary">Entrez votre nouveau nom d'utilisateur et sauvegardez.</span>
                        <div class="form">
                            <input type="text" name="nusername" id="nusername"
                                class="form-control border border-1 rounded rounded-0 my-2"
                                placeholder="Enter a new username...">
                            <button
                                class="btn btn-success bg-success-subtle btn-sm text-success-emphasis rounded rounded-1 px-2"
                                type="button">Enregistrer</button>
                        </div>
                    </div>
                </div>
                <!-- ...Profile-Settings-Item --username -->

                <!-- Profile-Settings-Item --email -->
                <div class="settings-item accordion-item email-item">
                    <div
                        class="itemcontent d-flex justify-content-between align-items-center py-2 mt-2 border-bottom accordion-header px-1 mb-0 gap-3">
                        <div class="item-desc">
                            <h5 class="fw-bold">Modifier votre adresse email</h5>
                            <span class="d-block fw-normal text-body-secondary">
                                Cliquez pour modifier votre adresse e-mail et en ajouter une nouvelle à votre compte.</span>
                        </div>
                        <button
                            class="collapsed item-btn btn btn-success bg-success-subtle text-success-emphasis rounded rounded-1 d-flex justify-content-between align-items-center gap-2"
                            data-bs-toggle="collapse" data-bs-target="#editUserMail" aria-expanded="false"
                            aria-controls="editUserMail" type="button"><span>Modifier</span> <span
                                class="bi bi-pencil-square"></span></button>
                    </div>
                    <div class="item-form accordion-collapse collapse px-3 py-2 bg-light mt-0" id="editUserMail"
                        data-bs-parent="#settingsItems">
                        <span class="d-block fs-5 fw-bold">Modifier le formulaire</span>
                        <span class="d-block fw-normal text-body-secondary">Entrez votre nouvelle adresse email.</span>
                        <div class="form">
                            <input type="email" name="nmail" id="nmail"
                                class="form-control border border-1 rounded rounded-0 my-2" placeholder="username@mail.com">
                            <button
                                class="btn btn-success bg-success-subtle btn-sm text-success-emphasis rounded rounded-1 px-2"
                                type="button">Enregistrer</button>
                        </div>
                    </div>
                </div>
                <!-- ...Profile-Settings-Item --email -->


                <!-- Profile-Settings-Item --password -->
                <div class="settings-item accordion-item password-item">
                    <div
                        class="itemcontent d-flex justify-content-between align-items-center py-2 mt-2 border-bottom accordion-header px-1 mb-0 gap-3">
                        <div class="item-desc">
                            <h5 class="fw-bold">Créer un nouveau mot de passe</h5>
                            <span class="d-block fw-normal text-body-secondary">
                                Cliquez pour modifier votre mot de passe et en ajouter un nouveau à votre compte.</span>
                        </div>
                        <button
                            class="collapsed item-btn btn btn-success bg-success-subtle text-success-emphasis rounded rounded-1 d-flex justify-content-between align-items-center gap-2"
                            data-bs-toggle="collapse" data-bs-target="#editUserPass" aria-expanded="false"
                            aria-controls="editUserPass" type="button"><span>Modifier</span> <span
                                class="bi bi-pencil-square"></span></button>
                    </div>
                    <div class="item-form accordion-collapse collapse px-3 py-2 bg-light mt-0" id="editUserPass"
                        data-bs-parent="#settingsItems">
                        <span class="d-block fs-5 fw-bold">Modifier le formulaire</span>
                        <span class="d-block fw-normal text-body-secondary">Saisissez votre nouveau mot de passe et cliquez pour enregistrer.</span>
                        <div class="form">
                            <input type="password" name="npass" id="npass"
                                class="form-control border border-1 rounded rounded-0 my-2" placeholder="Password">

                            <input type="password" name="confpass" id="confpass"
                                class="form-control border border-1 rounded rounded-0 my-2"
                                placeholder="Confirm New Password">
                            <button
                                class="btn btn-success bg-success-subtle btn-sm text-success-emphasis rounded rounded-1 px-2"
                                type="button">Enregister</button>
                        </div>
                    </div>
                </div>
                <!-- ...Profile-Settings-Item --password -->


                <div class="header mb-3 mt-5 px-1 pt-3">
                    <h5 class="fw-bold opacity-80 text-black-emphasis">Paramètre Profil</h5>
                    <p class="fw-medium text-body-tertiary">
                        Modifier le profil lié à votre compte NexaShop
                    </p>
                </div>


                <!-- Profile-Settings-Item --profileimg -->
                <div class="settings-item accordion-item password-item mt-3">
                    <div
                        class="itemcontent d-flex justify-content-between align-items-center py-2 mt-2 border-bottom accordion-header px-1 mb-0 gap-3">
                        <div class="item-desc">
                            <h5 class="fw-bold">Changez votre image de profil</h5>
                            <span class="d-block fw-normal text-body-secondary">
                                Cliquez pour modifier l'image de profil sur votre compte d'achat.</span>
                        </div>
                        <button
                            class="collapsed item-btn btn btn-success bg-success-subtle text-success-emphasis rounded rounded-1 d-flex justify-content-between align-items-center gap-2"
                            data-bs-toggle="collapse" data-bs-target="#editUserImg" aria-expanded="false"
                            aria-controls="editUserImg" type="button"><span>Modifier</span> <span
                                class="bi bi-pencil-square"></span></button>
                    </div>
                    <div class="item-form accordion-collapse collapse px-3 py-2 bg-light mt-0" id="editUserImg"
                        data-bs-parent="#settingsItems">
                        <span class="d-block fs-5 fw-bold">Modifier le formulaire</span>
                        <span class="d-block fw-normal text-body-secondary">Cliquez pour télécharger et enregistrer votre nouvelle image de profil..</span>
                        <div class="form">
                            <input type="file" name="nimg" id="nimg"
                                class="form-control border border-1 rounded rounded-0 my-2"
                                placeholder="select a new profile image">
                            <button
                                class="btn btn-success bg-success-subtle btn-sm text-success-emphasis rounded rounded-1 px-2"
                                type="button">Enregistrer</button>
                        </div>
                    </div>
                </div>
                <!-- ...Profile-Settings-Item --profileimg -->


                <!-- Profile-Settings-Item --deleteprof -->
                <div class="settings-item accordion-item password-item mt-3">
                    <div
                        class="itemcontent d-flex justify-content-between align-items-center py-2 mt-2 border-bottom accordion-header px-1 mb-0 gap-3">
                        <div class="item-desc">
                            <h5 class="fw-bold">Supprimer votre compte</h5>
                            <span class="d-block fw-normal text-body-secondary">
                                Cliquez pour supprimer votre compte NexaShop.</span>
                        </div>
                        <button
                            class="collapsed item-btn btn btn-danger bg-danger-subtle text-danger-emphasis rounded rounded-1 d-flex justify-content-between align-items-center gap-2"
                            data-bs-toggle="collapse" data-bs-target="#delUser" aria-expanded="false"
                            aria-controls="delUser" type="button"><span>Supprimer</span> <span
                                class="bi bi-trash3"></span></button>
                    </div>
                    <div class="item-form accordion-collapse collapse px-3 py-2 bg-light mt-0" id="delUser"
                        data-bs-parent="#settingsItems">
                        <span class="d-block fs-5 fw-bold">Confirmer la suppression du compte</span>
                        <span class="d-block fw-normal text-body-secondary">Veuillez noter que cette action ne peut pas être annulée et que toutes les informations de votre compte seront perdues.</span>
                        <div class="form">
                            <input type="password" name="confpass" id="confpass"
                                class="form-control border border-1 rounded rounded-0 my-2"
                                placeholder="Enter your password to confirm">
                            <button
                                class="btn btn-danger bg-danger-subtle btn-sm text-danger-emphasis rounded rounded-1 px-2"
                                type="button">Supprimer maintenant !</button>
                        </div>
                    </div>
                </div>
                <!-- ...Profile-Settings-Item --deleteprof -->

            </div>
        </div>
        <!-- profile-settings -->

    </main>
</template>

<script>
export default {
    name: "ProfileSettingsView"
}
</script>