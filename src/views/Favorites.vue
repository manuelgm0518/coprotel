<template>
	<b-container style="min-height:100vh;">
		<div v-if="!$store.state.user" style="height:80vh">
			<LoginError message="Inicia sesión para ver tus oficinas favoritas." class="vertical-middle" />
		</div>
		<div v-else>
			<h1 class="my-3">Oficinas favoritas</h1>
			<b-overlay :show="!loaded" no-wrap class="mt-5 mt-md-0" />
			<b-row>
				<b-col v-for="(office, i) in offices" v-bind:key="i" lg="4">
					<b-card
						class="w-100 my-2 border-0 shadow"
						:img-src="$store.state.serverPath + '/file/' + offices[i].images[0]"
					>
						<h3>{{office.name}}</h3>
						<b-button variant="success" @click="goOffice(office)">Ver más</b-button>
					</b-card>
				</b-col>
			</b-row>
			<div style="height:75vh;" v-if="offices.length==0 && loaded">
				<h3 class="text-center vertical-middle text-muted">No se encontraron resultados</h3>
			</div>
		</div>
	</b-container>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			user: null,
      offices: [],
      statesList: [],
			municipalitiesList: [],
			loaded: false
		};
	},
	mounted() {
		this.user = this.$store.state.user;
		this.loaded = false;
		if (this.user.admin) if (this.user.admin == true) this.user = null;
		if (this.user)
			this.offices = [];
			axios
				.post(this.$store.state.serverPath + "/api/office/favorites", {
					offices: this.user.favorites
				})
				.then(res => {
					if (res.status == 200) this.offices = res.data;
					this.clearOffices();
					this.loaded = true;
				})
				.catch(err => {
					console.log(err);
        });
        axios
			.get(this.$store.state.serverPath + "/api/state")
			.then(res => {
        this.statesList = res.data;
			})
			.catch(err => {
				console.log(err);
			});
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
  updated() {
		if (this.filters.municipality) this.updateMunicipalities();
	},
	methods: {
		goOffice(office) {
			office;
			this.$router.push("/office/" + office._id);
		},
		clearOffices() {
			while (this.offices.indexOf(null) != -1)
				this.offices.splice(this.offices.indexOf(null), 1);
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
}
</script>