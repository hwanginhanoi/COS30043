const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    components: {
        paginate: VuejsPaginateNext,
    },

    setup() {
        const perPage = ref(5);
        const currentPage = ref(1);
        const units = ref([]);
        const error = ref("");

        const getItems = computed(() => {
            let current = currentPage.value * perPage.value;
            let start = current - perPage.value;
            return units.value.slice(start, current);
        });

        const getPageCount = computed(() => {
            return Math.ceil(units.value.length / perPage.value);
        });

        const clickCallback = (pageNum) => {
            currentPage.value = Number(pageNum);
        };

        onMounted(() => {
            fetch("units.json")
                .then((response) => response.json())
                .then((data) => {
                    units.value = data;
                })
                .catch((err) => {
                    error.value = err.toString();
                });
        });

        return {
            perPage,
            currentPage,
            units,
            error,
            getItems,
            getPageCount,
            clickCallback,
        };
    },

    template: `
    <div class="container mt-5">
        <h1>Units</h1>
        <table class="table table-hover table-bordered">
            {{ error }}
            <thead>
                <tr>
                    <th id="code" scope="col">Code</th>
                    <th id="desc" scope="col">Description</th>
                    <th id="cp" scope="col">Credit Points</th>
                    <th id="type" scope="col">Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="unit in getItems" :key="unit.code">
                    <td header="code">{{ unit.code }}</td>
                    <td header="desc">{{ unit.desc }}</td>
                    <td header="cp">{{ unit.cp }}</td>
                    <td header="type">{{ unit.type }}</td>
                </tr>
            </tbody>
        </table>
        <paginate 
            :page-count="getPageCount" 
            :page-range="6" 
            :margin-pages="5" 
            :click-handler="clickCallback" 
            :prev-text="'Prev'" 
            :next-text="'Next'" 
            :container-class="'pagination'" 
            :page-class="'page-item'">
        </paginate>
    </div>
    `,
});

app.mount("#app");