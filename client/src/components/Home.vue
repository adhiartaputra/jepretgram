<template>
<div>
  <navbar></navbar>
    <div class="container">
      <div class="card-deck">
      <div class="card" v-for='(data, index) in file' :key=index>
        <img class="card-img-top" :src="data.url" alt="Card image cap">
        <div class="card-body">
          <i class="far fa-heart"></i>
          <i class="fas fa-heart"></i>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{data.title}}</h5>
          <p class="card-text">{{data.description}}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>  
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'Home',
  data () {
    return {
      file: null
    }
  },
  components: {
    Navbar
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.state.file = this.file
      return this.$store.state.file
    }
  }
}
</script>

<style>
.container
{
  margin-top: 60px;
}
</style>
