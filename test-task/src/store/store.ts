import { defineStore } from 'pinia';

interface Label {
  text: string;
}

interface Row {
  label: Label[];
  typeRecord: string;
  login: string;
  password?: string | null;
}

export const useStore = defineStore('main', {
  state: () => ({
    rows: (JSON.parse(localStorage.getItem('rows') || '[]') as Row[]),
  }),
  actions: {
    addRow() {
      this.rows.push({ label: [], typeRecord: 'LDAP', login: '', password: '' });
      this.saveToLocalStorage();
    },
    removeRow(index: number) {
      this.rows.splice(index, 1);
      this.saveToLocalStorage();
    },
    setRows(rows: Row[]) {
      this.rows = rows;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('rows', JSON.stringify(this.rows));
    },
  },
});