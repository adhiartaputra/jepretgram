<template>
  <div>
    <form>
        <input type="file" accept="image/*;capture=camera" class="form-control-file" id="image" aria-describedby="fileHelp" @change="onFileChange">
    </form>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Upload',
  data () {
    return ''
  },
  methods: {
    onFileChange: function (e) {
      const files = e.target.files || e.dataTransfer.files
      this.fileUpload = files
      if (files.length > 0) {
        return this.createImage(files[0])
      }
    },
    createImage: function (file) {
      // const image = new Image()
      const reader = new FileReader()
      const self = this

      reader.onload = (e) => {
        self.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    },
    uploadImage: function () {
      // console.log(this.fileUpload[0]);
      let data = new FormData()
      Axios.post('http://localhost:3000/file/create', data)
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style>

</style>
