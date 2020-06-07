<template>
	<b-card class="border-0 shadow overflow-hidden office-card" no-body>
		<div class="text-white bg-primary rounded-top p-2">
			<span class="material-icons-round align-bottom text-white mr-1">location_on</span>
			{{ officeModel.location.state.name +", "+officeModel.location.name}}
		</div>
		<b-carousel controls>
			<b-carousel-slide v-for="image in officeModel.images" :key="image">
				<template v-slot:img>
					<b-aspect
						aspect="16:9"
						class="bg-secondary img-cover"
						v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
					></b-aspect>
				</template>
			</b-carousel-slide>
		</b-carousel>
		<b-card-title class="py-2 px-3 pb-0 m-0 truncate h4">{{officeModel.name}}</b-card-title>
		<div class="px-3 pb-2 text-primary text-right">
			Desde
			<span class="h5 font-weight-bold">${{ Number(officeModel.rentAmount).toLocaleString('en') }}</span>
		</div>
		<b-row no-gutters class="text-center p-2 text-black-50 border-top" style="font-size:0.8rem">
			<b-col>
				<div class="vertical-middle">
					<span
						class="material-icons-round align-bottom mr-1 d-block"
						style="font-size:1.2rem"
					>aspect_ratio</span>
					{{ officeModel.area }}m<sup>2</sup>
				</div>
			</b-col>
			<b-col>
				<div class="vertical-middle">
					<span
						class="material-icons-round align-bottom mr-1 d-block"
						style="font-size:1.2rem"
					>people_alt</span>
					{{ officeModel.capacity }} personas
				</div>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
export default {
props: {
  officeModel: Object
}
};
</script>

<style>
.office-card {
	transition: 0.3s;
}
.office-card:hover {
	cursor: pointer;
	transform: translate(0, -5px);
}
</style>