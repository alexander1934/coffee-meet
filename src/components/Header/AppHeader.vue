<script setup>
import store from "../../store/index.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";

const links = [
	{
		name: "Актуальная встреча",
		link: "/current-meet",
	},
	{
		name: "История встреч",
		link: "/history",
	},
	{
		name: "Профиль",
		link: "/profile",
	},
];

const route = useRoute();

const router = useRouter();

const isAuth = ref(true);

watchEffect(() => {
	// Проверяем путь при загрузке страницы
	isAuth.value = !(route.path === "/login" || route.path === "/registration");
});
</script>

<template>
	<header class="header">
		<div class="header__layout">
			<div class="header__block">
				<img class="w-28" src="../../assets/appIcon.png" alt="" />
			</div>
			<nav v-if="isAuth" class="flex gap-20">
				<RouterLink
					v-for="link in links"
					exactActiveClass="text-primary-dark-yellow"
					class="hidden text-black md:block"
					:to="link.link"
					>{{ link.name }}</RouterLink
				>
				<div></div>
			</nav>
		</div>
	</header>
</template>

<style scoped>
.header {
	@apply flex items-center justify-between p-6;
}

.header__layout {
	@apply mx-auto flex w-full max-w-[1280px] items-center justify-between;
}

.header__block {
	@apply flex items-center gap-3 text-white;
}

.header__title {
	@apply hidden text-2xl sm:block;
}

.header__avatar {
	@apply h-14 w-14 rounded-full object-cover;
}

.header__sign-in-text {
	@apply text-white group-hover:text-green-400;
}

.header__sign-in {
	@apply h-6 w-6;
}

.header__sign-in-svg {
	@apply max-w-none stroke-white group-hover:stroke-green-400;
}
</style>
