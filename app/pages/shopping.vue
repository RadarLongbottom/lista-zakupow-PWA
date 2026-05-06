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
const activeListId = ref<number | null>(null)
const newListName = ref('')
const newItemName = ref('')

onMounted(() => {
  const saved = localStorage.getItem('shopping-lists')

  if (saved) {
    lists.value = JSON.parse(saved)
    activeListId.value = lists.value[0]?.id ?? null
  }
})

watch(
  lists,
  () => {
    localStorage.setItem('shopping-lists', JSON.stringify(lists.value))
  },
  { deep: true }
)

const activeList = computed(() => {
  return lists.value.find(list => list.id === activeListId.value) ?? null
})

const completedCount = computed(() => {
  return activeList.value?.items.filter(item => item.done).length ?? 0
})

const addList = () => {
  if (!newListName.value.trim()) return

  const list: ShoppingList = {
    id: Date.now(),
    name: newListName.value.trim(),
    items: []
  }

  lists.value.push(list)
  activeListId.value = list.id
  newListName.value = ''
}

const removeList = (id: number) => {
  lists.value = lists.value.filter(list => list.id !== id)

  if (activeListId.value === id) {
    activeListId.value = lists.value[0]?.id ?? null
  }
}

const addItem = () => {
  if (!newItemName.value.trim() || !activeList.value) return

  activeList.value.items.push({
    id: Date.now(),
    name: newItemName.value.trim(),
    done: false
  })

  newItemName.value = ''
}

const removeItem = (id: number) => {
  if (!activeList.value) return

  activeList.value.items = activeList.value.items.filter(
    item => item.id !== id
  )
}
</script>

<template>
  <section>
    <h1>Listy zakupów</h1>

    <div class="new-list">
      <input
        v-model="newListName"
        placeholder="Nazwa nowej listy..."
        @keyup.enter="addList"
      />

      <button @click="addList">
        Dodaj listę
      </button>
    </div>

    <div v-if="lists.length" class="layout">
      <aside class="sidebar">
        <button
          v-for="list in lists"
          :key="list.id"
          class="list-button"
          :class="{ active: list.id === activeListId }"
          @click="activeListId = list.id"
        >
          {{ list.name }}
        </button>
      </aside>

      <main v-if="activeList" class="content">
        <div class="header">
          <div>
            <h2>{{ activeList.name }}</h2>

            <p>
              Kupione:
              {{ completedCount }} / {{ activeList.items.length }}
            </p>
          </div>

          <button class="danger" @click="removeList(activeList.id)">
            Usuń listę
          </button>
        </div>

        <div class="new-item">
          <input
            v-model="newItemName"
            placeholder="Dodaj produkt..."
            @keyup.enter="addItem"
          />

          <button @click="addItem">
            Dodaj
          </button>
        </div>

        <div v-if="activeList.items.length" class="items">
          <div
            v-for="item in activeList.items"
            :key="item.id"
            class="item"
          >
            <label>
              <input type="checkbox" v-model="item.done" />

              <span :class="{ done: item.done }">
                {{ item.name }}
              </span>
            </label>

            <button class="danger" @click="removeItem(item.id)">
              Usuń
            </button>
          </div>
        </div>

        <p v-else>
          Ta lista jest pusta.
        </p>
      </main>
    </div>

    <p v-else class="empty">
      Nie masz jeszcze żadnej listy. Dodaj pierwszą listę zakupów.
    </p>
  </section>
</template>

<style scoped>
section {
  padding: 0 0 60px;
}

h1 {
  font-size: 42px;
  margin-bottom: 10px;
  font-weight: 800;
  color: #111827;
}

.new-list,
.new-item {
  display: flex;
  gap: 12px;
  margin: 24px 0;
}

input {
  flex: 1;
  padding: 16px;
  border: 1px solid #dbe3ee;
  border-radius: 16px;
  background: white;
  font-size: 15px;
  transition: 0.2s;
  outline: none;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

button {
  border: none;
  border-radius: 16px;
  padding: 14px 20px;
  background: linear-gradient(
    135deg,
    #2563eb,
    #1d4ed8
  );
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
}

button:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  margin-top: 20px;
}

.sidebar {
  background: white;
  padding: 18px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-button {
  background: #f3f4f6;
  color: #111827;
  border: none;
  text-align: left;
  padding: 16px;
  border-radius: 16px;
  font-weight: 600;
  box-shadow: none;
}

.list-button.active {
  background: linear-gradient(
    135deg,
    #2563eb,
    #1d4ed8
  );
  color: white;
}

.content {
  background: white;
  padding: 28px;
  border-radius: 28px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header h2 {
  margin: 0;
  font-size: 28px;
}

.header p {
  margin-top: 8px;
  color: #6b7280;
}

.items {
  display: grid;
  gap: 14px;
  margin-top: 24px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #f9fafb;
  padding: 18px;
  border-radius: 20px;

  transition: 0.2s;
}

.item:hover {
  transform: translateY(-2px);
  background: #f3f4f6;
}

.item label {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  font-weight: 500;
}

.item input[type='checkbox'] {
  width: 20px;
  height: 20px;
  accent-color: #2563eb;
}

.done {
  text-decoration: line-through;
  opacity: 0.5;
}

.danger {
  background: linear-gradient(
    135deg,
    #ef4444,
    #dc2626
  );
}

.empty {
  margin-top: 30px;
  color: #6b7280;
  font-size: 18px;
}

@media (max-width: 800px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .header,
  .new-list,
  .new-item {
    flex-direction: column;
    align-items: stretch;
  }

  h1 {
    font-size: 32px;
  }
}
</style>