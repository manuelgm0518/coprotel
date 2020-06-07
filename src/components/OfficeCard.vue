<template>
	<b-card no-body class="overflow-hidden border-0 shadow my-3 p-0">
		<b-row no-gutters>
			<b-col md="5">
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
					<b-card-title class="pb-1 pt-3 pr-2 m-0 mr-5 truncate">{{officeModel.name}}</b-card-title>
					<b-card-sub-title class="pb-2 m-0">{{formattedDate}}</b-card-sub-title>
					<b-card-text class="truncate-paragraph m-0 p-0 h-100">{{ officeModel.description }}</b-card-text>
				</b-card-body>
			</b-col>

			<b-col md="5" class="bg-white text-primary text-center border-top mt-3 mt-md-0">
				<div class="vertical-middle p-3 p-md-0">
					Desde
					<span class="h3 font-weight-bold">${{ Number(officeModel.rentAmount).toLocaleString('en') }}</span>
				</div>
			</b-col>
			<b-col md="7" class="text-center p-3 py-md-3 text-black-50 font-weight-bold border-top">
				<b-row no-gutters>
					<b-col>
						<div class="vertical-middle">
							<span class="material-icons-round align-bottom mr-1">aspect_ratio</span>
							{{ officeModel.area }}m<sup>2</sup>
						</div>
					</b-col>
					<b-col>
						<div class="vertical-middle">
							<span class="material-icons-round align-bottom mr-1">people_alt</span>
							{{ officeModel.capacity }} personas
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
			{{ officeModel.location }}
		</div>
	</b-card>
</template>

<script>
//import axios from 'axios';
export default {
  props: {
    officeModel: Object
  },
  data: () =>({
    favorite: false
  }),
  mounted() {
    alert(this.officeModel);
  },
  /*
	data: ()=>({
    officeModel: {
      images: [],
		location: "",
		rentAmount: 0,
		area: 0,
		capacity: 0,
		name: "",
		description: "",
		date: "",
		
    },
    favorite: false
  }),*/
  /*mounted(){
    //this.user = this.$store.state.user;
    axios.get(this.$store.state.serverPath + '/api/office/' + this.officeId).then(res => {
      console.log(res.data);
      
      //this.officeModel = res.data;
      //this.images = res.images;


    }).catch(err => {
      console.log(err);
    });
  },*/
	computed: {
		formattedDate() {
			var utc = new Date(this.officeModel.date).toUTCString();
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