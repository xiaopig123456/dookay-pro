<template>
    <div>
        <h1>Index</h1>
        <hello-world msg="Hello World !" />
        <el-button type="primary">Start</el-button>
    </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld';

  export default {
    name: "Index",
    components: {
      HelloWorld
    }
  }
</script>

<style scoped>

</style>