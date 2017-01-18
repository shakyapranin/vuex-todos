const store = new Vuex.Store({
    state: {
        todos: [
            {
                taskName: 'Kill Samundra', completed: false
            },
            {
                taskName: 'Kill Ujjwal', completed: true,
            },
            {
                taskName: 'Conquer the world', completed: false
            }
        ],
    },
    actions: {
        AddTask({commit}, data){
            commit('Task_Added', data);
        },
        ChangeStatus({commit}, data){
            commit('Status_Changed', data);
        },
        DeleteTodo({commit}, data){
            commit('Delete_Task', data);
        }
    },
    mutations: {
        Task_Added: (state, data) => {
            state.todos.push({taskName: data.task, completed: false});
            state.taskName = '';
        },
        Status_Changed: (state, data) => {
            self.data = data;
            state.todos[data.index].completed = !state.todos[data.index].completed;
        },
        Delete_Task:(state, data) => {
            state.todos.splice([data.index],1);
        }
    }
});


let Home = {
    template: `
        <div>
            Home page
            <ul>
                <li v-for="(todo, index) in todos">
                    <b><span>{{ todo.taskName }}</span></b>
                    <p>Status: {{todo.completed}}</p>
                    <button @click="changeStatus(index)">Change</button>
                    <button @click="deleteTodo(index)">Delete</button>
                </li>
            </ul>
        </div>
    `,
    store: store,
    computed: {
        todos(){
            return store.state.todos;
        }
    },
    methods: {
        changeStatus(index){
            store.dispatch('ChangeStatus', {
                index: index
            });
        },
        deleteTodo(index){
            store.dispatch('DeleteTodo',{
                index
            })
        }
    }
};

let Todo = {
    template: `
        <div>
            Add tasks
            <form>
                <input type="text" v-model="task">
                <button @click="addNewTask">Save</button>
            </form>
        </div>
    `,
    data(){
        return {
            task: '',
            completed: false
        };
    },
    methods: {
        addNewTask(event){
            let task = this.task;
            store.dispatch('AddTask', {
                task: task
            });
            this.task = '';
            this.$router.push('/');
        }
    }
};