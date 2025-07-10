<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from './store/store';

interface Label {
  text: string;
}

interface Row {
  label: Label[];
  typeRecord: string;
  login: string;
  password?: string | null;
}

export default defineComponent({
  name: 'MyTable',
  setup() {
    const store = useStore();
    // функция добавления новой строки в таблицу
    const addRow = () => {
      store.addRow();
    };
    // функция удаления строки и данных
    const removeRow = (index: number) => {
      store.removeRow(index);
    };
    // проверка валидности полей логин/пароль
    const validateInputs = () => {
      let allValid = true;

      store.rows.forEach((row: Row) => {
        // проверка на пустые значения логина и пароля
        if (!row.login || (row.typeRecord !== 'LDAP' && (!row.password))) {
          allValid = false;
        }
        // присваивание значения null при типе LDAP
        if (row.typeRecord === 'LDAP') {
          row.password = null;
        }
      });
      // вызов функции сохранения и передачи состояния при положительной проверки на заполнение полей
      if (allValid) {
        saveRows();
      }
    };
    // разделение строки из столбца Метка по разделителю, запись разделенного текста в массив
    const handleLabelChange = (index: number, event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      if (value.trim()) {
        const labels = value.split(';').map(item => ({ text: item.trim() }));
        if (labels.length > 0) { 
          store.rows[index].label = labels;
        }
      }
    };
    // обратная функция записи массива в строку через разделитель
    const formatLabel = (labels: Array<{ text: string }>): string => {
      if (!Array.isArray(labels)) {
        return '';
      }
      return labels.map(item => item.text).join('; ');
    };
    // сохранение состояния
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
      formatLabel,
      saveRows,
    };
  },
});
</script>

<template>
  <div>
    <div style="margin-left: 30px">
      <h2 style="text-align: left; align-items: center; font-family: Arial, sans-serif">
        <span>
          Учетные записи
        </span>
        <!-- кнопка вызова функции добавления строк -->
        <button @click="addRow">+</button> 
      </h2>
      <div style="display: flex; background-color: #cce2f89c; align-items: center; margin-right: 30px; font-family: Arial, sans-serif">
        <img src="./assets/quest.svg" alt="" width="28px" height="28px">
        <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
      </div>
    </div>
    <nav>
      <table>
        <thead>
          <tr>
            <th>Метки</th>
            <th>Тип записи</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td class="column-23">
              <input
                type="text"
                :value="formatLabel(row.label)"
                @input="handleLabelChange(index, $event)"
                placeholder="Значение"
                @blur="validateInputs" />
            </td>
            <td class="column-23">
              <select v-model="row.typeRecord" @change="validateInputs">
                <option value="LDAP">LDAP</option>
                <option value="localType">Локальная</option>
              </select>
            </td>
            <td :colspan="row.typeRecord === 'LDAP' ? 2 : 1" class="column-23">
              <input
                type="text"
                v-model="row.login"
                placeholder="Логин"
                @blur="validateInputs"
                :class="{ 'input-error': !row.login }" />
            </td>
            <td v-if="row.typeRecord !== 'LDAP'" class="column-23">
              <input
                type="password"
                v-model="row.password"
                placeholder="Пароль"
                @blur="validateInputs"
                :class="{ 'input-error': !row.password && row.typeRecord !== 'LDAP' }" />
            </td>
            <td class="column-6">
              <div>
                <button @click="removeRow(index)">
                  <img src="./assets/trash.svg" alt="Удалить" width="75%" height="75%" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </nav>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-family: Arial, sans-serif;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 6px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.column-23 {
  width: 23%;
}

.column-6 {
  width: 6%;
}

input, select {
  width: calc(100% - 12px);
  padding: 6px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.input-error {
  border: 1px solid red;
}

button {
  padding: 8px;
  background-color: #1f1f1f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 5px;
}

button:hover {
  background-color: #555;
}
</style>