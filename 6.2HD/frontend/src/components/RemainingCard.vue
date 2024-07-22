<script setup lang="ts">
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const targetValue = 5382943
const displayValue = ref(0)
const isNegative = targetValue < 0

const increment = Math.ceil(Math.abs(targetValue) / 200)

useIntervalFn(() => {
    if (isNegative) {
        if (displayValue.value > targetValue) {
            displayValue.value -= increment
            if (displayValue.value < targetValue) {
                displayValue.value = targetValue
            }
        }
    } else {
        if (displayValue.value < targetValue) {
            displayValue.value += increment
            if (displayValue.value > targetValue) {
                displayValue.value = targetValue
            }
        }
    }
}, 2)
</script>


<template>
    <div class="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Expenses</h5>
        </a>
        <p class="mb-6 font-normal text-gray-500">Jul 21 2024 - Jul 30 2024</p>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            ${{ displayValue.toLocaleString() }}
        </h5>
        <p class="mb-3 font-normal text-green-500">-69% from last period</p>
    </div>
</template>

<style scoped>

</style>