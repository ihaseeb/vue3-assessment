<template>
  <div :class="['inline-flex group', anchored ? 'relative' : '']">
    <slot />
    <div
      class="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-navy-dark text-white text-xs font-medium px-3 py-1 rounded-lg shadow-lg whitespace-nowrap"
      :class="[
        position === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2',
        position === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
        position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        position === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
      ]"
    >
      {{ text }}
      <span
        class="absolute w-2 h-2 bg-navy-dark rotate-45"
        :class="{
          'left-0 -ml-1 top-1/2 -translate-y-1/2': position === 'right',
          'right-0 -mr-1 top-1/2 -translate-y-1/2': position === 'left',
          'bottom-0 -mb-1 left-1/2 -translate-x-1/2': position === 'top',
          'top-0 -mt-1 left-1/2 -translate-x-1/2': position === 'bottom',
        }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
  position: { type: String, default: 'right' },
  anchored: { type: Boolean, default: false },
})
</script>
