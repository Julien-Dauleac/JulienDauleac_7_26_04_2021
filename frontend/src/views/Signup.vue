<!-- Page d'inscription -->

<template>
    <div class="container-fluid">
        <!-- Navigation -->
        <NavLog />
        <!-- Fin -->
        <template>
            <div>
                <div class="row">
                    <!-- Input pour le prénom -->
                    <div class="col-lg-2 col-md-4 offset-lg-4 offset-md-2 mb-2">
                        <input
                                class="form-control text-center"
                                type="text"
                                placeholder="Votre prénom"
                                id="firstName"
                                required
                                pattern="[a-zA-Z._-]{2,15}"
                                maxlength="30"
                                aria-label="Entrez votre prénom"
                                v-model="firstName"
                                v-on:input="sendData"
                        />
                    </div>
                    <!-- Fin -->
                    <!-- Input pour le nom -->
                    <div class="col-lg-2 col-md-4 mb-2">
                        <input
                                class="form-control text-center"
                                type="text"
                                placeholder="Votre nom"
                                id="lastName"
                                required
                                pattern="[a-zA-Z._-]{2,15}"
                                maxlength="30"
                                aria-label="Entrez votre nom"
                                v-model="lastName"
                                v-on:input="sendData"
                        />
                    </div>
                    <!-- Fin -->
                </div>
            </div>
        </template>
        <!-- Formulaire pour login -->
        <form onsubmit="return false">
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

    export default {
        name: "Signup",
        components: {
            NavLog,
            InfoLogin,
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
            sendData() { // Envois des données au parent pour traiter l'envois à l'API //
                const firstNameValid = document.getElementById("firstName").checkValidity();
                const lastNameValid = document.getElementById("lastName").checkValidity();
                if (firstNameValid && lastNameValid) {
                    this.$emit("data-sent", this.$data);
                }
            },
            updateDataLogin(data) {
                // Stock l'email et le mot de passe //
                this.email = data.email;
                this.password = data.password;
            },
            signup() {
                // Inscrit et connecte l'utilisateur //
                this.$axios
                    .post("user/signup", this.$data)
                    .then(() => {
                        this.$axios.post("user/login", this.$data).then((data) => {
                            sessionStorage.setItem("token", data.data.token);
                            this.$axios.defaults.headers.common["Authorization"] =
                                "Bearer" + data.data.token;
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
