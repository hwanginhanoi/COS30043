<script setup lang="ts">

</script>

<template>
    <div class="flex flex-row min-h-screen justify-center items-center">
        <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img class="w-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
                 alt="dashboard image">
            <img class="w-full hidden"
                 src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                 alt="dashboard image">
            <div class="mt-4 md:mt-0">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">The <span class="vue-accent">Progressive</span> Fintech App</h2>
                <p class="mb-6 font-light text-gray-500 md:text-lg">Ready to take control of your financial future?
                    Join us today and experience the ease of managing your finances with just a few clicks.
                    Sign up now to start your financial journey with our intuitive and secure platform.
                    Whether you want to save, invest, or simply manage your expenses better, our app provides all the tools you need.
                    Create your account in minutes and discover how easy financial empowerment can be. Don’t wait – secure your future with us today!
                </p>
                <RouterLink to="/login"
                   class="inline-flex items-center text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Get started
                    <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                    </svg>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

.vue-accent {
    background: linear-gradient(315deg, #42d392 25%, #647eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

</style>