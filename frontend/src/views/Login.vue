<!-- Page de connexion -->

<template>
    <div class="container-fluid">
        <!-- Navigation -->
        <NavLog />
        <!-- Fin -->
        <!-- Formulaire pour la connexion -->
        <form onsubmit="return false">
            <InfoLogin validateText="Se connecter" v-on:data-sent="updateData" v-on:request-sent="login">
                <template v-slot:messageError>{{ message }}</template>
            </InfoLogin>
        </form>
        <!-- Fin -->
    </div>
</template>

<script>
    import NavLog from "../components/NavLog.vue";
    import InfoLogin from "../components/InfoLogin.vue";

    export default {
        name: "Login",
        components: {
            NavLog,
            InfoLogin,
        },
        data: () => {
            return {
                email: "",
                password: "",
                admin:"",
                message: null, // Message d'erreur //
            };
        },
        methods: {
            updateData(data) {
                // Stock les infos de connexion //
                this.email = data.email;
                this.password = data.password;
                this.admin = data.admin;
            },
            login() {
                // Connecte l'utilisateur //
                this.$axios
                    .post("user/login", this.$data)
                    .then((data) => {
                        localStorage.setItem("token", data.data.token);
                        localStorage.setItem("admin", data.data.admin);
                        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.token;
                        this.$router.push("Home");
                    })
                    .catch((e) => {
                        if (e.response.status === 401) {
                            this.message = "Email ou mot de passe invalide";
                        }
                        if (e.response.status === 500) {
                            this.message = "Erreur serveur";
                        }
                        localStorage.removeItem("token");
                    });
            },
        },
        mounted() {
            // Supprime le token pour la déconnexion et défini le titre //
            localStorage.clear();
            delete this.$axios.defaults.headers.common["Authorization"];
            document.title = "Se connecter | Groupomania";
        },
    };
</script>
