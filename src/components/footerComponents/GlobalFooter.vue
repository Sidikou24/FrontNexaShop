<style scoped>
/* Footer */
footer {
    background-color: #f8f8f8;
}

/* Footer-logo */
.logo-brand {
    font-size: 25px;
    font-weight: bold;
}
</style>

<template>
    <!-- Global-Footer-Component -->
    <footer class="footer mt-5">
        <div class="container py-5 pb-0">
            <div class="row">
                <div class="col-12 col-md">
                    <span class="logo logo-brand">Nexa Shop</span>
                    <small class="d-block mb-3 text-body-secondary">© 2025-2026</small>
                </div>

                <div class="col-6 col-md">
                    <h5 class="fw-semibold">Caractéristiques</h5>
                    <ul class="list-unstyled text-small mt-3">
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Page d'accueil</a></li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Ameublement</a></li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Nos Services</a></li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Connexion / Inscription</a>
                        </li>
                    </ul>
                </div>

                <div class="col-6 col-md">
                    <h5 class="fw-semibold">Ressources</h5>
                    <ul class="list-unstyled text-small mt-3">
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Business</a>
                        </li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Education</a></li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Gouvernement</a></li>
                        <!-- <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Gaming</a>
                        </li> -->
                    </ul>
                </div>

                <div class="col-6 col-md">
                    <h5 class="fw-semibold">A propos de nous</h5>
                    <ul class="list-unstyled text-small mt-3">
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Qui nous sommes?</a>
                        </li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Ce que nous faisons</a></li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">FAQ Page</a>
                        </li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Contactez-nous</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md">
                    <h5 class="fw-semibold">Politique et conditions</h5>
                    <ul class="list-unstyled text-small mt-3">
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">
                                Conditions générales</a>
                        </li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Politique de confidentialité</a>
                        </li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">Notre marché</a></li>
                        <li class="my-1"><a class="link-secondary text-decoration-none fw-medium color-black  link-primary"
                                href="#">
                                Guide d'achat</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary opacity-75 small fw-medium">Copyright &copy;2025 <a href="https://www.nexacorp.somee.com/" >Designed and Developed by NexaCorp</a> 
                        Tous droits reservés NexaShop.</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex color-dark">
                    <li class="ms-3"><a class="text-body-secondary" href="">
                            <span class="bi bi-github"></span>
                        </a></li>
                    <li class="ms-3"><a class="text-body-secondary" href="#"><span class="bi bi-twitter"></span></a></li>
                    <li class="ms-3"><a class="text-body-secondary" href="#"><span class="bi bi-instagram"></span></a></li>
                    <li class="ms-3"><a class="text-body-secondary" href="#">
                            <span class="bi bi-facebook"></span>
                        </a></li>

                </ul>
            </div>
        </div>

        <!-- Global-Footer-Component -->
    </footer>
</template>

<script>
export default {
    name: "GlobalFooter",
    data() {
        return {
            temp: ""
        }
    },
    props: {
        data: String
    }
}
</script>