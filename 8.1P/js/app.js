const { createApp, ref, computed } = Vue;

const app = createApp({
    setup() {
        const studMarks = ref([
            {"name":"Amy", "mark":90},
            {"name":"Bill", "mark":80},
            {"name":"Casey", "mark":78},
            {"name":"David", "mark":84},
            {"name":"Emma", "mark":92},
            {"name":"Frank", "mark":75},
            {"name":"Grace", "mark":88},
            {"name":"Hannah", "mark":79},
            {"name":"Ivy", "mark":85},
            {"name":"Jack", "mark":91},
            {"name":"Kelly", "mark":82},
            {"name":"Leo", "mark":77},
            {"name":"Mia", "mark":89},
            {"name":"Nathan", "mark":76},
            {"name":"Olivia", "mark":94},
            {"name":"Paul", "mark":81},
            {"name":"Quinn", "mark":87},
            {"name":"Rachel", "mark":74},
            {"name":"Sam", "mark":86},
            {"name":"Tina", "mark":83},
            {"name":"Uma", "mark":90},
            {"name":"Victor", "mark":79},
            {"name":"Wendy", "mark":92},
            {"name":"Xander", "mark":88},
            {"name":"Yara", "mark":91},
            {"name":"Zack", "mark":84}
        ]);
        const currentPage = ref(1);
        const perPage = ref(3);

        const totalPages = computed(() => {
            return Math.ceil(studMarks.value.length / perPage.value);
        });

        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * perPage.value;
            const end = start + perPage.value;
            return studMarks.value.slice(start, end);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        return {
            studMarks,
            currentPage,
            perPage,
            totalPages,
            paginatedData,
            changePage
        };
    }
});

app.mount('#app');