<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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

watch(
  lists,
  () => {
    localStorage.setItem('shopping-lists', JSON.stringify(lists.value))
  },
  { deep: true }
)

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
      <h1>Smart Shopping List</h1>

      <p>
        Twórz wiele list zakupów i zaznaczaj produkty bezpośrednio z ekranu głównego.
      </p>

      <NuxtLink to="/shopping" class="button">
        Zarządzaj listami
      </NuxtLink>
    </div>

    <div v-if="latestList" class="latest-card">
      <p class="label">Najnowsza lista</p>

      <h2>{{ latestList.name }}</h2>

      <p class="progress">
        Kupione: {{ completedCount }} / {{ latestList.items.length }}
      </p>

      <div v-if="latestList.items.length" class="items">
        <label
          v-for="item in latestList.items"
          :key="item.id"
          class="item"
        >
          <input
            v-model="item.done"
            type="checkbox"
          />

          <span :class="{ done: item.done }">
            {{ item.name }}
          </span>
        </label>
      </div>

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

.items {
  display: grid;
  gap: 12px;
  margin-top: 22px;
}

.item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #f9fafb;
  padding: 16px;
  border-radius: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.item:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.item input {
  width: 20px;
  height: 20px;
  accent-color: #2563eb;
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