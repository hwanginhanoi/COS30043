<script setup lang="ts">
import {ref, computed} from 'vue';
import DatePicker from "./DatePicker.vue";

const visible = ref(false);

const openDrawer = () => {
    visible.value = true;
};

const closeDrawer = () => {
    visible.value = false;
};

defineExpose({
    openDrawer,
    closeDrawer
});

const isIncome = ref<boolean | null>(null); // Initial state is null to represent gray button

const toggleType = () => {
    if (isIncome.value === null) {
        isIncome.value = true;
    } else {
        isIncome.value = !isIncome.value;
    }
};

const buttonText = computed(() => {
    if (isIncome.value === null) return 'o';
    return isIncome.value ? '+' : '-';
});

const buttonClass = computed(() => {
    if (isIncome.value === null) return 'bg-gray-300 text-gray-300';
    return isIncome.value ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
});



</script>

<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="closeDrawer"
    ></div>
    <div
        id="drawer-form"
        :class="{ 'translate-x-0': visible }"
        class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white  w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[500px]"
        aria-labelledby="drawer-form-label"
    >
        <h5 id="drawer-label"
            class="inline-flex items-center mb-1 text-base font-semibold text-gray-900 uppercase">
            New Transaction
        </h5>
        <button
            type="button"
            aria-controls="drawer-form"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
            @click="closeDrawer"
        >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close menu</span>
        </button>
        <h6 class="mb-4 text-gray-500 text-xs">
            Add a new transaction
        </h6>
        <form class="mb-6">
            <div class="relative mb-6">
                <DatePicker></DatePicker>
            </div>
            <div class="mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <div class="relative">
                    <select id="countries" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                        <option selected>Choose a category</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
            </div>
            <div class="mb-2">
                <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                <div class="relative">
                    <input type="text" id="amount"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                           required />
                    <button @click="toggleType" :class="buttonClass" class="absolute left-2 top-0 mt-2 px-2 rounded-md w-6 flex items-center justify-center">
                        {{ buttonText }}
                    </button>
                </div>
            </div>
            <h6 class="mb-4 text-gray-500 text-xs">
                Add a new transaction
            </h6>
            <div class="mb-6">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea id="description" rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write event description..."></textarea>
            </div>
            <button type="submit"
                    class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                <svg class="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"/>
                    <path
                        d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"/>
                </svg>
                Create event
            </button>
        </form>
    </div>
</template>

<style scoped>
#drawer-form {
    transform: translateX(-100%);
}

#drawer-form.translate-x-0 {
    transform: translateX(0);
}
</style>