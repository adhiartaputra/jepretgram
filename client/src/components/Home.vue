<template>
<div>
  <navbar></navbar>
    <div class="container">
      <div class="card-deck">
      <div class="card">
        <img class="card-img-top" src="http://5.media.bustedtees.cvcdn.com/4/-/bustedtees.041d1a44-7c80-4115-a4c3-b41cdf28.gif" alt="Card image cap">
        <div class="card-body">
          <i class="far fa-heart"></i>
          <i class="fas fa-heart"></i>
        </div>
        <div class="card-body">
          <h5 class="card-title">Image Title</h5>
          <p class="card-text">Image Description</p>
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
  components: {
    Navbar
  }
}
</script>

<style>
.container
{
  margin-top: 60px;
}
</style>
