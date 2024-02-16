import { defineStore } from 'pinia';

export const useGenOptionStore = defineStore('genOption', {
  state: () => ({
    content: "",
    option: "",
    result:{}
  }),
  actions: {
    setContent(content) {
      this.content = content;
    },
    setOption(option) {
      this.option = option;
    },
    setResult(result) {
      this.result = result;
    },
  },
});