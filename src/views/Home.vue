<template>
<b-container class="bg-light mt-lg-3">
<b-overlay :show="!loaded" no-wrap/>

  <b-carousel controls class="w-100">
				<b-carousel-slide v-for="office in offices" :key="office._id">
					<template slot="img">
						<b-container class="">
							<b-jumbotron header="BootstrapVue" class="bg-dark truncate" lead="Bootstrap v4 Components for Vue.js 2">
								<p>For more information visit website</p>
								<b-button variant="primary" href="#">More Info</b-button>
							</b-jumbotron>
						</b-container>
					</template>
				</b-carousel-slide>
			</b-carousel>

      <h1 class="py-2">Últimas Novedades</h1>
			<b-row cols="2" cols-md="4">
        <b-col v-for="office in offices" :key="office._id">
          <OfficeCardSmall :officeModel="office"/>
        </b-col>
      </b-row>

      <div class="dropdown-divider my-3 border"></div>

      <div class="">
        esfesrgdtf
      </div>


</b-container>

	
</template>

<script>
import OfficeCardSmall from '../components/OfficeCardSmall'
import axios from "axios";
export default {
	components: {
		OfficeCardSmall
	},
	data: () => ({
		offices: [],
		loaded: false
	}),
	mounted() {
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
	}
};
</script>

