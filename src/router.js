import { createRouter, createWebHistory } from "vue-router";

import AppRegistration from "./components/AppAuth/AppRegistration.vue";
import AppLogin from "./components/AppAuth/AppLogin.vue";
import AppLayout from "./components/AppLayout/AppLayout.vue";
import AppCurrentMeet from "./components/AppCurrentMeet/AppCurrentMeet.vue";

const routes = [
	{ path: "/registration", component: AppRegistration },
	{ path: "/login", component: AppLogin },
	{ path: "/profile", component: AppLayout },
	{ path: "/history", component: AppLayout },
	{ path: "/current-meet", component: AppCurrentMeet },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
