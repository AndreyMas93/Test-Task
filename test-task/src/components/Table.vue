<template>
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
      <RowComponent
        v-for="(row, index) in rows"
        :key="index"
        :row="row"
        :index="index"
        @removeRow="$emit('removeRow', index)"
        @validateInputs="$emit('validateInputs')"
        @handleLabelChange="handleLabelChange"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RowComponent from './Row.vue';

export default defineComponent({
  name: 'TableComponent',
  components: {
    RowComponent,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleLabelChange(index: number, labels: Array<{ text: string }>) {
      this.$emit('handleLabelChange', index, labels);
    },
  },
});
</script>