import { defineStore } from "pinia";

export const useUi = defineStore("ui", {
  state: () => ({
    sidebar: true,
  }),
  actions: {
    toggle() {
      this.sidebar = !this.sidebar;
    },
  },
});
