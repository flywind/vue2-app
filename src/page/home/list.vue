<template>
	<div>
		<section class="video-wrapper" ref="wrapper" :style="{height:wrapperHeight + 'px'}">
			<ul class="video-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li v-for="(item,index) in list" :key="index">
					{{item.productprice}}
				</li>
			</ul>
			<p v-show="loading" class="video-loading">
				<mt-spinner type="fading-circle"></mt-spinner>Loading...
			</p>
		</section>
	</div>
</template>

<script type="text/babel">
	export default{
		data(){
			return {
				wrapperHeight: 0,
				loading: false,
				list: [],
				page: 1,
				pagesize: 20,
			}
		},
		created(){
			
		},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			this.getData();
			
		},
		methods:{
			loadMore(){
				if(this.page == 1){
					this.page++;
				}else{
					this.loading = true;
					setTimeout(() => {
						this.getData();
						this.page++;
					},5000);
					
					
				}
				
			},
			getData(){
				this.$http.jsonp('http://list.ydui.org/getdata.php?type=backposition',{
					params: {
						page: this.page,
						pagesize: this.pagesize,
					}
				}).then(response => {
					const _list = response.body;
					this.list = [...this.list, ..._list];
					if(this.loading == true){
						this.loading = false;
					}
				})
			}
		}
	}
</script>

<style>
	.video-wrapper{
		margin-top: -1px;
		overflow: scroll;
	}
	.video-loading{
		position: fixed;
		bottom: 3rem;
	}
	.video-list{
		list-style: none;
	}
	.video-list li{
		height: 130px;
		line-height: 30px;
	}
</style>