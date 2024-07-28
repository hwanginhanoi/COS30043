const InsertComponent = {
    template: `
        <div class="card">
            <Navigation></Navigation>
        </div>
        <div id="content">
            <div class="card-body">
                <h3 class="card-title">Insert Unit</h3>
                <form @submit.prevent="insertUnit">
                    <div class="mb-3">
                        <label for="code" class="form-label">Code</label>
                        <input type="text" class="form-control" id="code" v-model="newUnit.code" placeholder="Enter unit code">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" v-model="newUnit.description" placeholder="Enter unit description">
                    </div>
                    <div class="mb-3">
                        <label for="cp" class="form-label">CP</label>
                        <input type="text" class="form-control" id="cp" v-model="newUnit.cp" placeholder="Enter unit CP">
                    </div>
                    <div class="mb-3">
                        <label for="type" class="form-label">Type</label>
                        <input type="text" class="form-control" id="type" v-model="newUnit.type" placeholder="Enter unit type">
                    </div>
                    <button type="submit" class="btn btn-primary">Insert Unit</button>
                </form>
            </div>
        </div>
    `,
    setup() {
        const newUnit = Vue.ref({
            code: '',
            description: '',
            cp: '',
            type: ''
        });

        const insertUnit = () => {
            axios.post('/api/units', newUnit.value)
                .then(response => {
                    if (response.data.success) {
                        alert('Unit inserted!');
                        router.push('/view');
                    }
                })
                .catch(error => {
                    console.error('Error inserting unit:', error);
                });
        };
        return { newUnit, insertUnit};
    },
    components: {
        Navigation
    }
};
