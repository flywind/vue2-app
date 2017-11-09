<template>
	<div class="container">
		<tb-header fixed logo user></tb-header>
		<section class="subscriptions-main-container" v-if="userinfo">
			<section class="subscriptions-user-list">
				<div>
					<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1065809084,3734501613&fm=27&gp=0.jpg" />
					<span></span>
				</div>
				<div>
					<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2770957041,3222987564&fm=27&gp=0.jpg" />
					<span></span>
				</div>
				<div>
					<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3119648850,2558898212&fm=27&gp=0.jpg" />
					<span></span>
				</div>
				<div>
					<img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2771784367,1529189070&fm=27&gp=0.jpg" />
					<span></span>
				</div>
				<span>ALL</span>
			</section>
			<section class="subscriptions-main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-if="list.length">
				<ul class="video-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
					<li v-for="(item,index) in list" :key="index">
						<div class="img-box"><img :src="item.img"/></div>
						<section class="video-info-box">
							<svg class="user">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
							</svg>
							<section class="info">
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
			<img class="subscriptions-video-none" ref="wrapper" src="../../assets/videolist.svg" v-else/>
		</section>
		<section class="no-login" v-else>
			<svg>
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#subscription"></use>
			</svg>
			<h3>Don't miss new videos</h3>
			<p>Sign in to see updates from your faveorite YouTube channels</p>
			<mt-button size="small" type="primary" class="signin-btn">SING IN</mt-button>
		</section>
		
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
				userinfo: true,
			}
		},
		mounted(){
			if(typeof(this.$refs.wrapper) != 'undefined'){
				this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			}
			
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
		.subscriptions-main-container{
			flex:1;
			display:flex;
			flex-direction:column;
		}
		
		
		.no-login{
			flex: 1;
			margin-top: 1.9rem;
			display: flex;
			flex-direction:column;
			align-items: center;
			justify-content: space-around;
			svg{
				margin-top: 7rem;
				@include wh(4.5rem,4.5rem);
				fill:#e0e0e0;
			}
			h3{
				margin-top: 2rem;
				@include sc(.8rem, #202121);
				font-weight: bold;
			}
			p{
				margin-top: 1rem;
				@include sc(.55rem,#747575);
				text-align: center;
				width: 80%;
			}
			.signin-btn{
				margin-top: 1rem;
				background-color: #4285f4;
			}
		}
		.subscriptions-user-list{
			margin-top: 1.9rem;
			display:flex;
			height: 3rem;
			border-bottom: .025rem solid $bc;
			align-items: center;
			position: relative;
			div{
				@include wh(2.5rem,2.5rem);
				align-items: center;
				justify-content: center;
				display: flex;
				position: relative;
				img{
					@include wh(1.8rem,1.8rem);
					border-radius:50%;
				}
				span{
					position: absolute;
					@include wh(1rem,1rem);
					background-color: #5383ec;
					right: .1rem;
					bottom: .1rem;
					border:0.2rem solid #fff;
					border-radius:50%;
					transform: scale(.6);
				}
			}
			div:first-child{
				margin-left: .5rem;
			}
			span{
				position: absolute;
				right: .8rem;
				@include sc(.7rem,#5384ec);
				font-weight: bold;
			}
		}
		.subscriptions-video-none{
			margin: 0 0 1.9rem 0;
			overflow: scroll;
		}
		.subscriptions-main{
			margin: 0 0 1.9rem 0;
			overflow: scroll;
			flex:1;
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
			.subscriptions-video-loading{
				position: relative;
				height: 2.2rem;
				.load-img{
					@include center;
				}
			}
			
		}
		
	}
	
	
</style>