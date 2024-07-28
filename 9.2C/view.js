
const ViewComponent = {
    template: `
        <div class="card">
            <Navigation></Navigation>
        </div>
        <div id="content">
            <div class="card-body">
                <h3 class="card-title">View Units</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>CP</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="unit in paginatedUnits" :key="unit.code">
                            <td>{{ unit.code }}</td>
                            <td>{{ unit.description }}</td>
                            <td>{{ unit.cp }}</td>
                            <td>{{ unit.type }}</td>
                        </tr>
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `,
    setup() {
        const units = Vue.ref([]);
        const currentPage = Vue.ref(1);
        const itemsPerPage = 10;

        const fetchUnits = () => {
            axios.get('/api/units')
                .then(response => {
                    units.value = response.data;
                })
                .catch(error => {
                    console.error('Error fetching units:', error);
                });
        };

        const paginatedUnits = Vue.computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return units.value.slice(start, end);
        });

        const totalPages = Vue.computed(() => {
            return Math.ceil(units.value.length / itemsPerPage);
        });

        const changePage = (page) => {
            if (page > 0 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        Vue.onMounted(fetchUnits);

        return { units, paginatedUnits, currentPage, totalPages, changePage };
    },
    components: {
        Navigation
    }
};
