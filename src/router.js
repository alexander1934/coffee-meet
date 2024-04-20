import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

import AppRegistration from "./components/AppAuth/AppRegistration.vue";
import AppLogin from "./components/AppAuth/AppLogin.vue";
import AppLayout from "./components/AppLayout/AppLayout.vue";
import AppCurrentMeet from "./components/AppCurrentMeet/AppCurrentMeet.vue";

const routes = [
	{ path: "/registration", component: AppRegistration, name: "Register" },
	{ path: "/login", component: AppLogin, name: "Login" },
	{ path: "/app", component: AppLayout, name: "App" },
	{ path: "/profile", component: AppLayout, name: "Profile" },
	{ path: "/history", component: AppLayout },
	{ path: "/current-meet", component: AppCurrentMeet },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !store.state.user.token) {
		next({ name: "Login" });
	} else if (
		store.state.user.token &&
		(to.name === "Login" || to.name === "Register")
	) {
		next({ name: "Profile" });
	} else {
		next();
	}
});

export default router;
