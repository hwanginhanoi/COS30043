

const DeleteComponent = {
    template: `
        <div class="card">
            <Navigation></Navigation>
        </div>
        <div id="content">
            <div class="card-body">
                <h3 class="card-title">Delete Unit</h3>
                <form @submit.prevent="deleteUnit">
                    <div class="mb-3">
                        <label for="code" class="form-label">Code</label>
                        <input type="text" class="form-control" id="code" v-model="unitCode" placeholder="Enter unit code">
                    </div>
                    <button type="submit" class="btn btn-danger">Delete Unit</button>
                </form>
            </div>
        </div>
    `,
    setup() {
        const unitCode = ref('');

        const deleteUnit = () => {
            axios.delete(`/api/units/${unitCode.value}`)
                .then(response => {
                    if (response.data.success) {
                        alert('Unit deleted!');
                        router.push('/view'); // Redirect to view units after deletion
                    }
                })
                .catch(error => {
                    console.error('Error deleting unit:', error);
                    alert('Error deleting unit');
                });
        };

        return { unitCode, deleteUnit };
    },
    components: {
        Navigation
    }
};