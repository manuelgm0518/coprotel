<template>
	<b-modal
		:id="modalId"
		ref="modal"
		title="Iniciar Sesión"
		@show="resetModal"
		@hidden="resetModal"
		@ok="handleOk"
	>
		<form ref="form" @submit.stop.prevent="handleSubmit">
			<b-form-group
				:state="emailState"
				label="Email"
				label-for="email-input"
				invalid-feedback="Email is required"
			>
				<b-form-input id="email-input" v-model="user.email" :state="emailState" required></b-form-input>
			</b-form-group>
		</form>

		<form ref="form2" @submit.stop.prevent="handleSubmit">
			<b-form-group
				:state="passwordState"
				label="Password"
				label-for="password-input"
				invalid-feedback="Password is required"
			>
				<b-form-input
					id="password-input"
					v-model="user.password"
					type="password"
					:state="passwordState"
					required
				></b-form-input>
			</b-form-group>
		</form>
	</b-modal>
</template>

<script>
import axios from "axios";

export default {
	props: {
		modalId: String
	},
	data() {
		return {
			user: {
				email: "",
				password: ""
			},
			emailState: null,
			passwordState: null
		};
	},
	mounted() {
		if (this.$store.state.user != null) this.$router.push("/");
	},
	methods: {
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity();
			const valid2 = this.$refs.form2.checkValidity();
			this.emailState = valid;
			this.passwordState = valid2;
			return valid && valid2;
		},
		resetModal() {
			this.user.email = "";
			this.emailState = null;
			this.user.password = "";
			this.passwordState = null;
		},
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			// Trigger submit handler
			this.handleSubmit();
		},
		handleSubmit() {
			var err_info = false;

			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
				return;
			}
			// Hide the modal manually

			axios
				.post(this.$store.state.serverPath + "/api/user/logIn", this.user)
				.then(res => {
					if (res.data.error) {
						(err_info = true),
							//alert('Usuario o contraseña incorrecto'); //Falta ponerlo más bonito
							this.$bvToast.toast("Usuario o contraseña incorrectos", {
								title: `Error`,
								variant: `danger`,
								toaster: `b-toaster-top-center`,
								solid: true
							}),
							this.resetModal();
					} else {
						localStorage.setItem("token", res.data);
						this.upadateUser();
						this.$router.push("/");
					}
				})
				.catch(err => {
					console.log(err);
				});
			if (err_info)
				this.$nextTick(() => {
					this.$bvModal.hide("modal-prevent-closing");
				});
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
			//this.user = this.$store.state.user;
		}
	}
};
</script>

<style scoped>
</style>

