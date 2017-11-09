<template>
	<div>
		<router-view/>
		<tube-icon/>
	</div>
</template>

<script>
	import tubeIcon from './components/tubeicon'
	export default {
	  name: 'app',
	  components:{tubeIcon}
	}
</script>

<style lang="scss">
	@import './assets/common';
	@import './assets/animate';
</style>
