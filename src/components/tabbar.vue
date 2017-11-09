<template>
	<footer class="tube-tabbar" :class="{'tube-tabbar-fixed': fixed}">
		<router-link class="tube-home" tag="div" to="/home">
			<svg class="logo">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('home') != -1 ? '#homeActive' : '#home'"></use>
			</svg>
			<span :style="{color: $route.path.indexOf('home') != -1? '#ff0000' : ''}">Home</span>
		</router-link>
		<router-link class="tube-trending" tag="div" to="/trending">
			<svg class="trending">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('trending') != -1 ? '#trendingActive': '#trending'"></use>
			</svg>
			<span :style="{color: $route.path.indexOf('trending') != -1? '#ff0000' : ''}">Trending</span>
		</router-link>
		<router-link class="tube-subscriptions" tag="div" to="/subscriptions">
			<svg class="subscriptions">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('subscriptions') != -1 ? '#subscriptionActive': '#subscription'"></use>
			</svg>
			<span :style="{color: $route.path.indexOf('subscriptions') != -1? '#ff0000' : ''}">Subscriptions</span>
		</router-link>
		<router-link class="tube-activity" tag="div" to="/activity">
			<svg class="activity">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('activity') != -1 ? '#activityActive': '#activity'"></use>
			</svg>
			<span :style="{color: $route.path.indexOf('activity') != -1? '#ff0000' : ''}">Activity</span>
		</router-link>
		<router-link class="tube-library" tag="div" to="/library">
			<svg class="library">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('library') != -1 ? '#libraryActive': '#library'"></use>
			</svg>
			<span :style="{color: $route.path.indexOf('library') != -1? '#ff0000' : ''}">Library</span>
		</router-link>
	</footer>

</template>

<script>
	export default{
		name: 'tb-tabbar',
		props: {
			fixed: Boolean
		}
	}
</script>

<style lang="scss">
	@import "../assets/var";
	.tube-tabbar{
		height: 1.9rem;
		background-color: #fff;
		border-top: .025rem solid $border-in-color;
		display: flex;
		align-items: center;
		div{
			width:25%;
			height:1.9rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			svg{
				width:1.2rem;
				height:1.2rem;
				margin-top: .15rem;
				fill:#606060;
			}
			span{
				font-size: .5rem;
				margin-top: 0rem;
				line-height: .5rem;
				color: $color-grey2;
				transform: scale(.8);
			}
			.menu-bg{
				position: absolute;
				background-color: #e91710;
				opacity: .5;
				width: 3rem;
				height: 3rem;
				border-radius: 50%;
				top: -20%;
			}
		}
	}
	.tube-tabbar-fixed{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: $z-index-normal;
	}
</style>