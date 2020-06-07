<template>

<b-container class="bg-light" style="padding-top:6rem; min-height:100vh">
    <b-row no-gutters>

      <b-col cols="12" lg="4" class="pr-lg-3">
        <b-card>
          ola
        </b-card>
      </b-col>

      <b-col cols="12" lg="8">
        <b-row>
          <b-col>
            <OfficeCardSmall/>
          </b-col>
          <b-col>
            <OfficeCardSmall/>
          </b-col>
          <b-col>
            <OfficeCardSmall/>
          </b-col>
          
        </b-row>
        
        <OfficeCard/>
        <OfficeCard/>
        <OfficeCard/>
      </b-col>
    </b-row>
        
      
  </b-container>
</template>

<script>
import OfficeCard from '../components/OfficeCard'
import OfficeCardSmall from'../components/OfficeCardSmall'
export default {
  name: 'Search',
  components: {
    OfficeCardSmall,
    OfficeCard
  }
}
</script>

<style>

</style>