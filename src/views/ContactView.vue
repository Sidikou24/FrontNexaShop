<script setup>
// import_required_components
import GlobalNavbar from "@/components/headerComponents/GlobalNavbar.vue";
import GlobalFooter from "@/components/footerComponents/GlobalFooter.vue";
</script>


<style scoped> /* Contactview_Style */
 .navbar,
 .mainbanner {
     background-color: #f1f1f1 !important;
 }

 .feature {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     height: 3rem;
     width: 3rem;
     font-size: 1.5rem;
 }

 .bg-banner {
     position: relative;
     overflow: hidden;
 }

 .bg-banner .banner-img {
     top: 0;
     left: 0;
     position: absolute;
     width: 100%;
     height: 100%;
     z-index: -1 !important;
 }

 .bg-banner .banner-img img {
     width: 100%;
     height: 100%;
     max-width: 100%;
     object-fit: cover;
     object-position: center;
 }


 .bg-banner .banner-blur {
     top: 0;
     left: 0;
     background: #04150f;
     width: 100%;
     height: 100%;
     position: absolute;
     opacity: 0.5;
     z-index: -1 !important;
 }

 .album .col {
     max-width: 350px !important;
     overflow: hidden !important;
 }

 .album .col:hover .card-title {
     display: none !important;
 }
</style>

<template>
    <!-- Header -->
    <GlobalNavbar />
    <!-- ..Header -->

    <main>
        <!-- MainBanner -->
        <section class="bg-banner py-5 text-center">
            <div class="banner-img">
                <img src="/assets/images/image04.jpg" alt="" srcset="">
            </div>
            <div class="banner-blur"></div>
            <div class="container py-4">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-bold display-3 text-white">Contactez nous.</h1>
                    </div>
                </div>
            </div>
        </section>
        <!-- ../MainBanner -->

        <section class="py-5">
            <div class="container px-5">
                <!-- Contact form-->
                <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                    <div class="text-center mb-5">
                        <div class="feature bg-success bg-gradient text-white rounded-3 mb-3"><i class="bi bi-envelope"></i>
                        </div>
                        <h1 class="fw-bolder">Get in touch</h1>
                        <p class="lead fw-normal text-muted mb-0">Au plaisir de vous lire</p>
                    </div>
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-8 col-xl-6">
                            <form id="contactForm" action="https://api.web3forms.com/submit" method="POST"  class="needs-validation" novalidate> 
                                <input type="hidden" name="access_key" value="568ce8ca-4958-4ce6-a24c-eacc554a1926" />
                                <input type="hidden" name="subject" value="New Submission from Web3Forms" />
                                <input type="checkbox" name="botcheck" id="" style="display: none;" />

                                <!-- Name input-->
                                <div class="form-floating mb-3">
                                    <input class="form-control" id="name" type="text" name="name" placeholder="Enter your name..."
                                        data-sb-validations="required">
                                    <label for="name">Full name</label>
                                    <!-- <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div> -->
                                </div>
                                <!-- Email address input-->
                                <div class="form-floating mb-3">
                                    <input class="form-control" type="email" name="email" id="email" placeholder="name@example.com"
                                        data-sb-validations="required,email">
                                    <label for="email">Email address</label>
                                    <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.
                                    </div>
                                    <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <!-- Phone number input-->
                                <div class="form-floating mb-3">
                                    <input class="form-control" type="text" name="phone" id="phone" placeholder="+91 1234567890"
                                        data-sb-validations="required">
                                    <label for="phone">Phone number</label>
                                    <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is
                                        required.</div>
                                </div>
                                <!-- Message input-->
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" id="message" type="text"
                                        placeholder="Enter your message here..." style="height: 10rem"
                                        data-sb-validations="required"></textarea>
                                    <label for="message">Message</label>
                                    <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.
                                    </div>
                                </div>
                                <!-- Submit success message-->
                                <!---->
                                <!-- This is what your users will see when the form-->
                                <!-- has successfully submitted-->
                                <div class="d-none" id="submitSuccessMessage">
                                    <div class="text-center mb-3">
                                        <div class="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br>
                                        <a
                                            href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                <!-- Submit error message-->
                                <!---->
                                <!-- This is what your users will see when there is-->
                                <!-- an error submitting the form-->
                                <div class="d-none" id="submitErrorMessage">
                                    <div class="text-center text-danger mb-3">Error sending message!</div>
                                </div>
                                <!-- Submit Button-->
                                <div class="d-grid"><button class="btn btn-success btn-lg " id="submitButton"
                                        type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Contact cards-->
                <div class="row gx-5 row-cols-2 row-cols-lg-4 py-5">
                    <div class="col">
                        <div class="feature bg-success bg-gradient text-white rounded-3 mb-3"><i
                                class="bi bi-chat-dots"></i></div>
                        <div class="h5 mb-2">Chat with us</div>
                        <p class="text-muted mb-0">Chat live with one of our support specialists.</p>
                    </div>
                    <div class="col">
                        <div class="feature bg-success bg-gradient text-white rounded-3 mb-3"><i class="bi bi-people"></i>
                        </div>
                        <div class="h5">Ask the community</div>
                        <p class="text-muted mb-0">Explore our community forums and communicate with other users.</p>
                    </div>
                    <div class="col">
                        <div class="feature bg-success bg-gradient text-white rounded-3 mb-3"><i
                                class="bi bi-question-circle"></i></div>
                        <div class="h5">Support center</div>
                        <p class="text-muted mb-0">Browse FAQ's and support articles to find solutions.</p>
                    </div>
                    <div class="col">
                        <div class="feature bg-success bg-gradient text-white rounded-3 mb-3"><i
                                class="bi bi-telephone"></i></div>
                        <div class="h5">Call us</div>
                        <p class="text-muted mb-0">Call us during normal business hours at (555) 892-9403.</p>
                    </div>
                </div>
            </div>
        </section>

    </main>



    <!-- Footer -->
    <GlobalFooter data="none" />
    <!-- */Footer -->
    <!-- app -->
</template> 


<script>
export default {
    name: "COntactView",
    methods: {
        setPageTitle() {
            document.title = "Homello | Contact Us";
        }
    },
    beforeMount() {
        this.setPageTitle()
    }
}
</script>    
    