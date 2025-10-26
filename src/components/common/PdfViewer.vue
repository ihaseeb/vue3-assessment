<template>
	<div class="box">
		<object :data="src" type="application/pdf" class="pdf"></object>
	</div>
</template>

<script setup lang="ts">
defineProps<{ src: string }>();
</script>

<style scoped>
.box {
	height: 70vh;
	border: 1px solid #eee;
	border-radius: 8px;
	overflow: hidden;
}
.pdf {
	width: 100%;
	height: 100%;
}
</style>