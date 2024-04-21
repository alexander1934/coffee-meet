<script setup>
import Calendar from "primevue/calendar";
import FileUpload from "primevue/fileupload";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axiosClient from "../../axios";
import { useRoute } from "vue-router";

const store = useStore();
const router = useRouter();

const image = ref("");
// const image = ref("https://cdn-img1.imgworlds.com/assets/a8f48ba2-9603-4e2b-ac2d-60ce06efa566.jpg?key=home-gallery");

function logout() {
	store.dispatch("logout").then(() => {
		router.push({
			name: "Login",
		});
		store.dispatch("getUser");
	});
}

const user = ref("");

const date = ref("");
const position = ref("");
const department = ref("");
const telegram = ref("");
const phoneNumber = ref("");
const about = ref("");

const route = useRoute();

const getUser = async () => {
	const response = await axiosClient.get("/get-profile-info");
	user.value = response.data;
	date.value = user.value.date_birth ? new Date(user.value.date_birth) : "";
	position.value = user.value.position;
	department.value = user.value.departament;
	telegram.value = user.value.telegram;
	phoneNumber.value = user.value.phone;
	about.value = user.value.about;
	image.value = user.value.avatar;
};

getUser();

const onUpload = () => {
	console.log("Work");
	window.location.reload();
};

const sendUser = async () => {
	const userData = {
		position: position.value,
		departament: department.value,
		about: about.value,
		phone: phoneNumber.value,
		telegram: telegram.value,
		date_birth: date.value,
	};
	await axiosClient.post("/update-profile-info", userData).then(
		(response) => {},
		(error) => {
			console.error("Error delete book:", error.message);
		},
	);
};

const updateProfile = () => {
	sendUser();
};
</script>

<template>
	<div
		v-if="user.id !== undefined"
		class="flex flex-col items-center justify-center">
		<h1 class="mb-10 font-bold">Профиль</h1>
		<h2 v-if="user.is_confirmed" class="mb-7 text-3xl font-bold">
			<span class="text-primary-dark-yellow">{{ user.surname }}</span>
			{{ user.name }}
			{{ user.patronymic }}
		</h2>
		<div
			v-if="user.is_confirmed"
			class="flex flex-col items-center justify-center gap-6">
			<div class="flex gap-5">
				<div class="flex flex-col justify-between gap-4">
					<div
						:style="{ 'background-image': `url(${image}` }"
						class="group flex h-full w-[400px] flex-col items-center justify-center gap-3 rounded-md bg-gray-100 hover:opacity-75">
						<img
							v-if="!image"
							src="../../assets/dragAndDrop.svg"
							alt="dragAndDrop" />
						<FileUpload
							class="bg-transparent text-gray-400"
							:class="{
								'hidden group-hover:block': image,
								block: !image,
							}"
							mode="basic"
							@upload="onUpload"
							name="avatar"
							:url="'http://norm-perdachello.ru:8000/api/upload/' + user.id"
							accept="image/*"
							:maxFileSize="1000000"
							:auto="true"
							chooseLabel="Загрузить" />
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<Calendar
						dateFormat="dd/mm/yy"
						class="form__input !p-0"
						showIcon
						iconDisplay="input"
						v-model="date"
						placeholder="Дата рождения" />
					<input
						placeholder="Должность"
						type="text"
						class="form__input"
						v-model="position" />
					<input
						placeholder="Отдел"
						type="text"
						class="form__input"
						v-model="department" />
					<input
						placeholder="Telegram"
						type="text"
						class="form__input"
						v-model="telegram" />
					<input
						placeholder="Номер телефона"
						type="text"
						class="form__input"
						v-model="phoneNumber" />
					<textarea
						class="form__input max-h-[92px] min-h-[92px]"
						placeholder="Расскажите о себе"
						v-model="about" />
				</div>
			</div>
			<button class="form__button" @click="updateProfile">
				Сохранить
			</button>
		</div>
		<h2 v-else class="flex items-center gap-5 text-3xl font-semibold">
			Ожидайте подтверждение от администратора
			<img src="../../assets/emoji.svg" class="w-7" alt="emoji" />
		</h2>
	</div>
	<div class="flex flex-col items-center justify-center font-bold" v-else>
		<h1>Загрузка...</h1>
	</div>
</template>

<style scoped>
:deep(.p-inputtext) {
	background-color: transparent;
	border-color: var(--teal-500);
	box-shadow: none;
	height: 100%;
	padding: 16px;
	font-family: Montserrat, sans-serif !important;
}

.form__input {
	@apply min-w-[300px] rounded-md bg-gray-100 p-4;
}

.form__button {
	@apply rounded-full bg-primary-dark-yellow px-[1.6em] py-[0.6em] hover:bg-primary-yellow;
}
</style>
