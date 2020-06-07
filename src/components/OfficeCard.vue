<template>
	<b-card no-body class="overflow-hidden border-0 shadow my-3 p-0 office-card" @click.stop="gotoOffice">
		<b-row no-gutters>
			<b-col md="5">
				<b-carousel controls>
					<b-carousel-slide v-for="image in officeModel.images" :key="image">
						<template v-slot:img>
							<b-aspect
								aspect="16:9"
								class="bg-secondary img-cover"
								v-bind:style="{ backgroundImage: 'url(' + $store.state.serverPath + '/file/'+ image + ')' }"
							></b-aspect>
						</template>
					</b-carousel-slide>
				</b-carousel>
				<div
					class="text-white bg-primary rounded position-absolute p-1 px-2 truncate w-75"
					style="left:0.5rem; top:0.5rem; opacity:0.85"
				>
					<span class="material-icons-round align-bottom text-white mr-1">location_on</span>
					{{ officeModel.location.state.name +", "+officeModel.location.name}}
				</div>
			</b-col>
			<b-col md="7">
				<b-button
					:variant="favorite ? 'primary' : 'outline-secondary'"
					class="position-absolute p-2 p-md-1"
					@click.stop="updateFav"
					style="top:1rem; right:1rem;"
				>
					<span class="material-icons-round align-bottom">star</span>
				</b-button>
				<b-card-body class="py-0 my-0">
					<b-card-title class="pb-1 pt-3 pr-2 m-0 mr-5 truncate">{{officeModel.name}}</b-card-title>
					<b-card-sub-title class="pb-2 m-0">{{formattedDate}}</b-card-sub-title>
					<b-card-text class="truncate-paragraph m-0 p-0 h-100" v-html="officeModel.description"></b-card-text>
				</b-card-body>
			</b-col>
			<b-col md="5" class="bg-white text-primary text-center border-top mt-3 mt-md-0">
				<div class="vertical-middle p-3 p-md-0">
					Desde
					<span
						class="h3 font-weight-bold"
					>${{ Number(officeModel.rentAmount).toLocaleString('en') }}</span>
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
	</b-card>
</template>

<script>
import axios from "axios";
export default {
	props: {
		officeModel: Object
	},
	data: () => ({
		favorite: false
	}),
	mounted() {
		if (this.$store.state.user != null) {
			for (let fav of this.$store.state.user.favorites) {
				if (this.officeModel._id == fav) this.favorite = true;
			}
		}
	},
	computed: {
		formattedDate() {
			var utc = new Date(this.officeModel.date).toUTCString();
			var myDate = new Date(utc);
			return `${("0" + myDate.getDate()).slice(-2)} / ${(
				"0" + myDate.getMonth()
			).slice(-2)} / ${myDate.getFullYear()}`;
		}
	},
	methods: {
		gotoOffice: function() {
			this.$router.push({
				name: "Office",
				params: { officeId: this.officeModel._id }
			});
		},
		updateFav: function() {
			if (this.$store.state.user == null) {
				alert("Debe iniciar sesión para poder añadir a favoritos"); //Falta ponerlo más bonito
			} else if (this.favorite) {
				axios
					.post(this.$store.state.serverPath + "/api/user/favorite/quit", {
						user: this.$store.state.user._id,
						office: this.officeModel._id
					})
					.then(res => {
						if (res.status == 200) {
              this.favorite = false;
              this.upadateUser();
						}
					})
					.catch(err => {
						console.log(err);
					});
			}else{
        axios
					.post(this.$store.state.serverPath + "/api/user/favorite/add", {
						user: this.$store.state.user._id,
						office: this.officeModel._id
					})
					.then(res => {
						if (res.status == 200) {
              this.favorite = true;
              this.upadateUser();
						}
					})
					.catch(err => {
						console.log(err);
					});
      }
    },
    upadateUser(){
            if(localStorage.getItem('token')){
            axios.get(this.$store.state.serverPath + '/api/user/logIn/verify/' + localStorage.getItem('token')).then(res => {
                if(res.data.unauthorized){
                    localStorage.clear();
                    this.$store.state.user = null;
                } else {
                    this.$store.state.user = res.data;
                }
            }).catch(err => {
                console.log(err);
            });
            } else {
                this.$store.state.user = null;
                localStorage.clear();
            }
            this.user = this.$store.state.user;
        },
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