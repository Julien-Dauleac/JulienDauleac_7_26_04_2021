<!-- Navigation et Header des pages principales -->

<template>
  <header class="mb-1 mb-md-3">
    <nav class="navbar navbar-expand-lg navbar-light">
      <!-- Logo Groupomania -->
      <h1 class="navbar-brand w-50">
        <router-link to="/Home">
          <img class="img-fluid" alt="Groupomania" src="../assets/logo-home.svg" role="link" />
        </router-link>
      </h1>
      <!-- Fin -->
      <!-- Menu de navigation -->
      <div
              class="collapse navbar-collapse align-self-end justify-content-end"
              id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          <p class="mr-lg-4 text-right">
            <router-link :to="{ name: 'Profile', params: {id: 'yourProfile' } }">Mon profil</router-link>
          </p>
          <p class="text-right">
            <router-link to="/">Se déconnecter</router-link>
          </p>
        </div>
      </div>
      <!-- Fin -->
    </nav>
  </header>
</template>

<script>
  export default {
    name: "NavHead",
  };
</script>
