<template>
	<div class=" py-3">
		<b-container class="bg-light">
			<b-carousel controls class="w-100">
				<b-carousel-slide v-for="office in offices" :key="office._id">
					<template slot="img">
						<b-container>
							<b-jumbotron header="BootstrapVue" class="bg-dark p5" lead="Bootstrap v4 Components for Vue.js 2">
								<p>For more information visit website</p>
								<b-button variant="primary" href="#">More Info</b-button>
							</b-jumbotron>
						</b-container>
					</template>
				</b-carousel-slide>
			</b-carousel>
		</b-container>
	</div>
</template>

<script>
//import OfficeCardSmall from '../components/OfficeCardSmall'
import axios from "axios";
export default {
	components: {
		//OfficeCardSmall
	},
	data: () => ({
		offices: [],
		loaded: false
	}),
	mounted() {
		axios
			.get(this.$store.state.serverPath + "/api/office/")
			.then(res => {
				this.offices = res.data;
				this.loaded = true;
			})
			.catch(err => {
				console.log(err);
			});
	}
};
</script>

