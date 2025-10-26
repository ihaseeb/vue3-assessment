<template>
  <button
    v-tooltip.right="'Expand'"
    v-if="!open"
    class="fixed top-[14px] left-0 z-50 w-[16px] h-[40px] bg-white text-white border border-navy-dark border-l-0 rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center"
    @click="uiStore.toggle()"
  >
    <Icon
      name="chevron-right"
      class="w-5"
    />
  </button>
  <Transition
    enter-active-class="transition-transform duration-200 ease-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-if="open"
      class="w-[240px] h-screen flex flex-col overflow-auto bg-white text-navy-light border-r border-border"
    >
      <!-- Brand card -->
      <div class="pb-4">
        <div class="bg-[#001738] text-white h-[72px] relative">
          <div class="flex items-center gap-3 p-4">
            <img
              src="/src/assets/logos/employee_self_service.svg"
              alt="HRS"
              class="h-10 w-auto"
            />
          </div>
          <button
            v-tooltip.right="'Collapse'"
            class="absolute top-[14px] right-0 w-[16px] h-[40px] bg-transparent text-white border border-white border-r-0 rounded-tl-[4px] rounded-bl-[4px] flex items-center justify-center"
            @click="uiStore.toggle()"
          >
            <Icon
              name="chevron-left"
              class="w-5"
            />
          </button>
        </div>

        <div class="flex flex-col items-center gap-3 mt-6">
          <img
            src="/src/assets/logos/boring_company.svg"
            alt="Boring Company"
            class="w-auto"
          />
        </div>

        <div class="flex items-center justify-center gap-2 mt-6">
          <button
            v-tooltip.bottom="'My Apps'"
            type="button"
            :class="chipButtonBase"
          >
            <Icon
              name="launchpad"
              class="w-5"
            />
          </button>
          <button
            v-tooltip.bottom="'News'"
            type="button"
            :class="chipButtonBase"
          >
            <Icon
              name="news"
              class="w-5"
            />
            <span
              class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-yellow"
            ></span>
          </button>
          <button
            v-tooltip.bottom="'Notifications'"
            type="button"
            :class="chipButtonBase"
          >
            <Icon
              name="notification"
              class="w-5"
            />
            <span
              class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-yellow"
            ></span>
          </button>
        </div>

        <div class="border-t border-border mt-6" />
      </div>

      <!-- Nav -->
      <nav class="px-3 pb-4 space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="'/' + item.path"
          :class="[navLinkBase, isRouteActive('/' + item.path) ? navLinkActive : navLinkHover]"
        >
          <Icon
            :name="item.icon"
            class="w-[22px] h-[22px]"
          />
          <span class="text-[12px] font-semibold">{{ formatMenuTitle(item.title) }}</span>
        </RouterLink>
      </nav>

      <!-- Version -->
      <div
        class="mt-auto p-4 border-t border-border bg-bg-4 flex items-center justify-center"
      >
        <span class="text-xs text-fg-3">Mercans © 2025</span>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Icon from "../common/Icon.vue";
import navData from "@/data/menuLinks.json";
import { useUi } from "@/stores/ui";

const uiStore = useUi();
defineProps<{ open: boolean }>();
const menuItems = computed(() =>
  [...navData].filter((x) => x.enabled).sort((a, b) => a.ordinal - b.ordinal)
);
const route = useRoute();
const isRouteActive = (p: string) => route.path === p;
const formatMenuTitle = (t: string) =>
  t
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const navLinkBase =
  "flex items-center gap-3 px-4 py-3 rounded-md no-underline transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-peach";
const navLinkHover = "hover:bg-highlight-peach";
const navLinkActive = "bg-highlight-peach ring-1 ring-navy-dark text-navy-light";
const chipButtonBase =
  "relative w-[64px] h-[32px] rounded-[6px] bg-transparent flex items-center justify-center transition-colors duration-200 ease-out hover:bg-highlight-peach focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-peach";
</script>
