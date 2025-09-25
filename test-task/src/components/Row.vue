<template>
  <tr>
    <td class="column-23">
      <LabelInput
        :labels="localRow.label"
        @handleLabelChange="handleLabelChange"
      />
    </td>
    <td class="column-23">
      <select v-model="localRow.typeRecord" @change="updateRow">
        <option value="LDAP">LDAP</option>
        <option value="localType">Локальная</option>
      </select>
    </td>
    <td :colspan="localRow.typeRecord === 'LDAP' ? 2 : 1" class="column-23">
      <input
        type="text"
        v-model="localRow.login"
        placeholder="Логин"
        @blur="updateRow"
        :class="{ 'input-error': !localRow.login }"
      />
    </td>
    <td v-if="localRow.typeRecord !== 'LDAP'" class="column-23">
      <input
        type="password"
        v-model="localRow.password"
        placeholder="Пароль"
        @blur="updateRow"
        :class="{ 'input-error': !localRow.password && localRow.typeRecord !== 'LDAP' }"
      />
    </td>
    <td class="column-6">
      <div>
        <button @click="removeRow">
          <img src="@/assets/trash.svg" alt="Удалить" width="75%" height="75%" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import LabelInput from './LabelInput.vue';
import { useStore } from '@/store/store';

export default defineComponent({
  name: 'RowComponent',
  components: {
    LabelInput,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const localRow = ref({ ...store.rows[props.index] }); // Создаем локальную копию строки

    watch(
      () => store.rows[props.index],
      (newRow) => {
        localRow.value = { ...newRow }; // Обновляем локальную копию, если изменится строка в store
      }
    );

    const updateRow = () => {
      store.rows[props.index] = { ...localRow.value }; // Обновляем строку в store
      store.saveToLocalStorage(); // Сохраняем в localStorage
    };

    const handleLabelChange = (labels: Array<{ text: string }>) => {
      localRow.value.label = labels; // Обновляем локальное состояние
      updateRow(); // Обновляем store
    };

    const removeRow = () => {
      store.removeRow(props.index); // Удаляем строку из store
    };

    return {
      localRow,
      handleLabelChange,
      updateRow,
      removeRow,
    };
  },
});
</script>