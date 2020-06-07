<template>
	<b-card no-body class="overflow-hidden border-0 shadow my-3 p-0">
		<b-row no-gutters>
			<b-col md="5">
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
			</b-col>

			<b-col md="7">
				<b-button
					:variant="favorite ? 'outline-secondary' : 'primary'"
					class="position-absolute p-2 p-md-1"
					@click="favorite=!favorite"
					style="top:1rem; right:1rem; z-index:100;"
				>
					<span class="material-icons-round align-bottom">star</span>
				</b-button>

				<b-card-body class="py-0 my-0">
					<b-card-title class="pb-1 pt-3 pr-2 m-0 mr-5 truncate">{{name}}</b-card-title>
					<b-card-sub-title class="pb-2 m-0">{{formattedDate}}</b-card-sub-title>
					<b-card-text class="truncate-paragraph m-0 p-0 h-100">{{ description }}</b-card-text>
				</b-card-body>
			</b-col>

			<b-col md="5" class="bg-white text-primary text-center border-top mt-3 mt-md-0">
				<div class="vertical-middle p-3 p-md-0">
					Desde
					<span class="h3 font-weight-bold">${{ Number(rentAmount).toLocaleString('en') }}</span>
				</div>
			</b-col>
			<b-col md="7" class="text-center p-3 py-md-3 text-black-50 font-weight-bold border-top">
				<b-row no-gutters>
					<b-col>
						<div class="vertical-middle">
							<span class="material-icons-round align-bottom mr-1">aspect_ratio</span>
							{{ area }}m<sup>2</sup>
						</div>
					</b-col>
					<b-col>
						<div class="vertical-middle">
							<span class="material-icons-round align-bottom mr-1">people_alt</span>
							{{ capacity }} personas
						</div>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<div
			class="text-white bg-primary rounded position-absolute p-1 px-2"
			style="left:0.5rem; top:0.5rem; opacity:0.85"
		>
			<span class="material-icons-round align-bottom text-white mr-1">location_on</span>
			{{ location }}
		</div>
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
		name: String,
		description: String,
		date: String,
		favorite: Boolean
	},
	computed: {
		formattedDate() {
			var utc = new Date(this.date).toUTCString();
			var myDate = new Date(utc);
			return `${("0" + myDate.getDate()).slice(-2)} / ${(
				"0" + myDate.getMonth()
			).slice(-2)} / ${myDate.getFullYear()}`;
		}
	}
};
</script>

<style>
</style>