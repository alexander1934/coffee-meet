<script setup>
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";

import { ref } from "vue";

const data = {
		meet: {
			"id": "integer",
			"date_and_time": "string",
			"is_online": "bool",
			"is_done": "bool",
			"is_confirmed": true,
			"duration": "string"
		},
		colleague: {
			"id": "integer",
			"name": "Миша",
			"age": "20",
			"surname": "string",
			"patronymic": "string",
			"email": "string",
			"position": "Старший бабл ти порридж",
			"department": "Отдел смузихлебов",
			"about": "Люблю хакатоны и матюкаться. А также пить, курить и употреблять наркотики",
			"phone": "898982392342",
			"telegram": "@smoosiehleb",
			"is_confirmed": "bool",
			"is_ready": "bool",
			"duration": "30 мин",
			"date_and_time": "2024-04-01T00:07:00.000Z",
			"is_online": true
		},
		user: {
			"id": "integer",
			"name": "string",
			"surname": "string",
			"patronymic": "string",
			"email": "string",
			"position": "string",
			"department": "string",
			"about": "string",
			"phone": "string",
			"telegram": "string",
			"is_confirmed": "bool",
			"is_ready": true,
			"duration": "30 мин",
			"date_and_time": "2024-04-01T00:05:00.000Z",
			"is_online": false
		}
}

//ref для даты
const currentUserDate = ref(new Date(data.user.date_and_time));
const colleagueDate = ref(new Date(data.colleague.date_and_time));

//ref для формата для текущего юзера
const selectedFormat = ref({ name: data.user.is_online ? "Онлайн" : "Оффлайн", code: data.user.is_online ? "online" : "offline" });
const formats = ref([
	{ name: "Онлайн", code: "online" },
	{ name: "Оффлайн", code: "offline" },
]);

//ref для формата коллеги
const colleagueFormat = ref(data.colleague.is_online ? "Онлайн" : "Оффлайн");

//ref для длительности текущего юзера
const selectedTimeframe = ref({code: "30", name: data.user.duration});
const timeframes = ref([
	{ name: "10 мин", code: "10" },
	{ name: "15 мин", code: "15" },
	{ name: "30 мин", code: "30" },
]);

//ref для длительности коллеги
const colleagueSelectedTimeframe = ref(data.colleague.duration);

</script>

<template>
	<div v-if="data.user.is_ready" class="mb-20 flex flex-col items-center justify-center">
		<h1 class="mb-10 font-bold">
			У вас <span class="text-primary-dark-yellow">match</span>!
		</h1>
		<div class="flex flex-col items-center justify-center gap-10">
			<div class="flex gap-10">
				<!--				блок описания-->
				<div
					class="flex h-[400px] w-[400px] flex-col items-center justify-center bg-gray-100">
					<img
						src="../../assets/mock.jpg"
						class="h-full w-full rounded-md object-cover"
						alt="mock" />
				</div>
				<!--				поля с именем и т.д.-->
				<div class="flex flex-col gap-10">
					<h2 class="text-3xl font-semibold">{{data.colleague.name}}, {{data.colleague.age}}</h2>
					<div class="flex gap-5">
						<div class="flex items-center gap-2">
							<img
								src="../../assets/telegram.svg"
								class="w-7"
								alt="" />
							<span> {{data.colleague.telegram}} </span>
						</div>
						<div class="flex items-center gap-2">
							<img
								src="../../assets/phone.svg"
								class="w-7"
								alt="" />
							<span> {{data.colleague.phone}} </span>
						</div>
					</div>
					<div class="flex flex-col gap-3">
						<h3 class="text-xl font-semibold">
							{{data.colleague.position}}
						</h3>
						<h4>{{data.colleague.department}}</h4>
					</div>
					<div class="w-full max-w-[400px]">
						<span class="text-[#A3A3A3]">
							{{data.colleague.about}}
						</span>
					</div>
				</div>
			</div>
			<!--			блок вы не согласовали встречу-->
			<div v-if="data.meet.is_confirmed" class="flex justify-start w-full items-center gap-5">
				<img src="../../assets/lighting.svg" alt="" />
				<div>
					<h3 class="text-xl font-bold">
						Вы согласовали встречу!
					</h3>
					<span>
						Формат, дата, время и место встречи успешно согласованы!
					</span>
				</div>
			</div>
			<div v-else class="flex w-full justify-start items-center gap-5">
				<img src="../../assets/lighting.svg" alt="" />
				<div>
					<h3 class="text-xl font-bold">
						Вы не согласовали встречу!
					</h3>
					<span>
						Чтобы согласовать встречу с коллегой необходимо указать
						одинаковые условия встречи!
					</span>
				</div>
			</div>
			<div class="flex w-full flex-col justify-start gap-5">
				<h3 class="text-3xl font-semibold">{{data.colleague.name}} предлагает</h3>
				<div class="flex justify-between gap-4">
					<Calendar
						showTime
						hourFormat="24"
						disabled
						dateFormat="dd/mm/yy"
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
					<span class="text-primary-dark-yellow">свой</span> выбор!
				</h3>
				<div class="flex justify-between gap-4">
					<Calendar
						showTime
						hourFormat="24"
						dateFormat="dd/mm/yy"
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
			<button class="form__button">Подтвердить</button>
		</div>
	</div>
	<div v-else class="mt-20 flex gap-10 flex-col items-center justify-center">
		<h1 class="font-semibold text-center">Хотите поучаствовать в <br>
			<span class="text-primary-dark-yellow">Random Coffee</span>?
		</h1>
		<button class="form__button">Конечно!</button>
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

:deep(.p-dropdown-filter-container) {
	background-color: transparent;
	border-color: var(--teal-500);
	box-shadow: none;
	height: 100%;
	font-family: Montserrat, sans-serif !important;
}

.form__input {
	@apply min-w-[300px] rounded-md bg-gray-100 p-4;
}

.form__button {
	@apply rounded-full bg-primary-dark-yellow px-[1.6em] py-[0.6em] hover:bg-primary-yellow;
}
</style>
