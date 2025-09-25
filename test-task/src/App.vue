<template>
  <div id="app">
    <MyTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyTable from './components/MyTable.vue'; // Импортируем компонент MyTable

export default defineComponent({
  name: 'App',
  components: {
    MyTable, // Регистрация компонента
  },
});
</script>