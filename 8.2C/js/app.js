const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    setup() {
        const units = ref([]);
        const currentPage = ref(1);
        const perPage = ref(5);

        const totalPages = computed(() => {
            return Math.ceil(units.value.length / perPage.value);
        });

        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * perPage.value;
            const end = start + perPage.value;
            return units.value.slice(start, end);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const fetchData = async () => {
            const response = await fetch('units.json');
            const data = await response.json();
            units.value = data;
        };

        onMounted(() => {
            fetchData();
        });

        return {
            units,
            currentPage,
            perPage,
            totalPages,
            paginatedData,
            changePage
        };
    }
});

app.mount('#app');