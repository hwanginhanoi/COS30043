const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    components: {
        paginate: VuejsPaginateNext,
    },

    setup() {
        const err = ref("none");
        const perPage = ref(5);
        const currentPage = ref(1);
        const fUnit = ref({
            code: "",
            desc: "",
            cp: "",
            type: "",
        });
        const units = ref([]);

        const filteredUnits = computed(() => {
            return units.value.filter(
                (unit) =>
                    unit.code.toLowerCase().includes(fUnit.value.code.toLowerCase()) &&
                    unit.desc.toLowerCase().includes(fUnit.value.desc.toLowerCase()) &&
                    unit.type.includes(fUnit.value.type.trim())
            );
        });

        const getItems = computed(() => {
            let current = currentPage.value * perPage.value;
            let start = current - perPage.value;
            return filteredUnits.value.slice(start, current);
        });

        const getPageCount = computed(() => {
            return Math.ceil(filteredUnits.value.length / perPage.value);
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
                .catch((error) => {
                    err.value = error.toString();
                });
        });

        return {
            err,
            perPage,
            currentPage,
            fUnit,
            units,
            filteredUnits,
            getItems,
            getPageCount,
            clickCallback,
        };
    },

    template: `
    <div class="container mt-5">
        <h1>Units</h1>
        <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" id="codeHeader">Code</th>
                        <th scope="col" id="descHeader">Description</th>
                        <th scope="col" id="cpHeader">cp</th>
                        <th scope="col" id="typeHeader">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in getItems" :key="unit.code">
                        <td headers="codeHeader">{{ unit.code }}</td>
                        <td headers="descHeader">{{ unit.desc }}</td>
                        <td headers="cpHeader">{{ unit.cp }}</td>
                        <td headers="typeHeader">{{ unit.type }}</td>
                    </tr>
                </tbody>
        </table>
        <paginate
        :page-count="getPageCount"
        :page-range="5"
        :margin-pages="1"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
    ></paginate>
    </div>
    `,
});

app.mount("#app");