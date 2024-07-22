<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ApexOptions } from 'apexcharts'

// Define chart options
const chartOptions = ref<ApexOptions>({
    series: [{
        name: 'Traffic Sources',
        data: [35.1, 23.5, 2.4, 5.4]
    }],
    labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
    chart: {
        height: "100%",
        width: "100%",
        type: 'donut',
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    stroke: {
        colors: ["transparent"],
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontFamily: "Inter, sans-serif",
                        offsetY: 20,
                    },
                    total: {
                        showAlways: true,
                        show: true,
                        label: "Unique visitors",
                        fontFamily: "Inter, sans-serif",
                        formatter: (w) => {
                            const sum = w.globals.seriesTotals.reduce((a : number, b : number) => a + b, 0)
                            return '$' + sum + 'k'
                        },
                    },
                    value: {
                        show: true,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "bold",
                        fontSize: "30px",
                        offsetY: -20,
                        formatter: (value) => value + "k",
                    },
                },
                size: "70",
            },
        },
    },
    grid: {
        padding: {
            top: -2,
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return value + "k"
            },
        },
    },
    xaxis: {
        labels: {
            formatter: function (value) {
                return value  + "k"
            },
        },
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },

})

const chartSeries = ref([35.1, 23.5, 2.4, 5.4])

const updateChart = (checkedValues: string[]) => {
    switch (true) {
        case checkedValues.includes('desktop'):
            chartSeries.value = [15.1, 22.5, 4.4, 8.4]
            break
        case checkedValues.includes('tablet'):
            chartSeries.value = [25.1, 26.5, 1.4, 3.4]
            break
        case checkedValues.includes('mobile'):
            chartSeries.value = [45.1, 27.5, 8.4, 2.4]
            break
        default:
            chartSeries.value = [35.1, 23.5, 2.4, 5.4]
    }
}

const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLInputElement) {
        const checkedValues = Array.from(document.querySelectorAll('#devices input[type="checkbox"]:checked')).map((checkbox) => (checkbox as HTMLInputElement).value);
        updateChart(checkedValues);
    }
}

// Watch for checkbox changes
onMounted(() => {
    const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]')
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange)
    })
})
</script>

<template>
    <div class="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow lg:col-span-1 sm:col-span-3">
        <div class="flex justify-between">
            <div>
                <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Categories</h5>
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
            </div>
        </div>
        <div class="py-6">
            <apexchart type="donut" :options="chartOptions" :series="chartSeries" height="340"></apexchart>
        </div>
    </div>
</template>

<style scoped>

</style>