<template>
	<b-container style="min-height:100vh;">
		<div v-if="!$store.state.user" style="height:80vh">
			<LoginError message="Inicia sesión para poder revisar tu perfil." class="vertical-middle" />
		</div>
		<div v-else>
			<b-overlay :show="!loaded" no-wrap class="mt-5 mt-md-0" />
			<b-row class="mt-md-3">
				<b-col lg="5">
					<b-card class="border-0 shadow">
						<div class="text-center">
							<b-avatar
								:src="$store.state.serverPath + '/file/'+ user.image"
								class="bg-primary p-1"
								size="10rem"
							/>
							<h2 class="mt-3">{{ user.name+" "+user.lastName }}</h2>
						</div>
						<h5 class="truncate p-1 text-primary">{{user.location.state.name+", "+user.location.name}}</h5>
						<h5 class="p1 text-muted">{{user.email}}</h5>
						<h5 class="p1 text-muted">{{user.phone}}</h5>
						<b-button variant="outline-secondary mt-3" @click="mostrar=!mostrar" block>Editar imagen</b-button>
						<b-input-group v-if="mostrar" class="pt-2 pb-3">
							<b-file class="image" placeholder="Elige una imagen..." v-model="tempimg" @input="tempimg"></b-file>
							<b-input-group-append>
								<b-button
									class="btn btn-primary"
									variant="primary"
									@click="mostrar=!mostrar, changePfp()"
								>Guardar</b-button>
							</b-input-group-append>
						</b-input-group>
						<b-button variant="outline-danger" @click="logOut" block>Cerrar sesión</b-button>
					</b-card>
				</b-col>

				<b-col>
					<b-card class="border-0 shadow">
						<b-row>
							<h1 class="ml-3">Mis oficinas</h1>
							<b-col v-for="(office, i) in offices" v-bind:key="i" lg="6">
								<OfficeCardSmall :officeModel="office" />
							</b-col>
							<div v-if="offices.length==0 && loaded">
								<h4 class="text-muted ml-3">Aún no has registrado ninguna oficina</h4>
							</div>
						</b-row>
            <b-button variant="primary float-right mt-4" @click="$router.push('/addoffice')">Agregar una oficina</b-button>
					</b-card>
				</b-col>
			</b-row>
		</div>
	</b-container>
</template>

<script>
import LoginError from "../components/LoginError";
import OfficeCardSmall from "../components/OfficeCardSmall";
import axios from "axios";

export default {
	name: "Profile",
	components: {
		LoginError,
		OfficeCardSmall
	},
	data() {
		return {
			mostrar: false,
			tempimg: null,
			loaded: false,
			user: {
        _id: "",
				name: "",
				lastName: "",
				email: "",
				location: { name: "", state: { name: "" } },
				image: "",
				phone: ""
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
      if(this.$route.name!="Profile")
        this.$router.push({name:"Profile", params:{userId:this.user._id}});
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
    
