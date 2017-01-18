const routes = [
    {
        path: '/', component: Home
    },
    {
        path: '/todo', component: Todo
    },

];

const router = new VueRouter({
    routes: routes
});