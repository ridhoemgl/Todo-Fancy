const app = new Vue({
    el: '#app',
    data() {
        return {
            isLogin: false,
            fullname: '',
            name: '',
            email: '',
            password: '',
            todos: [],
            title: ''
        }
    },
    mounted() {
        this.getTodos()
    },
    methods: {
        userLogin() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/signin',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    console.log(response);
                    this.isLogin = true
                })
                .catch(error => {
                    console.log(error);
                })
        },
        checkLogin() {
            let getToken = localStorage.getItem("token")
            if (getToken) {
            this.isLogin = true
            }
        },
        userSignup() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/signup',
                data: {
                    name: this.fullname,
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        logout(){
            localStorage.removeItem("token");
            this.isLogin = false
        },
        addTodos() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/create/todo',
                data: {
                    title: this.title
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getTodos() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/display/todo'
            })
                .then(response => {
                    this.todos = response.data.data
                })
                .catch(error => {
                    console.log(error);
                })
        },
        changeStatus(todoId) {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/update/${todoId}`
            })
                .then((response) => {
                    this.todos = response.data.data
                    return this.todos
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    computed: {
        stalkTodos() {
            return this.todos
        },
        stalkTest() {
            return this.total
        },
        stalkisLogin() {
            return this.isLogin
        }
    },
})