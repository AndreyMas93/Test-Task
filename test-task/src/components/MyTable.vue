<template>
  <div>
    <div style="margin-left: 30px">
      <h2 style="text-align: left; align-items: center; font-family: Arial, sans-serif">
        <span>Учетные записи</span>
        <button @click="addRow">+</button>
      </h2>
      <div style="display: flex; background-color: #cce2f89c; align-items: center; margin-right: 30px; font-family: Arial, sans-serif">
        <img src="@/assets/quest.svg" alt="" width="28px" height="28px">
        <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
      </div>
    </div>
    <nav>
      <TableComponent :rows="rows" @removeRow="removeRow" @validateInputs="validateInputs" @handleLabelChange="handleLabelChange" />
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/store';
import TableComponent from './Table.vue';

export default defineComponent({
  name: 'MyTable',
  components: {
    TableComponent,
  },
  setup() {
    const store = useStore();

    const addRow = () => {
      store.addRow();
    };

    const removeRow = (index: number) => {
      store.removeRow(index);
    };

    const validateInputs = () => {
      let allValid = true;

      store.rows.forEach((row) => {
        if (!row.login || (row.typeRecord !== 'LDAP' && !row.password)) {
          allValid = false;
        }
        if (row.typeRecord === 'LDAP') {
          row.password = null;
        }
      });

      if (allValid) {
        saveRows();
      }
    };

    const handleLabelChange = (index: number, labels: Array<{ text: string }>) => {
      store.rows[index].label = labels;
    };

    const saveRows = () => {
      store.saveToLocalStorage();
      console.log(store.rows);
    };

    return {
      rows: store.rows,
      addRow,
      removeRow,
      validateInputs,
      handleLabelChange,
    };
  },
});
</script>

<style scoped>
@import '../styles/styles.css';
</style>