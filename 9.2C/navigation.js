const Navigation = {
    template: `
            <div class="btn-group">
                <button @click="logout" class="btn btn-danger">Logout</button>
                <button @click="navigate('view')" class="btn btn-info">View Units</button>
                <button @click="navigate('insert')" class="btn btn-success">Insert Unit</button>
                <button @click="navigate('update')" class="btn btn-warning">Update Unit</button>
                <button @click="navigate('delete')" class="btn btn-danger">Delete Unit</button>
            </div>
        `,
    setup() {
        const logout = () => {
            auth.loggedIn = false;
            auth.username = '';
            auth.password = '';
            router.push('/login');
        };

        const navigate = (path) => {
            router.push(`/${path}`);
        };

        return { logout, navigate };
    }
};