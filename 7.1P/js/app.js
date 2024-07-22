const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const posts = ref([]);

        const fetchPosts = () => {
            $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
                posts.value = data;
            });
        };

        onMounted(() => {
            fetchPosts();
        });

        return { posts };
    }
}).mount('#app');
