<template>
	<b-container style="min-height:100vh;">
		<div v-if="!$store.state.user" style="height:80vh">
			<LoginError message="Inicia sesión para poder revisar tus rentas." class="vertical-middle" />
		</div>
		<div v-else>
			<h1 class="my-3">Mis Oficinas Rentadas</h1>
			<b-overlay :show="!loaded" no-wrap class="mt-5 mt-md-0" />

			<b-row>
				<b-col v-for="(rent, i) in rents" v-bind:key="i" lg="4">
					<b-card
						class="w-100 my-2 border-0 shadow"
						:img-src="$store.state.serverPath + '/file/' + offices[i].images[0]"
					>
						<h3>{{rent.name}}</h3>
						<b-button variant="success" @click="goOffice(rent)">Ver más</b-button>
					</b-card>
				</b-col>
			</b-row>

			<div style="height:75vh;" v-if="rents.length==0 && loaded">
				<h3 class="text-center vertical-middle text-muted">No se encontraron resultados</h3>
			</div>
		</div>
	</b-container>
</template>

<script>
import LoginError from "../components/LoginError";
import axios from "axios";
export default {
	name: "Rents",
	data: () => ({
		loaded: false,
		rents: []
	}),
	components: {
		LoginError
	},
	mounted() {
    this.loaded = false;
		axios
			.get(
				this.$store.state.serverPath + "/api/office/rents/user/" + this.$store.state.user._id
			)
			.then(res => {
				console.log(res.data);
        this.rents = res.data;
        this.loaded = true;
			})
			.catch(err => {
				console.log(err);
			});
	},
	methods: {
		goOffice(office) {
			this.$router.push("/office/" + office._id);
		}
	}
};
</script>

<style>
</style>