<template>
  <div>
    <h2>Charging Stations</h2>
    <div>
      <input v-model="filters.status" placeholder="Status" />
      <input v-model="filters.connectorType" placeholder="Connector Type" />
      <button @click="fetchChargers">Apply Filters</button>
    </div>

    <ChargerForm @saved="fetchChargers" />
    <ul>
      <li v-for="charger in filteredChargers" :key="charger._id">
        {{ charger.name }} ({{ charger.status }})
        <button @click="edit(charger)">Edit</button>
        <button @click="del(charger._id)">Delete</button>
      </li>
    </ul>
    <ChargerMap :chargers="chargers" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import ChargerForm from '../components/ChargerForm.vue'
import ChargerMap from '../components/ChargerMap.vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const chargers = ref([])
const filters = ref({ status: '', connectorType: '' })

const fetchChargers = async () => {
  try {
    if (!auth.token) {
      console.error("No auth token available");
      return;
    }
    
    const res = await axios.get('http://localhost:4000/api/stations', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    chargers.value = res.data
  } catch (error) {
    console.error("Error fetching chargers:", error);
  }
}

const filteredChargers = computed(() =>
  chargers.value.filter(c =>
    (!filters.value.status || c.status === filters.value.status) &&
    (!filters.value.connectorType || c.connectorType === filters.value.connectorType)
  )
)

const del = async (id) => {
  await axios.delete(`http://localhost:4000/api/stations/${id}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  fetchChargers()
}

const edit = (charger) => {
  localStorage.setItem('editing', JSON.stringify(charger))
}
fetchChargers()
</script>
