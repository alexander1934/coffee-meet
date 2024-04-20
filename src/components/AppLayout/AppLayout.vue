<script setup>
import Calendar from "primevue/calendar";
import FileUpload from "primevue/fileupload";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { ref, onMounted } from "vue";
import { updateProfileApi } from "../../api/profile";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user.data);

const image = ref("");

// const user = {
// 	"id": 1,
// 	"name": "Alexander",
// 	"surname": "Kovalenko",
// 	"patronymic": "Sergeevich",
// 	"email": "alexankovalenko23@gmail.com",
// 	"position": "Temlead Vue dev",
// 	"department": "Frontend",
// 	"about": "Люблю играть на сларке в доту",
// 	"phone": "+79897129550",
// 	"telegram": "@alexanderrrkovalenko",
// 	"is_confirmed": true,
// 	"is_ready": "true"
// }

store.dispatch("getUser");

function logout() {
	store.dispatch("logout").then(() => {
		router.push({
			name: "Login",
		});
		store.dispatch("getUser");
	});
}

const date = ref(new Date("2024-04-10T00:00:00.000"));
console.log(date.value);
const position = ref(user.position);
const department = ref(user.department);
const telegram = ref(user.telegram);
const phoneNumber = ref(user.phone);
const about = ref(user.about);

const updateProfile = async () => {
	const profile = {
		date,
		position,
		department,
		telegram,
		phoneNumber,
		about,
	};
	await updateProfileApi(profile);
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
						:style="{ 'background-image': `url(${image.value})` }"
						class="flex h-full w-[400px] flex-col items-center justify-center gap-3 rounded-md bg-gray-100">
						<img
							src="../../assets/dragAndDrop.svg"
							alt="dragAndDrop" />
						<FileUpload
							class="bg-transparent text-gray-400"
							mode="basic"
							name="avatar"
							url="http://norm-perdachello.ru:8000/api/upload"
							accept="image/*"
							:maxFileSize="1000000"
							@upload="onUpload"
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
	<div
		class="flex flex-col items-center justify-center font-bold"
		v-else>
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
