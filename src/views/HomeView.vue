<style scoped>
@media only screen and (max-width: 1015px) {
  .main .mainbanner {
    margin-top: 72px !important;
  }
}

.main .mainbanner {
  margin-top: 78px;
  background: #265a5a !important;
}

.mainbanner .banner-image {
  position: relative;
}

.mainbanner .main-banner-img {
  top: -100px;
  left: -50px;
  width: auto;
  position: absolute;
}

@media only screen and (max-width:1395px) {
  .mainbanner .main-banner-img {
    top: 0px;
    margin-right: auto !important;
    margin-left: auto !important;
    max-width: 100%;
    height: auto;
    position: initial !important;
  }
}


.icon-img {
  max-width: 30%;
  height: auto;
}

.carousel-btn {
  max-width: 45px;
}

.carousel-btn .btn {
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
  font-size: 20px;
}

.newproducts-banner .carousel-item {
  padding-left: 50px;
  padding-right: 50px;
}

.banner-nav .banner-nav-item {
  padding: 0px 15px 0px 15px;
}

.banner-nav .banner-nav-item.active {
  opacity: 0.6;
}


/* Products-carousel */
@media only screen and (max-width:992px) {
  .products-bx .products-list div {
    width: 50% !important;
    margin-left: auto;
    margin-right: auto;
  }

  .products-bx .products-list div:last-child {
    display: none !important;
  }
}
</style>


<template>
  <!-- Navbar -->
  <BasicNavbar active="home" />
  <!-- */Navbar -->

  <!-- Main  -->
  <main class="main">

    <!-- Main-Banner -->
    <div class="mainbanner mb-0 py-5 my-5 d-flex align-items-center">
      <div class="container py-5 my-5">
        <div class="bannercontent text-white row row-cols-1 row-cols-lg-2 align-items-stretch gap-5">

          <div class="content col-11 col-lg-5 px-lg-0">
            <div class="preload-r w-100">
              <h1 class="display-3 fw-semibold">Modernité & Unicité.</h1>
              <p class="lead opacity-75">Retrouvez vos produits et vendeurs préférés sur NexaShop..</p>
              <LinkButton btn-theme="secondary-btn" btn-label="Explorez maintenant" btn-url="shop" btn-icon="arrow-right"
                outlined="false" class="btn-lg mt-3" />
            </div>
          </div>

          <!-- Banner-Image -->
          <div class="banner-image col-11 col-lg-6 px-lg-0 preload-l">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
              <!-- Fond adapté à la couleur #265a5a -->
              <rect width="800" height="450" fill="#265a5a"/>
              
              <!-- Logo Nexa Shop -->
              <g transform="translate(400, 225)">
                <!-- Cercle décoratif -->
                <circle cx="0" cy="0" r="100" fill="none" stroke="#ffffff" stroke-width="3"/>
                
                <!-- Éléments décoratifs du logo -->
                <path d="M-50,-20 L50,-20 M-50,20 L50,20" stroke="#ffffff" stroke-width="4" fill="none"/>
                <path d="M-20,-50 L-20,50 M20,-50 L20,50" stroke="#ffffff" stroke-width="4" fill="none"/>
                
                <!-- Texte NEXA -->
                <text x="0" y="-15" font-family="Arial, sans-serif" font-weight="bold" font-size="48" fill="#ffffff" text-anchor="middle">NEXA</text>
                
                <!-- Texte SHOP -->
                <text x="0" y="35" font-family="Arial, sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">SHOP</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

    </div>
    <!-- */Main-Banner -->

    <!-- Double - Images-Banner -->
    <div class="middle-image-banner bg-color-primary">
      <br><br>
      <div class="container bg-color-secondary p-4">
        <div class="row row-cols-1 row-cols-lg-2 align-items-stretch">
          <div class="col mx-0">
            <MediumImageBanner class="w-100 mx-0 preload-rs s-anim" banner-title="Apparels Collection"
              banner-description="Nexa Shop" banner-image="/assets/images/sli-h1.webp" bannerLink="product" />
          </div>
          <div class="col mx-0">
            <MediumImageBanner class="w-100 mx-0 preload-rs s-anim" banner-title="Chair Collection"
              banner-description="Nexa Shop" banner-image="/assets/images/slide-2.png" bannerLink="product"/>
          </div>
        </div>
      </div>
    </div>
    <!-- */Double - Images-Banner -->

    <!-- PositivePoints-Banner -->
    <div class="positive-points bg-color-secondary">
      <div class="container px-4 py-5">
        <div class="row g-4 py-2 row-cols-1 row-cols-lg-4">

          <div class="feature preload-rs s-anim col p-5 color-primary" align="center">
            <img class="icon-img" src="/assets/images/icon-1-delivery.png" alt="" srcset="">
            <p class="fs-5 mt-2 fw-semibold">Livraison gratuite </p>
            <span class="fw-semibold color-black">Livraison gratuite pour tous vos produits</span>
          </div>
          <div class="feature preload-rs s-anim col p-5 color-primary" align="center">
            <img class="icon-img" src="/assets/images/icon-1-save-the-world.png" alt="" srcset="">
            <p class="fs-5 mt-2 fw-semibold">RESPECTUEUX DE L'ENVIRONNEMENT</p>
            <span class="fw-semibold color-black">Meubles écologiques et haut de gamme</span>
          </div>
          <div class="feature preload-rs s-anim col p-5 color-primary" align="center">
            <img class="icon-img" src="/assets/images/icon-1-return-on-investment.png" alt="" srcset="">
            <p class="fs-5 mt-2 fw-semibold">Remboursement</p>
            <span class="fw-semibold color-black">Remboursement en cas d'insatisfaction</span>
          </div>

          <div class="feature preload-rs s-anim col p-5 color-primary" align="center">
            <img class="icon-img" src="/assets/images/icon-1-support.png" alt="" srcset="">
            <p class="fs-5 mt-2 fw-semibold">SUPPORT 24/7</p>
            <span class="fw-semibold color-black">Assistance clientèle disponible</span>
          </div>
        </div>
        <span class="d-block pb-2 border-1 border-secondary opacity-25 border-bottom col-11 mx-auto"></span>
        <div class="col-lg-9 mx-auto mt-5" align="center">
          <p class="display-5 fw-semibold color-primary preload">
            Il y a quelque chose d’étonnant dans nos produits, et ce n’est pas seulement leur apparence..</p>
        </div>
      </div>
    </div>
    <!-- */PositivePoints-Banner -->


    <!-- New-Products Banner-display -->
    <div class="newproducts-banner my-5 py-5">
      <div class="container px-4 py-5 my-5">
        <div class="row row-cols-1 row-cols-lg-2 align-items-center">

          <!-- Banner-Description -->
          <div class="banner-desc col-12 col-lg-4 ps-lg-0 mb-lg-0 mb-5">
            <h3 class="fs-2 fw-semibold">Nouvel arrivage</h3>
            <p class="fs-4">Découvrez quelques-uns de les nouveaux produits haut de gamme, aux tarifs les moins chers possibles </p>

            <!-- LinkButton -->
            <LinkButton btn-theme="secondary-btn" btn-label="Découvrir maintenant" btn-url="shop" btn-icon="arrow-right"
              outlined="false" class="btn-lg my-3" />
          </div>
          <!-- */Banner-Description -->

          <!-- Products-Box -->
          <div class="products-bx col-12 col-lg-8">
            <div id="newProductsCarousel" class="carousel slide container" data-bs-ride="carousel">

              <!-- Carousel-Inner -->
              <div class="carousel-inner w-100">
              <!-- ProductItem-Carousel -->
              <div
                v-for="(group, groupIndex) in productGroups"
                :key="groupIndex"
                :class="['carousel-item', { active: groupIndex === 0 }]"
              >
                <div class="products-list row row-cols-1 row-cols-lg-3 d-flex justify-content align-items-stretch">
                  <ProductItemCard
                    v-for="(product, index) in group"
                    :key="product.id || index"
                    :product-title="product.name || ''"
                    :product-price="product.price || ''"
                    class="col-11 col-lg-4 d-block"
                  />
                </div>
              </div>
              </div>
              <!-- ../Carousel-Inner -->

              <span class="carousel-btn carousel-control-prev" type="button" data-bs-target="#newProductsCarousel"
                data-bs-slide="prev">
                <span class="btn text-white bg-success d-flex justify-content-center align-items-center">
                  <span class="bi bi-arrow-left" aria-hidden="true"></span>
                </span>
              </span>
              <span class="carousel-btn carousel-control-next" type="button" data-bs-target="#newProductsCarousel"
                data-bs-slide="next">
                <span class="btn text-white bg-success d-flex justify-content-center align-items-center">
                  <span class="bi bi-arrow-right" aria-hidden="true"></span>
                </span>
              </span>

            </div>
          </div>
          <!-- */Products-Box -->


        </div>
      </div>
    </div>
    <!-- ...endProductSlider -->

    <!-- Trending Product List -->
    <div class="tranding-products-bx">
      <div class="container">
        <div class="bx-header border-top py-4 mb-4 d-flex justify-content-between flex-wrap align-items-center">
          <span class="fs-2 fw-semibold">Produits les plus vendus</span>
          <span
            class="banner-nav fs-6 fw-medium opacity-80 d-flex justify-content-evenly mt-3 mt-lg-0 align-items-center flex-wrap">
            <a href="" class="link-primary"><span class="banner-nav-item active">Tous produits</span></a>
            <a href="" class="link-primary"><span class="banner-nav-item">Accessoires</span></a>
            <a href="" class="link-primary"><span class="banner-nav-item">Chaises</span></a>
            <a href="" class="link-primary"><span class="banner-nav-item">Decoration</span></a>
            <a href="" class="link-primary"><span class="banner-nav-item">Meubles</span></a>
            <a href="" class="link-primary"><span class="banner-nav-item">Tables</span></a>
          </span>
        </div>
        <div class="content row row-cols-1 row-cols-lg-4 align-items-stretch">
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Trendy Timber" product-price="1500"
            product-discount="2350" product-image="/assets/images/product-4.png"
            class="col-6 col-lg-3 mx-auto preload-rs s-anim" />
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Trendy Timber" product-price="1700"
            product-discount="1899" product-image="/assets/images/product-5.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Trendy Timber" product-price="4500"
            product-discount="" product-image="/assets/images/product-6.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Trendy Timber" product-price="1100"
            product-discount="" product-image="/assets/images/product-7.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
        </div>
      </div>
    </div>
    <!-- */Trending-Product-List -->


    <!-- addBanner -->
    <div class="addBanner my-5 py-5">
      <div class="container">
        <MediumImageBanner banner-title="50% OFF Interior Collection"
          banner-description="Free shipping over ₹20,000
 for international orders" bannerLink="product"  banner-image="/assets/images/sli-h1.webp"
          class="py-5 mx-auto preload-rs s-anim"  />
      </div>
    </div>
    <!-- */addBanner -->



    <!-- Latest arrivals Product List -->
    <div class="tranding-products-bx">
      <div class="container">
        <div class="bx-header border-top py-4 mb-4 d-flex justify-content-between align-items-center">
          <span class="fs-2 fw-semibold">Dernier arrivage</span>
        </div>
        <div class="content row row-cols-1 row-cols-lg-4 align-items-stretch">
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Homello" product-price="1500"
            product-discount="10%" product-image="/assets/images/product-8.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Homello" product-price="600"
            product-discount="" product-image="/assets/images/product-9.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Homello" product-price="2500"
            product-discount="" product-image="/assets/images/product-10.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
          <ProductItemCard product-title="Kruzo Aero Chair" product-category="Homello" product-price="5,000"
            product-discount="5%" product-image="/assets/images/product-11.png"
            class="col-6 col-lg-3  mx-auto preload-rs s-anim" />
        </div>
      </div>
    </div>
    <!-- */Latest-arrivals-Product-List -->

    <!-- Customers-Testimonials -->
    <CustomersReviewsBanner class="preload-rs s-anim" />
    <!-- */Customers-diials -->


    <!-- Blog-Articles -->
    <BlogArticlesBanner />
    <!-- */Blog-Articles -->

    <!-- Newsletter-banner -->
    <NewsletterBanner />
    <!-- */Newsletter-banner -->



    <!-- Footer -->
    <GlobalFooter data="none" />
    <!-- */Footer -->
  </main>
  <!-- */Main  -->
</template>

<script>
import LinkButton from '@/components/btnComponents/GlobalButtons/LinkButton.vue';
import BasicNavbar from '@/components/headerComponents/BasicNavbar.vue';
import CustomersReviewsBanner from '@/components/bodyComponents/CustomersReviewsBanner.vue';
import MediumImageBanner from '@/components/bodyComponents/MediumImageBanner.vue';
import ProductItemCard from '@/components/productsComponent/ProductItemCard.vue';
import BlogArticlesBanner from '@/components/bodyComponents/BlogArticlesBanner.vue';
import NewsletterBanner from '@/components/footerComponents/NewsletterBanner.vue';
import GlobalFooter from '@/components/footerComponents/GlobalFooter.vue';

import apiService from '../services/apiService';

export default {
  name: "HomeView",
  data() {
    return {
      products: []
    }
  },
  computed: {
    productGroups() {
      const groups = [];
      const groupSize = 3;
      for (let i = 0; i < this.products.length; i += groupSize) {
        groups.push(this.products.slice(i, i + groupSize));
      }
      return groups;
    }
  },
  methods: {
    setPageTitle() {
      document.title = "Home | Nexa Shop";
    }
  },
  components: {
    BasicNavbar,
    LinkButton,
    MediumImageBanner,
    ProductItemCard,
    CustomersReviewsBanner,
    BlogArticlesBanner,
    NewsletterBanner,
    GlobalFooter
  },
  async mounted() {
    try {
      this.products = await apiService.fetchProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  beforeMount() {
    this.setPageTitle()
  }
}
</script>