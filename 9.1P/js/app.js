const { createApp, ref, computed } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// NameTest Component
const NameTestComponent = {
    template: `
        <div>
            <div class="mb-3">
                <label for="nameInput" class="form-label">Please enter your name:</label>
                <input type="text" class="form-control" id="nameInput" v-model="strName" placeholder="Enter your name">
            </div>
            <div v-if="strName">
                <p v-if="strName.toLowerCase() === myName.toLowerCase()">Awesome name!</p>
                <p v-else>{{ strName }} is not my name.</p>
            </div>
        </div>
    `,
    setup() {
        const strName = ref('');
        const myName = 'Luu Tuan Hoang';

        return {
            strName,
            myName
        };
    }
};

// PostManagement Component
const PostManagementComponent = {
    template: `
        <div class="card">
            <div class="card-body">
                <div class="input-group mb-3">
                    <input 
                        v-model="strStatus" 
                        type="text" 
                        class="form-control" 
                        placeholder="Enter your status"
                    />
                    <button @click="add" class="btn btn-primary ms-2" type="button">Post</button>
                </div>
                <ul class="list-group">
                    <li 
                        v-for="(status, index) in statPosts" 
                        :key="index" 
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {{ status }}
                        <button @click="remove(index)" class="btn btn-danger btn-sm">Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    `,
    setup() {
        const statPosts = ref([]);
        const strStatus = ref('');

        const add = () => {
            if (strStatus.value.trim()) {
                statPosts.value.unshift(strStatus.value.trim());
                strStatus.value = '';
            }
        };

        const remove = (index) => {
            statPosts.value.splice(index, 1);
        };

        return {
            statPosts,
            strStatus,
            add,
            remove
        };
    }
};

// StudentMarks Component
const StudentMarksComponent = {
    template: `
        <div>
            <h1>Student Marks</h1>
            <table class="table table-bordered">
                <caption>List of Student Marks</caption>
                <thead>
                    <tr>
                        <th id="name-header" scope="col">Name</th>
                        <th id="mark-header" scope="col">Mark</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in paginatedData" :key="student.name">
                        <td :headers="'name-header'">{{ student.name }}</td>
                        <td :headers="'mark-header'">{{ student.mark }}</td>
                    </tr>
                </tbody>
            </table>
            <nav>
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
                    </li>
                    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                        <button class="page-link" @click="changePage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    `,
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
};

// Routes
const routes = [
    { path: '/', component: NameTestComponent },
    { path: '/post-management', component: PostManagementComponent },
    { path: '/student-marks', component: StudentMarksComponent }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp({});
app.use(router);
app.mount('#app');