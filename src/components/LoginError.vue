<template>
	<div class="text-center h3">
		<LogIn modalId="loginModal" />
		<Register modalId="registerModal" />
		<b-row no-gutters>
			<b-col></b-col>
			<b-col lg="4">
				<span class="material-icons-round d-block text-danger" style="font-size:5rem">error_outline</span>
				{{ message }}
				<div class="dropdown-divider my-3"></div>
				<b-button variant="primary" block v-b-modal.loginModal>Iniciar Sesión</b-button>
				<b-button variant="primary" block v-b-modal.registerModal>Registrarse</b-button>
			</b-col>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
import LogIn from "../components/LogIn";
import Register from "../components/Register";
export default {
	components: {
		LogIn,
		Register
	},
	props: {
		message: String
	}
};
</script>

<style>
</style>