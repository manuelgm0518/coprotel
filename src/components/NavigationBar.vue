<template>
	<div>

		<b-container fluid class="bg-white fixed-top px-lg-5 shadow-sm">
			<b-row style="height:4rem">
				<b-col class="d-none d-lg-block">
					<a class="text-primary logo">Coprotel</a>
				</b-col>
				<b-col cols="12" lg="6" class="px-lg-5">
					<div class="position-relative" style="padding-top:0.75rem">
						<button class="border-0 rounded search-btn" @focus="showFilter=true" @blur="showFilter=false">
							<div style="height:2.5rem; line-height:2.5rem" class="text-black-50">Encuentra tu oficina ideal..</div>
							<div v-if="showFilter">
								<div class="dropdown-divider"></div>
								<div class="p-3">
									aquí van filtros
									<div class="text-right">
										<b-button variant="primary">Buscar</b-button>
									</div>
								</div>
							</div>
						</button>
						<span
							class="material-icons-round text-black-50 position-absolute"
							style="right:0.75rem; top:1.25rem;"
						>search</span>
					</div>
				</b-col>
				<b-col class="text-right d-none d-lg-block">
					<b-link class="material-icons-round nav-icon active">home</b-link>
					<b-link class="material-icons-round nav-icon">search</b-link>
					<b-link class="material-icons-round nav-icon">star</b-link>
					<b-link class="material-icons-round nav-icon">apartment</b-link>
					<b-link class="material-icons-round nav-icon">person</b-link>
				</b-col>
			</b-row>
		</b-container>

    <b-container fluid class="bg-white shadow pb-2 d-block d-lg-none" style="position:absolute; bottom:0; left:0">
      <b-row>
        <b-col class="text-center">
          <b-link class="material-icons-round nav-icon active pb-2">home</b-link><br>
          <span class="text-primary">Inicio</span>
        </b-col>
        <b-col class="text-center">
          <b-link class="material-icons-round nav-icon pb-2">search</b-link><br>
          <span class="text-black-50">Búsqueda</span>
        </b-col>
        <b-col class="text-center">
          <b-link class="material-icons-round nav-icon pb-2">star</b-link><br>
          <span class="text-black-50">Favoritos</span>
        </b-col>
        <b-col class="text-center">
          <b-link class="material-icons-round nav-icon pb-2">apartment</b-link><br>
          <span class="text-black-50">Oficinas</span>
        </b-col>
        <b-col class="text-center">
          <b-link class="material-icons-round nav-icon pb-2">person</b-link><br>
          <span class="text-black-50">Perfil</span>
        </b-col>
      </b-row>

    </b-container>


	</div>
</template>

<script>
export default {
	data: () => ({
		showFilter: false
	})
};
</script>

<style>
.search-btn {
	width: 100%;
	height: auto;
	min-height: 2.5rem;
	text-align: left;
	background-color: #f8f9fa;
	transition: min-height 0.9s ease-in-out;
}
.search-btn:focus {
	outline: none;
	position: absolute;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.search-btn:hover {
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.logo {
	font-weight: bold;
	font-size: 2.5rem;
	vertical-align: text-bottom;
}

.nav-icon {
	font-size: 2rem;
	position: relative;
	top: 50%;
	color: lightgray !important;
	transform: translateY(-50%);
  margin: 0 0.25rem;
  text-decoration: none !important;
}

.nav-icon.active {
	color: #5982ef !important;
}

.expand {
	height: 50vh;
}
</style>