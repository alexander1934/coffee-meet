<script setup>
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";

import { ref } from "vue";
import { updateProfileApi } from "../../api/profile";

//ref для даты
const date = ref("");

//ref для формата
const selectedFormat = ref();
const formats = ref([
	{ name: "Онлайн", code: "online" },
	{ name: "Оффлайн", code: "offline" },
]);

//ref для длительности
const selectedTimeframe = ref();
const timeframes = ref([
	{ name: "10 мин", code: "10" },
	{ name: "15 мин", code: "15" },
	{ name: "30 мин", code: "30" },
]);
</script>

<template>
	<div class="mb-20 flex flex-col items-center justify-center">
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
					<h2 class="text-3xl font-semibold">Алиса, 23</h2>
					<div class="flex gap-5">
						<div class="flex items-center gap-2">
							<img
								src="../../assets/telegram.svg"
								class="w-7"
								alt="" />
							<span> @alica </span>
						</div>
						<div class="flex items-center gap-2">
							<img
								src="../../assets/phone.svg"
								class="w-7"
								alt="" />
							<span> +79897129550 </span>
						</div>
					</div>
					<div class="flex flex-col gap-3">
						<h3 class="text-xl font-semibold">
							Мл. инженер по тестированию
						</h3>
						<h4>Отдел по тестированию</h4>
					</div>
					<div class="w-full max-w-[400px]">
						<span class="text-[#A3A3A3]">
							Люблю путешествия, занимательный книги и вкусный
							кофе. Всерьез увлечена фотографией.
						</span>
					</div>
				</div>
			</div>
			<!--			блок вы не согласовали встречу-->
			<div class="flex items-center gap-5">
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
				<h3 class="text-3xl font-semibold">Алиса предлагает</h3>
				<div class="flex justify-between gap-4">
					<Calendar
						showTime
						hourFormat="24"
						dateFormat="dd/mm/yy"
						class="form__input !p-0"
						showIcon
						iconDisplay="input"
						v-model="date"
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
						v-model="date"
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
