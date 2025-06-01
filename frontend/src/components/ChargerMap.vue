<template>
  <l-map style="height: 400px" :zoom="zoom" :center="mapCenter">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <l-marker
      v-for="c in chargers"
      :key="c._id"
      :lat-lng="[c.location.latitude, c.location.longitude]"
    >
      <l-popup>
        <strong>{{ c.name }}</strong><br />
        Status: {{ c.status }}<br />
        Power: {{ c.powerOutput }}kW<br />
        Connector: {{ c.connectorType }}
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup>
// Import Leaflet CSS first to ensure it's loaded before the components
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { computed, onMounted } from 'vue';

const props = defineProps({ 
  chargers: Array,
  defaultCenter: {
    type: Array,
    default: () => [20.5937, 78.9629] // Default to India's center
  },
  zoom: {
    type: Number,
    default: 13
  }
});

// Calculate map center based on chargers or use default
const mapCenter = computed(() => {
  if (!props.chargers || props.chargers.length === 0) {
    return props.defaultCenter;
  }
  
  // Calculate average of all charger locations
  const total = props.chargers.reduce(
    (acc, c) => {
      acc.lat += c.location.latitude;
      acc.lng += c.location.longitude;
      return acc;
    },
    { lat: 0, lng: 0 }
  );
  
  return [
    total.lat / props.chargers.length,
    total.lng / props.chargers.length
  ];
});

// Add this to help debug
onMounted(() => {
  console.log("ChargerMap mounted with", props.chargers?.length || 0, "chargers");
});
</script>

<style>
/* Add this at the end of your component */
.leaflet-container {
  height: 400px;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>