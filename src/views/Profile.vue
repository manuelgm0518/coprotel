<template>
	<b-container style="min-height:100vh;">
		<div v-if="!$store.state.user" style="height:80vh">
			<LoginError message="Inicia sesión para poder revisar tu perfil." class="vertical-middle" />
		</div>
		<div v-else>
			
			<b-overlay :show="!loaded" no-wrap class="mt-5 mt-md-0" />
			<b-card style="max-width: 60rem;" class=".card mt-4" deck>
				<div class="mt-4">
					<h1>Mi perfil</h1>
					<b-card img-src="https://placekitten.com/300/300" img-left class="mb-3">
						<b-card-text>
							<h4>Nombre: {{user.name}}</h4>
							<h4>Apellido: {{user.lastName}}</h4>
							<h4>Correo electrónico: {{user.email}}</h4>
							<div v-if="user.location">
								<h4>Estado: {{user.location.state.name}}</h4>
								<h4>Municipio: {{user.location.name}}</h4>
								<!--<img :src="$store.state.serverPath + '/file/' + user.image">-->
								<b-button variant="primary" @click="mostrar = !mostrar">Editar imagen</b-button>
								<template v-if="mostrar">
									<b-file class="image" placeholder="Elige una imagen" v-model="tempimg" @input="tempimg"></b-file>
									<b-button
										class="btn btn-primary btn-lg"
										style="float:right;"
										variant="primary"
										@click="mostrar = !mostrar, changePfp()"
									>Editar</b-button>
								</template>
								<b-button
									class="btn btn-primary btn-lg"
									style="float:right;"
									variant="danger"
									@click="logOut"
								>Cerrar sesión</b-button>
							</div>
						</b-card-text>
					</b-card>
				</div>
			</b-card>
			<div v-if="user.location">
				<b-card style="max-width: 60rem;" class=".card mt-4" deck>
					<div class="mt-4">
						<h2>Mis oficinas</h2>
						<div v-if="offices">
							<b-card v-for="(office, i) in offices" v-bind:key="i">
								<h3>{{office.name}}</h3>
								<!--<img :src="$store.state.serverPath + '/file/' + offices[i].images[0]">-->
								<b-button variant="success" @click="goOffice(office)">Ver más</b-button>
							</b-card>
						</div>
						<div v-else>
							<h4>No hay oficinas disponibles para mostrar</h4>
						</div>
					</div>
          <b-button variant="warning" @click="$router.push('/addoffice')">Agregar una oficina</b-button>
				</b-card>
      </div>
			<div>
				<b-card style="max-width: 60rem;" class=".card mt-4" deck>
					<div class="mt-4">
						<h2>Mis rentas</h2>
						<div v-if="rents">
							<b-card v-for="(rent, i) in rents" v-bind:key="i">
								<h3>{{rent.name}}</h3>
								<img :src="$store.state.serverPath + '/file/' + rents[i].images[0]" />
								<b-button variant="success" @click="goOffice(rent)">Ver más</b-button>
							</b-card>
						</div>
						<div v-else>
							<h4>No estás rentando ninguna oficina actualmente</h4>
						</div>
					</div>
				</b-card>
			</div>
		</div>
	</b-container>
</template>

<script>
import LoginError from "../components/LoginError";
import axios from "axios";

export default {
	name: "Profile",
	components: {
		LoginError
	},
	data() {
		return {
			mostrar: false,
      tempimg: null,
      loaded: false,
			user: {
				name: "",
				lastName: "",
				email: "",
				location: { name: "", state: { name: "" } },
				image: ""
			},
			offices: [],
			rents: []
		};
	},
	mounted() {
		this.user = this.$store.state.user;
		axios
			.get(this.$store.state.serverPath + "/api/office/user/" + this.user._id)
			.then(res => {
				console.log(res.data);
        this.offices = res.data;
        this.loaded = true;
			})
			.catch(err => {
				console.log(err);
			});
		axios
			.get(
				this.$store.state.serverPath + "/api/office/rents/user/" + this.user._id
			)
			.then(res => {
				console.log(res.data);
				this.rents = res.data;
			})
			.catch(err => {
				console.log(err);
			});
	},

	methods: {
		changePfp() {
			var formData = new FormData();
			formData.append("image", this.tempimg);
			axios.post(
				this.$store.state.serverPath + "/api/user/image/" + this.user._id,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			alert("aah"); //Falta poner la página de regreso
			this.$router.push("/");
			this.upadateUser();
		},
		goOffice(office) {
			this.$router.push("/office/" + office._id);
		},
		goLogin() {
			this.$router.push("/login/");
		},
		goRegister() {
			this.$router.push("/Register/");
		},
		logOut() {
			localStorage.clear();
			this.upadateUser();
			this.$router.push("/");
		},
		upadateUser() {
			if (localStorage.getItem("token")) {
				axios
					.get(
						this.$store.state.serverPath +
							"/api/user/logIn/verify/" +
							localStorage.getItem("token")
					)
					.then(res => {
						if (res.data.unauthorized) {
							localStorage.clear();
							this.$store.state.user = null;
						} else {
							this.$store.state.user = res.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.$store.state.user = null;
				localStorage.clear();
			}
			this.user = this.$store.state.user;
		}
	}
};
</script>

<style>
.card {
	margin: 0 auto; /* Added */
	float: none; /* Added */
	margin-bottom: 10px; /* Added */
}
</style>
    
