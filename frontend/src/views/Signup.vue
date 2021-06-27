<!-- Page d'inscription -->

<template>
    <div class="container-fluid">
        <!-- Navigation -->
        <NavLog />
        <!-- Fin -->
        <!-- Formulaire pour l'inscription -->
        <form onsubmit="return false">
            <InfoSignup v-on:data-sent="updateDataSignup" />
            <InfoLogin
                    validateText="S'inscrire"
                    v-on:data-sent="updateDataLogin"
                    v-on:request-sent="signup"
            >
                <template
                        v-slot:messagePassword
                >Doit contenir: 1 majuscule, 1 minuscule et 1 chiffre (8 caractères minimum)</template>
                <template v-slot:messageError>{{ message }}</template>
            </InfoLogin>
        </form>
        <!-- Fin -->
    </div>
</template>

<script>
    import NavLog from "../components/NavLog.vue";
    import InfoLogin from "../components/InfoLogin.vue";
    import InfoSignup from "../components/InfoSignup.vue";

    export default {
        name: "Signup",
        components: {
            NavLog,
            InfoLogin,
            InfoSignup
        },
        data: () => {
            return {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                message: null, // Message d'erreur //
            };
        },
        methods: {
            updateDataLogin(data) {
                // Stock l'email et le mot de passe //
                this.email = data.email;
                this.password = data.password;
            },
            updateDataSignup(data) {
                // Stock le prénom et le nom //
                this.firstName = data.firstName;
                this.lastName = data.lastName;
            },
            signup() {
                // Inscrit et connecte l'utilisateur //
                this.$axios
                    .post("user/signup", this.$data)
                    .then(() => {
                        this.$axios
                            .post("user/login", this.$data)
                            .then((data) => {
                            sessionStorage.setItem("token", data.data.token);
                            sessionStorage.setItem("admin", data.data.admin);
                            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.token;
                            this.$router.push("Home");
                        });
                    })
                    .catch((e) => {
                        if (e.response.status === 500) {
                            this.message = "Erreur serveur";
                        }
                        sessionStorage.removeItem("token");
                    });
            },
        },
        mounted() {
            // Défini le titre //
            document.title = "S'inscrire | Groupomania";
        },
    };
</script>
