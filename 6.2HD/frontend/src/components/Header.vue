<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/auth';

const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
    isMenuOpen.value = false;
}

const userStore = useUserStore();
const router = useRouter();

function handleLogout() {
    userStore.logout();
    router.push('/login');
}

onMounted(() => {
    const menuButton = document.querySelector('[data-collapse-toggle="mobile-menu-2"]');
    const menu = document.getElementById('mobile-menu-2');

    if (menuButton && menu) {
        menuButton.addEventListener('click', toggleMenu);
    }
});
</script>

<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div class="flex items-center">
                    <img src="../assets/logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap">Vue Wallet</span>
                </div>
                <div class="flex items-center lg:order-2">
                    <button @click="handleLogout" class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log out</button>
                    <a href="#" class="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Hi {{userStore.user.username}}</a>
                    <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg v-if="!isMenuOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <svg v-if="isMenuOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}" class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <RouterLink
                                to="/dashboard"
                                @click.native="closeMenu"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                                exact-active-class="text-white bg-primary-600 lg:bg-transparent lg:text-primary-700"
                            >
                                Home
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="/transactions"
                                @click.native="closeMenu"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                                exact-active-class="text-white bg-primary-600 lg:bg-transparent lg:text-primary-700"
                            >
                                Transactions
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="/currency"
                                @click.native="closeMenu"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                                exact-active-class="text-white bg-primary-600 lg:bg-transparent lg:text-primary-700"
                            >
                                Currency
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="/category"
                                @click.native="closeMenu"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                                exact-active-class="text-white bg-primary-600 lg:bg-transparent lg:text-primary-700"
                            >
                                Category
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                to="/rating"
                                @click.native="closeMenu"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                                exact-active-class="text-white bg-primary-600 lg:bg-transparent lg:text-primary-700"
                            >
                                Rating
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
</style>