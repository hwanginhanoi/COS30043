<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import axios from 'axios'
import Header from "../components/Header.vue";

interface CurrencyData {
    [key: string]: number;
}

const currencies = ref<CurrencyData>({});const effective_date = ref(Date())
const searchTerm = ref('')


async function fetchCurrency(): Promise<void> {
    const response = await axios.get<{ eur: CurrencyData, date: string }>('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
    currencies.value = response.data.eur
    effective_date.value = response.data.date
    console.log(currencies.value)
}

onMounted(fetchCurrency)

const filteredCurrencies = computed(() => {
    const filtered: CurrencyData = {};
    const searchTermLower = searchTerm.value.toLowerCase();

    Object.keys(currencies.value).forEach((currency) => {
        if (currency.toLowerCase().includes(searchTermLower)) {
            filtered[currency] = currencies.value[currency];
        }
    });

    return filtered;
});

const totalPages = 100;
const itemsPerPage = 10;

const currentPage = ref(1);

const displayedPages = computed(() => {
    const pages = [];
    const maxPages = Math.ceil(totalPages / itemsPerPage);
    let startPage = Math.max(1, currentPage.value - 2);
    let endPage = Math.min(maxPages, startPage + 4);

    if (currentPage.value <= 3) {
        endPage = Math.min(maxPages, 5);
    } else if (currentPage.value > maxPages - 2) {
        startPage = Math.max(1, maxPages - 4);
    }

    if (startPage > 1) {
        pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < maxPages) {
        pages.push('...');
    }

    return pages;
});

function gotoPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage.value = pageNumber;
        // You can add logic here to fetch data for the selected page from an API or update the UI as needed
        console.log('Navigated to page:', pageNumber);
    }
}

</script>

<template>
    <Header></Header>
    <section class="p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form class="flex items-center">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" v-model="searchTerm" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" placeholder="Search" required>                            </div>
                        </form>
                    </div>
                    <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal" class="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Add product
                        </button>
                        <div class="flex items-center space-x-3 w-full md:w-auto">
                            <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200" type="button">
                                <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                                Actions
                            </button>
                            <div id="actionsDropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                                <ul class="py-1 text-sm text-gray-700" aria-labelledby="actionsDropdownButton">
                                    <li>
                                        <a href="#" class="block py-2 px-4 hover:bg-gray-100">Mass Edit</a>
                                    </li>
                                </ul>
                                <div class="py-1">
                                    <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete all</a>
                                </div>
                            </div>
                            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                </svg>
                                Filter
                                <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                            <div id="filterDropdown" class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow">
                                <h6 class="mb-3 text-sm font-medium text-gray-900">Category</h6>
                                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                    <li class="flex items-center">
                                        <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2">
                                        <label for="apple" class="ml-2 text-sm font-medium text-gray-900">Apple (56)</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-4 py-4">Source Currency</th>
                            <th scope="col" class="px-4 py-3"></th>
                            <th scope="col" class="px-4 py-3">Target Currency</th>
                            <th scope="col" class="px-4 py-3">Exchange Rate</th>
                            <th scope="col" class="px-4 py-3">Effective Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b" v-for="(rate, currency) in filteredCurrencies" :key="currency">
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ String(currency).toUpperCase() }}</th>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg></th>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">EUR</th>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ rate }}</th>
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ effective_date }}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500">
                    Showing
                    <span class="font-semibold text-gray-900">1-10</span>
                    of
                    <span class="font-semibold text-gray-900">1000</span>
                </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <!-- Previous button -->
                        <li>
                            <a href="#" @click.prevent="gotoPage(currentPage - 1)"
                               :class="['flex', 'items-center', 'justify-center', 'h-full', 'py-1.5', 'px-3', 'ml-0', 'text-gray-500', 'bg-white', 'rounded-l-lg', 'border', 'border-gray-300', currentPage === 1 ? 'pointer-events-none' : '', 'hover:bg-gray-100', 'hover:text-gray-700']">
                                <span class="sr-only">Previous</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>

                        <!-- Displayed pages -->
                        <template v-for="pageNumber in displayedPages" :key="pageNumber">
                            <li v-if="pageNumber === '...'" :key="pageNumber">
                                <a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{{ pageNumber }}</a>
                            </li>
                            <li v-else>
                                <a href="#" @click.prevent="gotoPage(Number(pageNumber))"
                                   :class="['flex', 'items-center', 'justify-center', 'text-sm', 'py-2', 'px-3', 'leading-tight', 'text-gray-500', 'bg-white', 'border', 'border-gray-300', currentPage === pageNumber ? 'text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700' : 'hover:bg-gray-100 hover:text-gray-700']">{{ pageNumber }}</a>
                            </li>
                        </template>

                        <!-- Next button -->
                        <li>
                            <a href="#" @click.prevent="gotoPage(currentPage + 1)"
                               :class="['flex', 'items-center', 'justify-center', 'h-full', 'py-1.5', 'px-3', 'leading-tight', 'text-gray-500', 'bg-white', 'rounded-r-lg', 'border', 'border-gray-300', currentPage === totalPages ? 'pointer-events-none' : '', 'hover:bg-gray-100', 'hover:text-gray-700']">
                                <span class="sr-only">Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>