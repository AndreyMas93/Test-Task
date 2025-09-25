<template>
  <input
    type="text"
    :value="formatLabel(labels)"
    @input="handleInput"
    placeholder="Значение"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LabelInput',
  props: {
    labels: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatLabel(labels: Array<{ text: string }>): string {
      return labels.map(item => item.text).join('; ');
    },
    handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      if (value.trim()) {
        const labels = value.split(';').map(item => ({ text: item.trim() }));
        this.$emit('handleLabelChange', labels);
      }
    },
  },
});
</script>