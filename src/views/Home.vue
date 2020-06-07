<template>
	<b-container class="bg-light mt-lg-3">
		<b-overlay :show="!loaded" no-wrap />

		<b-carousel controls class="w-100">
			<b-carousel-slide v-for="(jumbo,i) in jumbotronInfo" :key="i">
				<template slot="img">
					<b-container>
						<b-jumbotron
							:header="jumbo.title"
							:lead="jumbo.subtitle"
							class="bg-secondary border shadow truncate"
						>
							<p>{{jumbo.text}}</p>
						</b-jumbotron>
					</b-container>
				</template>
			</b-carousel-slide>
		</b-carousel>

		<h1 class="py-2">Últimas Novedades</h1>
		<b-row cols="2" cols-md="4">
			<b-col v-for="office in offices" :key="office._id">
				<OfficeCardSmall :officeModel="office" />
			</b-col>
		</b-row>

		<div class="dropdown-divider my-3 my-md-5 border"></div>

		<b-row cols="1" cols-md="2" class="text-center my-3">
			<b-col>
				<h1>Título</h1>
				<p>Información</p>
			</b-col>
			<b-col>
				<h1>Título</h1>
				<p>Información</p>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import OfficeCardSmall from "../components/OfficeCardSmall";
import axios from "axios";
export default {
	components: {
		OfficeCardSmall
	},
	data: () => ({
		offices: [],
		loaded: false,
		jumbotronInfo: [
			{
				image: "/resources/carousel-1.jpg",
				title: "Título 1",
				subtitle: "Subtítulo 1",
				text: "Texto 1"
			},
			{
				image: "../resources/carousel-2.jpg",
				title: "Título 1",
				subtitle: "Subtítulo 1",
				text: "Texto 2"
			},
			{
				image: "../resources/carousel-3.jpg",
				title: "Título 1",
				subtitle: "Subtítulo 1",
				text: "Texto 3"
			}
		]
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

