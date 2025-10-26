import { defineStore } from "pinia";
import data from "@/data/payslips.json";

type Entry = { key: string; amount: number; currency?: string };
type FileRef = { 
  id: number;
  file: { 
    mimeType: string;
    size: number;
    label: string;
    description: null;
    createTime: string;
  };
  accessToken: string 
};
type Item = {
  id: string;
  payrollDate: string;
  payslipEntries: Entry[];
  fileAttachment: FileRef;
};

export const usePayslips = defineStore("payslips", {
  state: () => ({
    items: data as Item[],
    sel: null as null | string,
    open: false,
  }),
  getters: {
    map: (s) => new Map(s.items.map((i) => [i.id, i])),
    src: (s) => {
      const id = s.sel;
      if (!id) return "";
      const it = (s.items as Item[]).find((x) => x.id === id);
      if (!it) return "";
      return `/payslipsFiles/${it.fileAttachment.accessToken}.pdf`;
    },
  },
  actions: {
    pick(id: string) {
      this.sel = id;
      this.open = true;
    },
    close() {
      this.open = false;
    },
  },
});
