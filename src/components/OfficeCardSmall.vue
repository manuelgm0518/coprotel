<template>
	<b-card class="border-0 shadow overflow-hidden" no-body>
		<div class="text-white bg-primary rounded-top p-2">
			<span class="material-icons-round align-bottom text-white mr-1">location_on</span>
			{{ location }}
		</div>
		<b-carousel controls>
			<b-carousel-slide v-for="image in images" :key="image">
				<template v-slot:img>
					<b-aspect
						aspect="16:9"
						class="bg-secondary img-cover"
						v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
					></b-aspect>
				</template>
			</b-carousel-slide>
		</b-carousel>
		<b-card-title class="py-2 px-3 pb-0 m-0 truncate h4">{{name}}</b-card-title>
		<div class="px-3 pb-2 text-primary text-right">
			Desde
			<span class="h5 font-weight-bold">${{ Number(rentAmount).toLocaleString('en') }}</span>
		</div>
		<b-row no-gutters class="text-center p-2 text-black-50 border-top" style="font-size:0.8rem">
			<b-col>
				<div class="vertical-middle">
					<span
						class="material-icons-round align-bottom mr-1 d-block"
						style="font-size:1.2rem"
					>aspect_ratio</span>
					{{ area }}m<sup>2</sup>
				</div>
			</b-col>
			<b-col>
				<div class="vertical-middle">
					<span
						class="material-icons-round align-bottom mr-1 d-block"
						style="font-size:1.2rem"
					>people_alt</span>
					{{ capacity }} personas
				</div>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
export default {
	props: {
		images: Object,
		location: String,
		rentAmount: Number,
		area: Number,
		capacity: Number,
		name: String
	}
};
</script>

<style>
.img-cover {
	background-repeat: no-repeat !important;
	background-size: cover !important;
}
</style>