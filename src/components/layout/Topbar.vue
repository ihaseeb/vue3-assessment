<template>
	<header class="top">
		<button class="btn" @click="$emit('toggle')">☰</button>
		<div class="t">App</div>
	</header>
</template>

<script setup lang="ts"></script>

<style scoped>
.top {
	height: 48px;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 0 12px;
}
.btn {
	background: transparent;
	border: 0;
	font-size: 18px;
	cursor: pointer;
}
.t {
	font-weight: 600;
}
</style>