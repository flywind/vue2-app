<template>
	<div class="container">
		<tb-header fixed goback title="Watch later">
			<svg class="more" slot="right" @click="popupVisible = true">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
			</svg>
		</tb-header>
		<mt-popup v-model="popupVisible" position="bottom" class="watch-later-actionsheet">
			<div>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tv"></use>
				</svg>
				<div class="text">Watch on TV</div>
			</div>
			<div>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#help"></use>
				</svg>
				<div class="text">Help & feedback</div>
			</div>
			<div class="close" @click="popupVisible = false">
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
				</svg>
				<div class="text">Cancel</div>
			</div>
		</mt-popup>
		<div class="watch-later-userinfo">
			<div class="title">
				<span>Watch later</span>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use>
				</svg>
			</div>
			<div class="name">Wind Fly</div>
			<div class="action">
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#playlist"></use>
				</svg>
			</div>
			<svg class="play-tube">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#playtube"></use>
			</svg>
		</div>
		<div class="watch-later-sort">
			<span class="title">3 videos</span>
			<svg class="point">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
			</svg>
			<svg class="play-tube">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sortdesc"></use>
			</svg>
			<span class="sort">Sort</span>
		</div>
		<section class="watch-later-main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-if="list.length">
			<ul class="video-middle-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li v-for="(item,index) in list" :key="index">
					<img :src="item.img"/>
					<!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509360018050&di=721a031a1a19a9ce603b9adaae327dac&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F2934349b033b5bb5d1d220343fd3d539b700bcf6.jpg" />-->
					<section class="video-info-box">
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
		<img class="video-none" ref="wrapper" src="../../../assets/videolist.svg" v-else/>
		<tb-tabbar fixed></tb-tabbar>
    </div>
</template>

<script type="text/babel">
	import tbHeader from '../../../components/header';
	import tbTabbar from '../../../components/tabbar';
	export default{
		data(){
			return {
				popupVisible:false,
				wrapperHeight:0,
				list: [],
				loading:false,
				page: 1,
				pagesize: 20,
				actions:[]
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
			tbTabbar,
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
	@import "../../../assets/mixin";
	.container{
		display:flex;
		flex-direction: column;
		
		.watch-later-sort{
			display: flex;
			justify-content: flex-start;
			align-items:center;
			height:1.3rem;
			span{
				@include sc(.55rem,$subfontcolor);
			}
			span.title{
				margin-left: .6rem;
			}
			span.sort{
				margin-left: .1rem;
			}
			svg{
				@include wh(.8rem,.8rem);
				fill:$c6;
			}
			svg.point{
				transform: scale(.2);
				fill: $subfontcolor;
			}
		}
		.watch-later-main{
			margin: 0 0 1.9rem;
			overflow: scroll;
			.video-middle-list{
				li{
					background-color: #fff;
					display: flex;
					img{
						@include wh(6.5rem,3.672rem);
						padding: .7rem .7rem 0 .7rem;
					}
					.video-info-box{
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						height:3.672rem;
						margin-top:.7rem;
						flex: 1;
						.info{
							flex: 1;
							.title{
								@include sc(.63rem,#212121);
								line-height: .85rem;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.desc{
								@include sc(.5rem,#757575);
							}
						}
						.more{
							@include wh(1rem,1rem);
							fill:#666;
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
		.video-none{
			margin: 0 0 1.9rem;
			overflow: scroll;
		}
		
		.watch-later-actionsheet{
			width: 100%;
			display: flex;
			flex-direction: column;
			div{
				display: flex;
				justify-content: flex-start;
				height: 2.2rem;
				align-items: center;
				svg{
					@include wh(.9rem,.9rem);
					fill: $c6;
					margin-left: .5rem;
				}
				.text{
					margin-left: 1rem;
					flex: 1;
					@include sc(.6rem,$fontcolor);
				}
			}
			div.close{
				height: 2.5rem;
				border-top: .025rem solid $bc;
			}
		}
		.watch-later-userinfo{
			display: flex;
			flex-direction: column;
			margin-top: 1.9rem;
			background-color: #f5f5f5;
			border-bottom: .025rem solid $bc;
			height: 6rem;
			position: relative;
			div{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-left: .6rem;
			}
			div.title{
				margin-top: .6rem;
				span{
					white-space: nowrap;
					@include sc(.68rem,$fontcolor);
					
				}
				svg{
					margin-left: .2rem;
					@include wh(.7rem,.7rem);
					fill: $c6;
				}
			}
			div.name{
				margin-top: .2rem;
				@include sc(.6rem,$subfontcolor);
			}
			div.action{
				margin-top: 1.5rem;
				svg{
					@include wh(.8rem, .8rem);
					fill: $c6;
				}
			}
			.play-tube{
				position:absolute;
				@include wh(2.6rem,2.6rem);	
				right: .5rem;
				bottom:-1.3rem;
				z-index: 3;
			}
		}
		
		
	}
	
	
</style>