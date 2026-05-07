<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface ShoppingItem {
  id: number
  name: string
  done: boolean
}

interface ShoppingList {
  id: number
  name: string
  items: ShoppingItem[]
}

const lists = ref<ShoppingList[]>([])

onMounted(() => {
  const saved = localStorage.getItem('shopping-lists')

  if (saved) {
    lists.value = JSON.parse(saved)
  }
})

const latestList = computed(() => {
  return [...lists.value].sort((a, b) => b.id - a.id)[0] ?? null
})

const completedCount = computed(() => {
  return latestList.value?.items.filter(item => item.done).length ?? 0
})
</script>

<template>
  <section class="home">
    <div class="hero">
      <h1>Listy zakupów</h1>

      <p>
        Twórz swoje listy zakupów i miej je zawsze pod ręką.
      </p>

      <NuxtLink to="/shopping" class="button">
        Otwórz listy zakupów
      </NuxtLink>
    </div>

    <div v-if="latestList" class="latest-card">
      <p class="label">Najnowsza lista</p>

      <h2>{{ latestList.name }}</h2>

      <p class="progress">
        Kupione: {{ completedCount }} / {{ latestList.items.length }}
      </p>

      <ul v-if="latestList.items.length">
        <li
          v-for="item in latestList.items.slice(0, 5)"
          :key="item.id"
          :class="{ done: item.done }"
        >
          {{ item.name }}
        </li>
      </ul>

      <p v-else class="empty">
        Ta lista nie ma jeszcze produktów.
      </p>
    </div>

    <div v-else class="latest-card">
      <p class="label">Brak list</p>

      <h2>Utwórz pierwszą listę zakupów</h2>

      <p>
        Po dodaniu listy pojawi się ona tutaj na ekranie głównym.
      </p>
    </div>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  gap: 30px;
}

.hero {
  text-align: center;
  padding: 50px 20px;
}

.hero h1 {
  font-size: 46px;
  margin-bottom: 12px;
}

.hero p {
  color: #6b7280;
  font-size: 18px;
}

.button {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 22px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 700;
}

.latest-card {
  background: white;
  padding: 28px;
  border-radius: 28px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
}

.label {
  margin: 0;
  color: #2563eb;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 13px;
}

.latest-card h2 {
  margin: 10px 0;
  font-size: 30px;
}

.progress {
  color: #6b7280;
  font-weight: 600;
}

ul {
  display: grid;
  gap: 10px;
  padding: 0;
  margin-top: 20px;
  list-style: none;
}

li {
  background: #f9fafb;
  padding: 14px;
  border-radius: 16px;
  font-weight: 600;
}

.done {
  text-decoration: line-through;
  opacity: 0.5;
}

.empty {
  color: #6b7280;
}

@media (max-width: 700px) {
  .hero h1 {
    font-size: 34px;
  }
}
</style>