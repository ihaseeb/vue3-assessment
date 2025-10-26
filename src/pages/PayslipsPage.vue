<template>
  <div class="text-navy-dark text-2xl font-semibold mb-4">My Payslips</div>

  <!-- Tabs -->
  <div class="bg-navy-dark pl-6 pr-6 rounded-t-2xl h-16">
    <div class="inline-flex h-full">
      <button
        v-for="tab in tabs"
        :key="tab.code"
        @click="active = tab.code"
        class="px-4 py-2 text-sm text-white font-medium transition-colors duration-200 h-full"
        :class="[
          active === tab.code
            ? 'bg-orange text-white'
            : 'hover:bg-orange bg-navy-dark',
        ]"
      >
        {{ tab.code }}<span class="">({{ tab.count }})</span>
      </button>
    </div>
  </div>
 <div class="bg-white p-6 border border-light-orange rounded-b-2xl">
    <div class="text-navy-dark text-2xl font-semibold mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>Payslips</span>
          <Icon name="chevron-right" class="w-4 h-4 text-navy-light" />
          <span>2025</span>
        </div>
        <button
          v-tooltip.left="'View salary evolution'"
          @click="isModalOpen = true"
          class="inline-flex items-center justify-center w-10 h-10 rounded-[16px] border border-[#1A3E6D] bg-navy-dark text-white hover:opacity-90 transition"
          aria-label="Open salary evolution"
        >
          <Icon name="salary-evolution" class="w-5 h-5" />
        </button>
      </div>
    </div>
    <!-- Table -->
    <div class="bg-white border border-border rounded-b-lg overflow-x-auto overflow-y-visible max-w-full">
      <table class="w-full text-sm">
        <thead class="bg-transparent text-dark-blue text-sm">
          <tr>
            <th class="w-10"></th>
            <th class="w-10 text-left px-4 py-3">#</th>
            <th class="w-40 text-left px-2 py-3">Period</th>
            <th class="text-left px-2 py-3">Payslips</th>
            <th class="w-48 text-right px-4 py-3">Gross salary</th>
            <th class="w-48 text-right px-4 py-3">Net pay</th>
            <th class="w-10 px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(payslip, index) in filtered"
            :key="payslip.id ?? index"
          >
            <tr class="border-t border-border">
              <td class="w-10 text-center align-middle bg-bg-4 text-navy-light hover:bg-navy-dark transition-colors duration-200 ease-out">
                <button
                  v-tooltip="expanded === index ? 'Close' : 'Expand'"
                  class="inline-flex items-center justify-center w-8 h-12 hover:text-white transition-colors duration-200"
                  @click="toggle(index)"
                  aria-label="Toggle row"
                >
                  <Icon
                    :name="expanded === index ? 'chevron-up' : 'chevron-down'"
                    class="w-4 h-4"
                  />
                </button>
              </td>
              <td class="w-10 px-4 py-3 align-middle">{{ index + 1 }}</td>
              <td class="w-40 px-2 py-3 align-middle text-dark-orange">
                {{ monthYear(payslip) }}
              </td>
              <td class="px-2 py-3 align-middle text-navy-light truncate">
                {{ fileName(payslip) }}
              </td>
              <td class="w-48 px-4 py-3 align-middle text-right">
                <span
                  class="inline-flex items-center gap-2 bg-pill-gray text-navy-dark px-2 py-1 rounded"
                  >{{ money(payslip, "GROSS") }}</span
                >
              </td>
              <td class="w-48 px-4 py-3 align-middle text-right">
                <span
                  class="inline-flex items-center gap-2 bg-pill-green text-pill-dark-green px-2 py-1 rounded"
                  >{{ money(payslip, "NET PAY") }}</span
                >
              </td>
              <td class="w-10 px-2 py-3 align-middle">
                <div class="relative flex justify-center">
                  <button
                    v-tooltip.left="'More'"
                    @click="menu = menu === index ? -1 : index"
                    class="p-1 rounded hover:bg-bg-3 w-5 h-5"
                  >
                    <Icon
                      name="dots-vertical"
                      class="w-5 h-5"
                    />
                  </button>
                  <div
                    v-if="menu === index"
                    class="absolute right-0 top-8 z-50 w-36 bg-white border border-border rounded shadow"
                  >
                    <button
                      class="w-full text-left px-3 py-2 hover:bg-bg-3"
                      @click="download(payslip)"
                    >
                      Download
                    </button>
                    <button class="w-full text-left px-3 py-2 hover:bg-bg-3">
                      View
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="-translate-y-2 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="-translate-y-2 opacity-0"
            >
              <tr v-if="expanded === index" class="bg-bg-2 border-t border-border">
                <td colspan="7">
                  <PdfViewer :src="srcPath(payslip)" />
                </td>
              </tr>
            </Transition>
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Salary Evolution Modal -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-2xl w-[100%] h-[100%] shadow-xl overflow-hidden flex flex-col">
        <div class="px-6 pt-5 shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="text-navy-light text-sm whitespace-nowrap mt-1">Mercans USA Ltd.</div>
              <div class="h-6 w-px bg-border mt-1"></div>
              <div>
                <div class="text-navy-dark text-xl font-semibold leading-tight">Gross/Net Salary Evolution</div>
                <div class="text-navy-light text-xs mt-1">TF2019 - Ted Ferguson</div>
              </div>
            </div>
            <button
              @click="isModalOpen = false"
              class="group inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-navy-dark text-white hover:opacity-80"
              aria-label="Close modal"
            >
              <Icon name="close" class="w-8 h-8 transition-transform duration-300 ease-out group-hover:-rotate-180" />
            </button>
          </div>
          <div class="mt-4 border-b border-border"></div>
        </div>
        <div class="flex-1 p-6 overflow-auto">
          <div class="h-full flex items-center justify-center text-navy-light italic border border-dashed rounded-lg">
            <img src="/src/assets/logos/no_design.svg" alt="Salary Evolution Chart" class="max-h-full max-w-full"/>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- click-away overlay for 3-dot menu -->
  <div
    v-if="menu !== -1"
    class="fixed inset-0 z-40"
    @click="menu = -1"
  ></div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import Icon from "@/components/common/Icon.vue";
import PdfViewer from "@/components/common/PdfViewer.vue";
import { usePayslips } from "@/stores/payslips";
import dayjs from "dayjs";

const currencyOf = (payslip: any): string => {
  const entries = payslip?.payslipEntries || [];
  const net = entries.find((x: any) => x.key === "NET PAY");
  const gross = entries.find((x: any) => x.key === "GROSS");
  return (net?.currency || gross?.currency || payslip.currency || "USD") as string;
};

const ps = usePayslips();
const { items } = storeToRefs(ps);

const groups = computed(() => {
  const map: Record<string, number> = {};
  for (const it of items.value) {
    const code = currencyOf(it);
    map[code] = (map[code] || 0) + 1;
  }
  return map;
});

const tabs = computed(() =>
  Object.entries(groups.value).map(([code, count]) => ({ code, count }))
);

const active = ref<string>("");

// keep active in sync with available tabs
watchEffect(() => {
  const codes = tabs.value.map((tab) => tab.code);
  if (!codes.length) {
    active.value = "";
  } else if (!codes.includes(active.value)) {
    active.value = codes[0];
  }
});

const filtered = computed(() =>
  active.value
    ? items.value.filter((x: any) => currencyOf(x) === active.value)
    : items.value
);

const expanded = ref<number>(-1);
const menu = ref<number>(-1);
const isModalOpen = ref(false)

const toggle = (index: number) => {
  expanded.value = expanded.value === index ? -1 : index;
  menu.value = -1;
};

const monthYear = (payslip: any) => {
  const rawDate = payslip.period || payslip.payrollDate;
  if (!rawDate) return "";
  const formatted = dayjs(rawDate).format("MMMM YYYY");
  return formatted;
};

const money = (payslip: any, key: string) => {
  const e = payslip.payslipEntries.find((x: any) => x.key === key);
  if (!e) return "";
  const c = e.currency || "";
  const v = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+e.amount || 0);
  return `${v} ${c}`.trim();
};

const srcPath = (payslip: any) =>
  `/payslipsFiles/${payslip.fileAttachment.accessToken}.pdf`;
const fileName = (payslip: any) =>
  (payslip.fileAttachment.file?.label || "payslip");

const download = (payslip: any) => {
  const a = document.createElement("a");
  a.href = srcPath(payslip);
  a.download = fileName(payslip);
  document.body.appendChild(a);
  a.click();
  a.remove();
};
</script>
