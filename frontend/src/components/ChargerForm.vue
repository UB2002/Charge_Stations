<template>
  <div>
    <h3>{{ editing._id ? 'Edit' : 'Add' }} Station</h3>
    <form @submit.prevent="submit">
      <input v-model="editing.name" placeholder="Name" />
      <input v-model.number="editing.location.latitude" placeholder="Latitude" />
      <input v-model.number="editing.location.longitude" placeholder="Longitude" />
      <input v-model="editing.status" placeholder="Status" />
      <input v-model.number="editing.powerOutput" placeholder="Power Output" />
      <input v-model="editing.connectorType" placeholder="Connector Type" />
      <button>{{ editing._id ? 'Update' : 'Add' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const emit = defineEmits(['saved'])

const editing = ref({
  name: '', location: { latitude: 0, longitude: 0 },
  status: 'Active', powerOutput: 0, connectorType: ''
})

onMounted(() => {
  const saved = localStorage.getItem('editing')
  if (saved) {
    editing.value = JSON.parse(saved)
    localStorage.removeItem('editing')
  }
})

const submit = async () => {
  const url = editing.value._id
    ? `https://charge-stations.onrender.com/api/stations/${editing.value._id}`
    : 'https://charge-stations.onrender.com/api/stations'
  const method = editing.value._id ? 'put' : 'post'

  await axios[method](url, editing.value, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })

  emit('saved')
  editing.value = {
    name: '', location: { latitude: 0, longitude: 0 },
    status: 'Active', powerOutput: 0, connectorType: ''
  }
}
</script>
