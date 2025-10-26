<template>
	<div class="flex flex-col h-full">
		<div class="flex flex-1 min-h-0">
			<Sidebar :open="ui.sidebar" />
			<main class="flex-1 overflow-auto bg-bg-4 p-8">
				<RouterView v-slot="{ Component }">
					<KeepAlive include="DashboardPage,MyInformationPage">
						<component :is="Component" />
					</KeepAlive>
				</RouterView>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { KeepAlive } from "vue";
import { useUi } from "@/stores/ui";
import Sidebar from "./Sidebar.vue";
const ui = useUi();
</script>