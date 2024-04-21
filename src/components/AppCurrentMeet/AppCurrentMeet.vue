<script setup>
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import Rating from "primevue/rating";

import { ref } from "vue";
import axiosClient from "../../axios.js";

const data = ref(null); // Начальное значение null

// Определение реактивных переменных
const currentUserDate = ref(null);
const colleagueDate = ref(null);
const selectedFormat = ref(null);
const formats = ref(null);
const colleagueFormat = ref(null);
const selectedTimeframe = ref(null);
const timeframes = ref(null);
const colleagueSelectedTimeframe = ref(null);

const visible = ref(false);
const visibleReviewModal = ref(false);
const review = ref();
const reviewArea = ref("");

const getUser = async () => {
	try {
		const response = await axiosClient.get("/meet");
		data.value = response.data;
		const date = new Date()
		visible.value = data.value.meet.is_confirmed;
		console.log(data.value.meet.is_confirmed)
		// Установка значений реактивных переменных после получения данных
		currentUserDate.value = data.value.user.date_and_time
			? new Date(data.value.user.date_and_time)
			: "";
		colleagueDate.value = data.value.colleague.date_and_time
			? new Date(data.value.colleague.date_and_time)
			: "";
		selectedFormat.value =
			data.value.user.is_online !== null
				? {
						name:
							data.value.user.is_online !== null
								? data.value.user.is_online
									? "Онлайн"
									: "Оффлайн"
								: "",
						code:
							data.value.user.is_online !== null
								? data.value.user.is_online
									? "online"
									: "offline"
								: "",
					}
				: "";
		formats.value = [
			{ name: "Онлайн", code: "online" },
			{ name: "Оффлайн", code: "offline" },
		];
		colleagueFormat.value =
			data.value.colleague.is_online !== null
				? data.value.colleague.is_online
					? "Онлайн"
					: "Оффлайн"
				: "";
		selectedTimeframe.value =
			data.value.user.duration !== null
				? { code: data.value.user.duration.split(" ")[0], name: data.value.user.duration }
				: "";
		timeframes.value = [
			{ name: "10 минут", code: "10" },
			{ name: "15 минут", code: "15" },
			{ name: "30 минут", code: "30" },
		];
		colleagueSelectedTimeframe.value = data.value.colleague.duration;
	} catch (error) {
		console.error("Ошибка при получении данных:", error);
	}
};

getUser();

const suggestMeetInfo = async () => {
	const meetData = {
		duration: selectedTimeframe.value.name,
		date_and_time: currentUserDate.value,
		is_online: selectedFormat.value.code === "online" ? 1 : 0,
	};
	console.log(meetData);
	await axiosClient.post("/meet", meetData).then(
		(response) => {},
		(error) => {
			console.error("Error delete book:", error.message);
		},
	);
};

const updateMeetInfo = () => {
	suggestMeetInfo();
	setTimeout(()=>{
		window.location.reload();
	}, 500)
};

const setIsReadyStatus = async () => {
	const meetData = {
		is_ready: 1,
	};
	console.log(meetData);
	await axiosClient.post("/change-readiness", meetData).then(
		(response) => {},
		(error) => {
			console.error("Error delete book:", error.message);
		},
	);
};

const updateIsReadyStatus = () => {
	setIsReadyStatus();
	setTimeout(() => {
		window.location.reload();
	}, 1000);
};

const handleYesBtn = () => {
	visible.value = false;
	setTimeout(() => {
		visibleReviewModal.value = true;
	}, 400);
};

const handleNoBtn = () => {
	visible.value = false;
	setTimeout(() => {
		visibleReviewModal.value = true;
	}, 400);
};

const handleSendReview = () => {
	visibleReviewModal.value = false;
};

const user = ref();

const getCurrentUser = async () => {
	const response = await axiosClient.get("/get-profile-info");
	user.value = response.data;
	console.log(user.value)
};

getCurrentUser();
</script>

<template>
	<Dialog
		class=""
		v-model:visible="visible"
		:closable="false"
		modal
		:style="{ width: '500px' }">
		<div class="font flex flex-col items-center justify-center gap-8">
			<h1 class="font text-3xl font-bold">Встреча состоялась?</h1>
			<div class="flex w-full justify-between gap-5">
				<button @click="handleYesBtn" class="form__button w-full">
					Да!
				</button>
				<button
					@click="visible = false"
					class="form__button w-full !bg-black !text-white">
					Нет...
				</button>
			</div>
		</div>
	</Dialog>
	<Dialog
		class=""
		v-model:visible="visibleReviewModal"
		:closable="false"
		modal
		:style="{ width: '500px' }">
		<div class="font flex flex-col items-center justify-center gap-8">
			<div class="flex w-full justify-between gap-5">
				<h1 class="font text-3xl font-bold">
					Оцените <br />
					встречу
				</h1>
				<Rating :cancel="false" v-model="review">
					<template #onicon>
						<img
							src="../../assets/lighting-mini.svg"
							height="40"
							width="40"
							alt="" />
					</template>
					<template #officon>
						<img
							src="../../assets/lighting-mini-gray.png"
							height="40"
							width="40"
							alt="" />
					</template>
				</Rating>
			</div>
			<textarea
				class="form__input max-h-[92px] min-h-[92px] w-full"
				placeholder="Расскажите о себе"
				v-model="reviewArea" />
			<button @click="handleSendReview" class="form__button w-full">
				Оценить
			</button>
		</div>
	</Dialog>
	<div v-if="data">
		<div
			v-if="user.is_ready"
			class="mb-20 flex flex-col items-center justify-center">
			<h1 class="mb-10 font-bold">
				У вас <span class="text-primary-dark-yellow">match</span>!
			</h1>
			<div class="flex flex-col items-center justify-center gap-10">
				<div class="flex w-full justify-start gap-10">
					<!--				блок описания-->
					<div
						class="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md bg-gray-100">
						<img
							src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
							class="h-full w-full rounded-md object-cover"
							alt="mock" />
					</div>
					<!--				поля с именем и т.д.-->
					<div class="flex flex-col gap-10">
						<h2 class="text-3xl font-semibold">
							{{ data.colleague.name }}, {{ data.colleague.age }}
						</h2>
						<div class="flex gap-5">
							<div class="flex items-center gap-2">
								<img
									src="../../assets/telegram.svg"
									class="w-7"
									alt="" />
								<span> {{ data.colleague.telegram }} </span>
							</div>
							<div class="flex items-center gap-2">
								<img
									src="../../assets/phone.svg"
									class="w-7"
									alt="" />
								<span> {{ data.colleague.phone }} </span>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<h3 class="text-xl font-semibold">
								{{ data.colleague.position }}
							</h3>
							<h4>{{ data.colleague.department }}</h4>
						</div>
						<div class="w-full max-w-[400px]">
							<span class="text-[#A3A3A3]">
								{{ data.colleague.about }}
							</span>
						</div>
					</div>
				</div>
				<!--			блок вы не согласовали встречу-->
				<div
					v-if="data.meet.is_confirmed"
					class="flex w-full items-center justify-start gap-5">
					<img src="../../assets/lighting.svg" alt="" />
					<div>
						<h3 class="text-xl font-bold">
							Вы согласовали встречу!
						</h3>
						<span>
							Формат, дата, время и место встречи успешно
							согласованы!
						</span>
					</div>
				</div>
				<div
					v-else
					class="flex w-full items-center justify-start gap-5">
					<img src="../../assets/lighting.svg" alt="" />
					<div>
						<h3 class="text-xl font-bold">
							Вы не согласовали встречу!
						</h3>
						<span>
							Чтобы согласовать встречу с коллегой необходимо
							указать одинаковые условия встречи!
						</span>
					</div>
				</div>
				<div class="flex w-full flex-col justify-start gap-5">
					<h3 class="text-3xl font-semibold">
						{{ data.colleague.name }} предлагает
					</h3>
					<div class="flex justify-between gap-4">
						<Calendar
							showTime
							hourFormat="24"
							disabled
							dateFormat="dd.mm.yy"
							class="form__input !p-0"
							v-model="colleagueDate"
							placeholder="Дата и время" />
						<input
							class="form__input"
							v-model="colleagueFormat"
							disabled
							placeholder="Формат" />
						<input
							class="form__input"
							v-model="colleagueSelectedTimeframe"
							disabled
							placeholder="Длительность" />
					</div>
				</div>
				<div class="flex w-full flex-col justify-start gap-5">
					<h3 class="text-3xl font-semibold">
						Сделай
						<span class="text-primary-dark-yellow">свой</span>
						выбор!
					</h3>
					<div class="flex justify-between gap-4">
						<Calendar
							showTime
							hourFormat="24"
							dateFormat="dd.mm.yy"
							class="form__input !p-0"
							showIcon
							iconDisplay="input"
							v-model="currentUserDate"
							placeholder="Дата и время" />
						<Dropdown
							class="form__input !p-0"
							v-model="selectedFormat"
							optionLabel="name"
							:options="formats"
							placeholder="Формат" />
						<Dropdown
							class="form__input !p-0"
							v-model="selectedTimeframe"
							optionLabel="name"
							:options="timeframes"
							placeholder="Длительность" />
					</div>
				</div>
				<div class="flex gap-5">
					<button
						:disabled="
						!(
							currentUserDate &&
							selectedFormat &&
							selectedTimeframe &&
							currentUserDate !== '' &&
							selectedFormat !== '' &&
							selectedTimeframe !== ''
						)
					"
						@click="updateMeetInfo"
						class="form__button disabled:!bg-gray-100 disabled:text-gray-300">
						Подтвердить
					</button>
					<button
						:disabled="!data.meet.is_confirmed"
						@click="visible = true"
						class="form__button disabled:!bg-gray-100 disabled:text-gray-300">
						Завершить
					</button>
				</div>
			</div>
		</div>
		<div
			v-else
			class="mt-20 flex flex-col items-center justify-center gap-10">
			<h1 class="text-center font-semibold">
				Хотите поучаствовать в <br />
				<span class="text-primary-dark-yellow">Random Coffee</span>?
			</h1>
			<button @click="updateIsReadyStatus" class="form__button">
				Конечно!
			</button>
		</div>
	</div>
	<div class="flex w-full justify-center" v-else>
		<h1 class="font-bold">Ожидайте распределения</h1>
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

:deep(.p-dialog) {
	--font-family: Montserrat, sans-serif !important;
}

:deep(.p-dropdown-filter-container) {
	background-color: transparent;
	border-color: var(--teal-500);
	box-shadow: none;
	height: 100%;
	font-family: Montserrat, sans-serif !important;
}

.font {
	font-family: Montserrat, sans-serif !important;
}

.form__input {
	@apply min-w-[300px] rounded-md bg-gray-100 p-4;
}

.form__button {
	@apply rounded-full bg-primary-dark-yellow px-[1.6em] py-[0.6em] hover:bg-primary-yellow;
}
</style>
