<template>
	<div class="container">
		<tb-header fixed logo user></tb-header>
		<section class="trending-icons-list">
			<section>
				<div>
					<svg class="music">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#music"></use>
					</svg>
				</div>
				<span>Music</span>
			</section>
			<section>
				<div>
					<svg class="live">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#live"></use>
					</svg>
				</div>
				<span>Live</span>
			</section>
			<section>
				<div>
					<svg class="gaming">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gaming"></use>
					</svg>
				</div>
				<span>Gaming</span>
			</section>
			<section>
				<div>
					<svg class="news">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#news"></use>
					</svg>
				</div>
				<span>News</span>
			</section>
			<section>
				<div>
					<svg class="astros">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#astros"></use>
					</svg>
				</div>
				<span>Astros</span>
			</section>
		</section>
		<section class="trending-main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-if="list.length">
			<ul class="video-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li v-for="(item,index) in list" :key="index">
					<div class="img-box"><img :src="item.img"/></div>
					<!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509360018050&di=721a031a1a19a9ce603b9adaae327dac&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F2934349b033b5bb5d1d220343fd3d539b700bcf6.jpg" />-->
					<section class="video-info-box">
						<svg class="user">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
						</svg>
						<section class="info">
							<!--{{item.productprice}}-->
							<div class="title">{{subTitle(item.title)}}</div>
							<div class="desc">
								<span class="user-name">Guardian Wires</span>
								<span> . </span>
								<span class="count">365K views</span>
							</div>
						</section>
						<svg class="more">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
						</svg>
					</section>
					
				</li>
			</ul>
			<p v-show="loading" class="video-loading">
				<mt-spinner type="triple-bounce" color="#3a71ea" class="load-img"></mt-spinner>
			</p>
		</section>
		<img class="trending-video-none" ref="wrapper" src="../../assets/videolist.svg" v-else/>
		<tb-tabbar fixed></tb-tabbar>
    </div>
</template>

<script type="text/babel">
	import tbHeader from '../../components/header';
	import tbTabbar from '../../components/tabbar';
	export default{
		data(){
			return {
				wrapperHeight:0,
				list: [],
				loading:false,
				page: 1,
				pagesize: 20,
				title: 'ELLEN S SHOW ME MORE SHOW Niall Horan Surprises His Fans Horan Surprises His Fans'
			}
		},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			setTimeout(() => {
				this.getVideos();
			},1000)
		},
		components:{
			tbHeader,
			tbTabbar
		},
		computed:{
			
		},
		methods:{
			subTitle(title){
				if(title.length > 48){
					return title.substring(0,48) + '...';
				}else {
					return title;
				}
			},
			loadMore(){
				if(this.page == 1){
					this.page++;
					return;
				}else{
					this.loading = true;
					setTimeout(()=>{
						this.getVideos();
						this.page++;
					},6000)
					
				}
			},
			getVideos(){
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

<style lang="scss">
	@import "../../assets/mixin";
	.container{
		display:flex;
		flex-direction: column;
		
		.trending-icons-list{
			display: flex;
			align-items: center;
			margin-top:1.9rem;
			height:4.8rem;
			border-bottom:.025rem solid $bc;
			section{
				display:flex;
				align-items:center;
				flex-direction:column;
				align-items:center;
				justify-content:center;
				margin-left:.73rem;
				div{
					@include wh(2.3rem,2.3rem);
					border-radius:50%;
					background-color:#282828;
					display:flex;
					align-items:center;
					justify-content:center;
					svg{
						@include wh(1.4rem,1.4rem);
					}
					svg.music,svg.live,svg.gaming{
						fill:#fff;
					}
				}
				span{
					@include sc(.6rem,$subfontcolor);
					text-align:center;
					transform:scale(.8);
				}
			}
			
		}
		.trending-main{
			margin: 0 0 1.9rem 0;
			overflow: scroll;
			flex: 1;
			.video-list{
				li{
					background-color: #fff;
					display: flex;
					flex-direction: column;
					border-bottom: .025rem solid #ebebeb;
					.img-box{
						display:flex;
						align-items:center;
						justify-content:center;
						margin-top:.6rem;
						img{
							@include wh(14.5rem,8.16rem);
						}
					}
					.video-info-box{
						display: flex;
						align-items: flex-start;
						position: relative;
						margin-bottom: 1rem;
						margin-top: .2rem;
						svg.user{
							@include wh(2rem,2rem);
							margin-left: .6rem;
						}
						.info{
							flex: 1;
							display: flex;
							flex-direction: column;
							margin-left: .3rem;
							.title{
								@include sc(.73rem,$fontcolor);
								margin-right: 1rem;
							}
							.desc{
								@include sc(.5rem,$subfontcolor);
							}
						}
						svg.more{
							position: absolute;
							@include wh(.9rem,.9rem);
							fill: $subfontcolor;
							right: .3rem;
							top: .6rem;
						}
					}
				}
			}
			.video-loading{
				position: relative;
				height: 2.2rem;
				.load-img{
					@include center;
				}
			}
			
		}
		.trending-video-none{
			margin: 0 0 1.9rem 0;
			overflow: scroll;
		}
		
	}
	
	
</style>