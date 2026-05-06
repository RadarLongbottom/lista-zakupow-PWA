<template>
  <section class="hero">
    <h1>Smart Shopping List</h1>

    <p>
      Nowoczesna aplikacja PWA do tworzenia list zakupów.
    </p>

    <NuxtLink to="/shopping" class="button">
      Otwórz listę
    </NuxtLink>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 20px;
}

.button {
  display: inline-block;
  margin-top: 20px;
  padding: 14px 22px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 10px;
}
</style>