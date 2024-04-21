<script setup>
import { ref } from "vue";
import store from "../../store";
import { useRouter } from "vue-router";

// Получаем объект маршрутизатора
const router = useRouter();

// Создаем реактивные переменные для хранения данных о пользователе

const user = {
	surname: "",
	name: "",
	patronymic: "",
	email: "",
	password: "",
	password_confirmation: "",
};

function register(ev) {
	ev.preventDefault();
	store.dispatch("register", user).then(() => {
		router.push({
			name: "Profile",
		});
	});
}
</script>

<template>
	<div class="form__layout">
		<div class="form__container">
			<h1 class="form__title">Регистрация</h1>
			<form action="" class="form" @submit="register">
				<input
					v-model="user.surname"
					class="form__input"
					placeholder="Фамилия"
					type="text" />
				<input
					v-model="user.name"
					class="form__input"
					placeholder="Имя"
					type="text" />
				<input
					v-model="user.patronymic"
					class="form__input"
					placeholder="Отчество"
					type="text" />
				<input
					v-model="user.email"
					class="form__input"
					placeholder="Почта"
					type="text" />
				<input
					v-model="user.password"
					class="form__input"
					placeholder="Пароль"
					type="text" />
				<input
					v-model="user.password_confirmation"
					class="form__input"
					placeholder="Повторите пароль"
					type="text" />
				<button class="form__button" @click="setUser">
					Продолжить
				</button>
				<span class="text-center">
					Уже зарегистрированы?
					<RouterLink
						@click="register"
						to="/login"
						class="cursor-pointer"
						>Войти</RouterLink
					>
				</span>
			</form>
		</div>
	</div>
</template>

<style scoped>
.form__layout {
	@apply flex h-[calc(100vh-120px)] items-center justify-center p-4;
}

.form__container {
	@apply rounded-xl bg-gray-100 px-6 py-8 sm:px-12;
}

.form__title {
	@apply mb-10 text-center text-3xl font-bold;
}

.form {
	@apply flex flex-col gap-4;
}

.form__input {
	@apply min-w-[300px] rounded-md bg-gray-200 p-4;
}

.form__button {
	@apply rounded-full bg-primary-dark-yellow px-[1.6em] py-[0.6em] hover:bg-primary-yellow;
}
</style>
