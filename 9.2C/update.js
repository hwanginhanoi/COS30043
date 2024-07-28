
const UpdateComponent = {
    template: `
        <div class="card">
            <Navigation></Navigation>
        </div>
        <div id="content">
            <div class="card-body">
                <h3 class="card-title">Update Unit</h3>
                <form @submit.prevent="updateUnit">
                    <div class="mb-3">
                        <label for="code" class="form-label">Code</label>
                        <input type="text" class="form-control" id="code" v-model="unit.code" placeholder="Enter unit code">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" v-model="unit.description" placeholder="Enter unit description">
                    </div>
                    <div class="mb-3">
                        <label for="cp" class="form-label">CP</label>
                        <input type="text" class="form-control" id="cp" v-model="unit.cp" placeholder="Enter unit CP">
                    </div>
                    <div class="mb-3">
                        <label for="type" class="form-label">Type</label>
                        <input type="text" class="form-control" id="type" v-model="unit.type" placeholder="Enter unit type">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Unit</button>
                </form>
            </div>
        </div>
    `,
    setup() {
        const unit = Vue.reactive({
            code: '',
            description: '',
            cp: '',
            type: ''
        });

        const updateUnit = () => {
            axios.put(`/api/units/${unit.code}`, unit)
                .then(response => {
                    if (response.data.success) {
                        alert('Unit updated!');
                        router.push('/view');
                    }
                })
                .catch(error => {
                    console.error('Error updating unit:', error);
                    alert('Failed to update unit. Please try again.');
                });
        };

        Vue.onMounted(() => {
            const { code } = router.currentRoute.value.params;
            axios.get(`/api/units/${code}`)
                .then(response => {
                    const { code, description, cp, type } = response.data;
                    unit.code = code;
                    unit.description = description;
                    unit.cp = cp;
                    unit.type = type;
                })
                .catch(error => {
                    console.error('Error fetching unit details:', error);
                });
        });

        return { unit, updateUnit };
    },
    components: {
        Navigation
    }
};