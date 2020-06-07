<template>
	<div class="h-100 py-2">
		<button class="bg-light rounded search-bar p-2 px-4 vertical-middle" @focus="changeFocus">
			Encuentra tu oficina ideal...
			<div class="position-absolute d-inline" style="right:1rem">
				<span class="material-icons-round align-bottom">sort</span>
				<span class="material-icons-round align-bottom">filter_alt</span>
			</div>
			<div class="filters bg-light shadow rounded">
				<input
					placeholder="Busca etiquetas o palabras clave..."
					class="search-field w-100 rounded py-2 px-4"
					v-model="filters.searchText"
				/>
				<div class="dropdown-divider m-0"></div>
				<div class="p-3">
					<b-row>
						<b-col class="pr-sm-1" cols="12" sm="6">
							<h6>Estado</h6>
							<b-form-select v-model="filters.state" size="sm" @change="updateMunicipalities">
								<option v-for="(state,i) in statesList" :key="i" :value="state._id">{{ state.name }}</option>
							</b-form-select>
						</b-col>
						<b-col class="pl-sm-1 pt-2 pt-sm-0" cols="12" sm="6">
							<h6>Municipio</h6>
							<b-form-select v-model="filters.municipality" :disabled="filters.state==''" size="sm">
								<option
									v-for="(municipality,j) in municipalitiesList"
									:key="j"
									:value="municipality._id"
								>{{ municipality.name }}</option>
							</b-form-select>
						</b-col>
					</b-row>
					<b-row>
						<b-col class="pr-sm-1" cols="12" sm="6">
							<h6 class="mt-3">Precio</h6>
							<b-input-group size="sm">
								<b-form-input
									size="sm"
									placeholder="Desde"
									min="0"
									type="number"
									v-model="filters.minPrice"
								/>
								<b-form-input
									size="sm"
									placeholder="Hasta"
									min="0"
									type="number"
									v-model="filters.maxPrice"
								/>
							</b-input-group>
						</b-col>
						<b-col class="pl-sm-1" cols="12" sm="6">
							<h6 class="mt-3">Posteriores a</h6>
							<b-form-datepicker
								placeholder="Selecciona una fecha..."
								v-model="filters.afterDate"
								size="sm"
								:max="maxDate"
								locale="es"
							/>
						</b-col>
					</b-row>
					<div class="text-right">
						<b-button variant="primary mt-3 search-btn" @click="gotoSearch">
							<span class="material-icons-round align-bottom">search</span>
							Buscar
						</b-button>
					</div>
				</div>
			</div>
		</button>

		<b-modal id="login-modal" centered title="BootstrapVue">
			<p class="my-4">Vertically centered modal!</p>
		</b-modal>
	</div>
</template>

<script>
//import locationFilter from "../resources/location-filter.json";
import axios from "axios";

export default {
	data() {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const maxDate = new Date(today);
		return {
			filters: {
				searchText: "",
				state: "",
				municipality: "",
				minPrice: null,
				maxPrice: null,
				afterDate: ""
			},
			statesList: [],
			municipalitiesList: [],
			maxDate
		};
	},
	mounted() {
		axios
			.get(this.$store.state.serverPath + "/api/state")
			.then(res => {
				this.statesList = res.data;
			})
			.catch(err => {
				console.log(err);
			});
	},
	methods: {
		changeFocus: function() {
			document.getElementsByClassName("search-field")[0].focus();
		},
		gotoSearch: function() {
			document.getElementsByClassName("search-btn")[0].blur();
			document.getElementsByClassName("search-bar")[0].blur();
			this.$store.state.filters = this.filters;
			if (this.$route.name != "Search") this.$router.push({ name: "Search" });
		},
		updateMunicipalities: function() {
			axios
				.get(
					this.$store.state.serverPath +
						"/api/municipality/" +
						this.filters.state
				)
				.then(res => {
					this.municipalitiesList = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style>
.search-bar {
	width: 100%;
	text-align: left;
	font-weight: 500;
	border: none;
	color: gray;
}
.search-field {
	width: 100%;
	border: none;
	background: transparent;
}
.filters {
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
}
.search-bar:focus-within .filters {
	display: block;
}
.search-bar:focus-within .filters:hover {
	cursor: default;
}
</style>