<template>
	<div>
		<b-container fluid class="bg-white fixed-top px-lg-5 shadow-sm">
			<b-row style="height:4rem">
				<b-col class="d-none d-lg-block">
					<b-link class="text-primary logo" to="/">Coprotel</b-link>
				</b-col>
				<b-col cols="12" md="8" lg="6" class="px-lg-5">
					<SearchBar />
				</b-col>
				<b-col class="text-right d-none d-md-block text-lg-right text-center">
					<b-link
						v-for="nav in navigation"
						:key="nav.name"
						v-b-tooltip.hover
						:title="nav.name"
						:to="{name: nav.to}"
						exact-active-class="active"
						class="material-icons-round nav-icon vertical-middle mx-1">
          {{ nav.icon }}</b-link>
				</b-col>
			</b-row>
		</b-container>

		<b-container
			fluid
			class="bg-white shadow d-block d-md-none py-3 position-absolute"
			style="bottom:0; left:0">
			<b-row>
				<b-col v-for="nav in navigation" :key="nav.name" class="text-center">
					<b-link
						class="material-icons-round nav-icon d-block"
						:to="{name:nav.to}"
						exact-active-class="active"
					>{{nav.icon}}</b-link>
					<span class="text-primary d-none d-sm-block">{{nav.name}}</span>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import SearchBar from "./SearchBar";
export default {
	components: {
		SearchBar
	},
	data: () => ({
		navigation: [
			{ to: "Home", name: "Inicio", icon: "home" },
			{ to: "Search", name: "Buscar", icon: "search" },
			{ to: "Favorites", name: "Favoritos", icon: "star" },
			{ to: "Rents", name: "Mis Rentas", icon: "apartment" },
			{ to: "Profile", name: "Perfil", icon: "person" }
		]
	})
};
</script>

<style>
.logo {
	font-weight: bold;
	font-size: 2.5rem;
	vertical-align: text-bottom;
	text-decoration: none !important;
}
.nav-icon {
	font-size: 2rem;
}
.nav-icon,
.nav-icon + span {
	color: lightgray !important;
	text-decoration: none !important;
}
.nav-icon.active,
.nav-icon.active + span {
	color: #5982ef !important;
}
</style>