<template>
  <div id="app">
    <router-view/> 
  </div>
</template>

<script>
	export default {
	  name: 'App',
}
</script>

<style>
	html{
		/* font-size: 62.5%; */
	}
#app {
	
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
*{
	padding: 0px;
	margin: 0px;
}
.mainWrap{
	width: calc(90% - 300px);
	float: left;
	margin-left: 5%;
}
 a{
    color: #fff !important;
  }
</style>
