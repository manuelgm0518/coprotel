<template>
	<b-container class="bg-light pb-5 pb-lg-2" style="padding-top:5rem; min-height:100vh">
		<b-row no-gutters>
			<b-col cols="12" lg="4" class="pr-lg-3 mt-lg-3">
				<b-card class="border-0 shadow">
					<h3 class="text-primary text-center">
						Búsqueda
						<span class="material-icons-round align-bottom mr-1" style="font-size:2rem">search</span>
					</h3>
					<b-input placeholder="Busca etiquetas o palabras clave..." v-model="filters.searchText" class="mb-2 mt-3" />
					<b-input-group class="mb-2">
						<b-form-select v-model="sortOption" :options="sortOptions" />
						<b-input-group-append>
							<b-button
								:pressed.sync="sortAsc"
								variant="light border"
							>{{ sortAsc ? "Ascendente" : "Descendente" }}</b-button>
						</b-input-group-append>
					</b-input-group>
					<b-button-group class="w-100">
						<b-button v-b-toggle.filter-collapse variant="light border w-100">
              <span class="material-icons-round align-bottom mr-1">{{ filterShown ? "expand_more" : "expand_less"}}</span>
              Filtros
            </b-button>
						<b-button variant="danger" @click="cleanFilter">
							<span class="material-icons-round align-bottom mr-1">cleaning_services</span>
						</b-button>
					</b-button-group>
					<b-collapse id="filter-collapse" v-model="filterShown" class="mt-2">
						<b-card>
							<h6>Ubicación</h6>
							<b-form-select v-model="filters.state" :options="statesList" size="sm"></b-form-select>
							<b-form-select
								v-model="filters.municipality"
								:options="municipios"
								size="sm"
								:disabled="filters.state==''"
								class="mt-2"
							/>
							<h6 class="mt-3">Precio</h6>
							<b-input-group size="sm">
								<b-form-input size="sm" placeholder="Desde" min="0" type="number" v-model="filters.minPrice" />
								<b-form-input size="sm" placeholder="Hasta" min="0" type="number" v-model="filters.maxPrice" />
							</b-input-group>
							<h6 class="mt-3">Posteriores a</h6>
							<b-form-datepicker
								placeholder="Selecciona una fecha..."
								@click.prevent
								v-model="filters.afterDate"
								size="sm"
								:max="maxDate"
								locale="es"
							/>
						</b-card>
					</b-collapse>
					<b-button block variant="primary mt-2" @click="searchQuery">Buscar</b-button>
				</b-card>
			</b-col>

			<b-col cols="12" lg="8">
				<b-overlay :show="!loaded" no-wrap class="mt-5 mt-md-0" />
				<OfficeCard v-for="office in offices" :key="office._id" :officeModel="office" />
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import OfficeCard from "../components/OfficeCard";
import locationFilter from "../resources/location-filter.json";
import axios from "axios";
export default {
	name: "Search",
	data() {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const maxDate = new Date(today);
		return {
			filters: {
				searchText: "",
				state: "",
				municipality: "",
				minPrice: 0,
				maxPrice: 0,
				afterDate: ""
      },
      filterShown:true,
			locationFilter,
			statesList: Object.keys(locationFilter),
			maxDate,
			offices: [],
			loaded: false,
			sortOption: "Fecha",
			sortOptions: ["Fecha", "Precio", "Espacio", "Capacidad"],
			sortAsc: false
		};
	},
	components: {
		OfficeCard
	},
	mounted() {
    this.filters = this.$store.state.filters;
		this.loaded = false;
		axios
			.get(this.$store.state.serverPath + "/api/office/")
			.then(res => {
				this.offices = res.data;
				this.loaded = true;
			})
			.catch(err => {
				console.log(err);
			});
	},
	computed: {
		municipios: function() {
			if (this.filters.state != null) return this.locationFilter[this.filters.state];
			return [];
		}
	},
	methods: {
		cleanFilter: function() {
      this.filters.searchText = "";
      this.filters.searchTex = "";
			this.filters.state = "";
			this.filters.municipality = "";
			this.filters.minPrice = "";
			this.filters.maxPrice = "";
			this.filters.afterDate = "";
		},
		searchQuery: function() {
			this.loaded = false;
			axios.post(this.$store.state.serverPath + "/api/office/search", this.filters)
			.then(res => {
				if(res.status == 200){
					this.offices = res.data;
					this.loaded = true;
				}
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
};
</script>

<style>
</style>