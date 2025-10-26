<template>
	<div class="box">
		<iframe
			:src="computedSrc"
			class="w-full h-full border-none"
			frameborder="0"
		></iframe>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ src: string }>()

const computedSrc = computed(() => {
	if (!props.src) return ''
	const hasHash = props.src.includes('#')
	const params = 'toolbar=0&navpanes=0&scrollbar=0&view=FitH'
	return hasHash ? `${props.src}&${params}` : `${props.src}#${params}`
})
</script>

<style scoped>
.box {
	height: 70vh;
	border: 1px solid #eee;
	overflow: hidden;
}
.pdf {
	width: 100%;
	height: 100%;
}
</style>