const LoginComponent = {
    template: `
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Login</h2>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter your username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password">
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        `,
    setup() {
        const username = ref('');
        const password = ref('');

        const login = () => {
            axios.post('/api/login', { username: username.value, password: password.value })
                .then(response => {
                    if (response.data.success) {
                        auth.loggedIn = true;
                        auth.username = username.value;
                        router.push('/view');
                    } else {
                        alert('Invalid login');
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    alert('Error during login');
                });
        };

        return { username, password, login };
    }
};