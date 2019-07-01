<template>
    <div>
        <h1>Index</h1>
        <hello-world msg="Hello World !" />
        <el-button type="primary">Start</el-button>
    </div>
</template>

<script>
  export default {
    name: "Index",
    mounted() {
        this.$request.demo().then(res=>{
          // doing something
        })
    }
  }
</script>

<style scoped>

</style>