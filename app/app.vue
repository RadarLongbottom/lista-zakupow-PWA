<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/">Start</NuxtLink>
      <NuxtLink to="/shopping">Lista zakupów</NuxtLink>
      <NuxtLink to="/about">O aplikacji</NuxtLink>
    </nav>

    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  min-height: 100%;
  margin: 0;
}

body {
  font-family: Inter, Arial, sans-serif;
  color: #111827;
  background: #eef5ff;
}

#__nuxt {
  min-height: 100vh;
  background: linear-gradient(180deg, #eef5ff 0%, #f8fafc 100%);
}

.nav {
  display: flex;
  gap: 24px;
  padding: 22px 32px;
  background: transparent;
}

.nav a {
  text-decoration: none;
  color: #111827;
  font-weight: 700;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 70px 20px;
}
</style>