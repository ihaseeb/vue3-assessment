<template>
	<span v-html="svg" :class="cls"></span>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ name: string; class?: string }>();
// @ts-ignore
const files = import.meta.glob("@/assets/icons/*.svg", {
	as: "raw",
	eager: true,
});
const svg = computed(() => {
	const k = Object.keys(files).find((p) =>
		p.endsWith("/" + props.name + ".svg")
	);
	return k
		? (files as any)[k]
		: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="#ddd"/></svg>';
});
const cls = computed(() => props.class || "");
</script>