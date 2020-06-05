<template>
	<div class="position-relative" style="padding-top:0.75rem">
		<button class="border-0 rounded search-bar">
			<div
				style="height:2.5rem; line-height:2.5rem"
				class="text-black-50 px-3"
			>Encuentra tu oficina ideal..</div>
			<div class="filters">
				<div class="dropdown-divider"></div>
				<div class="p-3">
					<h5>Ubicación</h5>
					<b-row>
						<b-col class="pr-sm-1" cols="12" sm="6">
							<b-form-select v-model="selected" :options="statesList" size="sm"></b-form-select>
						</b-col>
						<b-col class="pl-sm-1 pt-2 pt-sm-0" cols="12" sm="6">
							<b-form-select :options="municipios" size="sm" :disabled="selected==null"></b-form-select>
						</b-col>
					</b-row>
					<br />
					<b-row>
						<b-col class="pr-sm-1" cols="12" sm="6">
							<h5>Precio</h5>
							<b-form-input size="sm" type="number" />
						</b-col>
						<b-col class="pl-sm-1" cols="12" sm="6">
							<h5>Fecha</h5>
							<b-form-datepicker size="sm"></b-form-datepicker>
						</b-col>
					</b-row>
					<div class="text-right">
						<b-button variant="primary mt-3" @click="showList">
							<span class="material-icons-round align-text-top">search</span>
							Buscar
						</b-button>
					</div>
				</div>
			</div>
		</button>
		<div class="position-absolute" style="top:1.25rem; right:1rem">
			<span class="material-icons-round text-black-50 d-inline-block">sort</span>
			<span class="material-icons-round text-black-50 d-inline-block">filter_alt</span>
		</div>
	</div>
</template>

<script>
import locationFilter from "../resources/location-filter.json";
export default {
	data: () => ({
		showFilter: false,
		locationFilter,
		statesList: Object.keys(locationFilter),

		selected: null
	}),
	computed: {
		municipios: function() {
			if (this.selected != null) return this.locationFilter[this.selected];
			return [];
		}
	},
	methods: {
		showList: function() {
			alert(this.selected);
		}
	}
};
</script>

<style>
select:invalid {
	color: gray;
}
.search-bar {
	width: 100%;
	height: auto;
	min-height: 2.5rem;
	text-align: left;
	background-color: #f8f9fa;
	transition: min-height 0.9s ease-in-out;
}
.search-bar:focus-within {
	outline: none;
	position: absolute;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.search-bar:hover {
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
.search-bar:hover:focus {
	cursor: default;
}
.filters {
	display: none;
}
.search-bar:focus-within .filters {
	display: block;
}
</style>