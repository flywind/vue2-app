<template>
	<div class="container">
		<tb-header fixed logo user></tb-header>
		
		<mt-navbar class="activity-navbar" v-model="selected" fixed>
			<mt-tab-item id="1">SHARED</mt-tab-item>
			<mt-tab-item id="2">NOTIFICATIONS</mt-tab-item>
		</mt-navbar>
		
		<mt-tab-container class="activity-tab-container" v-model="selected">
			
			<mt-tab-container-item id="1">
				
				<section class="activity-shared">
					<router-link to="/activity/mycontacts" tag="div" class="view-contacts-link"><span>VIEW CONTACTS</span></router-link>
					<div class="view-contacts-list" style="display:none">
						<p>Your contacts</p>
					</div>
					<div class="contacts-no">
						<img src="../../assets/people.svg"/>
						<h2>Get started by sharing a video</h2>
						<h3>Your shared videos will show up here</h3>
						<mt-button type="primary" @click.active="$router.push({path:'/activity/mycontacts'})">ADD CONTACTS</mt-button>
					</div>
				</section>			
			</mt-tab-container-item>
			
			<mt-tab-container-item id="2">
				<section class="notification-main-container" v-if="userinfo">
					<section class="notification-main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-if="list.length">
						<ul class="video-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
							<li v-for="(item,index) in list" :key="index">
								<div class="point-box">
									<svg class="active">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
									</svg>
								</div>
								<svg class="user">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
								</svg>
								<section class="video-info-box">
									<section class="info">
										<div class="title">{{subTitle(item.title)}} TVBS NEWS</div>
										<div class="desc">
											<span class="count">3 hour ago</span>
										</div>
									</section>
									<img :src="item.img"/>
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
					<img class="video-none" ref="wrapper" src="../../assets/videolist.svg" v-else/>
				</section>
				<section class="no-login" v-else>
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#activity"></use>
					</svg>
					<h3>Your notifications live here</h3>
					<p>Subcribe to your favorite channels to get notified about their latest videos</p>
				</section>
			</mt-tab-container-item>
			
		</mt-tab-container>
		
		
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
				selected: '1',
				show:false,
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
	@keyframes an{
		0% {transform: scale(0);}
		50%{transform: scale(1.5);}
		100%{transform: scale(1);}
	}
	.fade-enter-active, .fade-leave-active {
	  animation: an .5s ease-in-out
	}
	.container{
		display:flex;
		flex-direction: column;
		
		.logo-box{
			@include wh(5rem,1.9rem);
			display:flex;
			justify-content:space-between;
			align-items: center;
			.logo{
				@include wh(4.2rem,1.074rem);
				margin-left:.48rem;
			}
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
		.activity-navbar{
			margin-top: 1.89rem;
    		z-index: 2;
    		border-bottom: .025rem solid #ebebeb;
			box-shadow: 0 .2rem .4rem #ebebeb;
			.mint-tab-item-label{
				font-weight: bold;
				@include sc(.55rem,$subfontcolor);
			}
			.mint-tab-item.is-selected{
				color: #212121;
				border-bottom: .085rem solid #212121;
				.mint-tab-item-label{
					color: #212121;
				}
			}
		}
		.activity-tab-container{
			margin-top: 4rem;
			.activity-shared{
				display: flex;
				flex-direction:column;
				.view-contacts-link{
					display: flex;
					height: 2rem;
					border-bottom: 0.025rem solid $bc;
					align-items: center;
					justify-content: flex-end;
					span{
						@include sc(.57rem,$blue);
						margin-right: .6rem;
						font-weight: bold;
					}
				}
				.view-contacts-list{
					
				}
				.contacts-no{
					display: flex;
					flex-direction: column;
					align-items: center;
					img{
						@include wh(13rem,13rem)
					}
					h2{
						@include sc(.7rem,$fontcolor);
						font-weight: bold;
					}
					h3{
						@include sc(.5rem,$subfontcolor);
						margin-top: .5rem;
					}
					button{
						font-size: .6rem;
						margin-top: .8rem;
						background-color: $blue;
					}
				}
			}
		}
		.notification-main-container{
			display: flex;
			flex: 1;
		}
		.notification-main{
			margin: .5rem 0 1.9rem 0;
			overflow: scroll;
			.video-list{
				li{
					background-color: #fff;
					display: flex;
					.point-box{
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: .8rem;
						@include wh(.5rem,.5rem);
						svg.active{
							fill: $blue;
						}
						svg{
							@include wh(.5rem,.5rem);
							transform: scale(.5);
							fill: $subfontcolor;
						}
					}
					svg.user{
						margin-top: .2rem;
						@include wh(2rem,2rem);
					}
					.video-info-box{
						flex: 1;
						display: flex;
						align-items: flex-start;
						position: relative;
						margin-bottom: .6rem;
						margin-top: .2rem;
						img{
							@include wh(3rem,1.69rem);
							margin-right: 1.5rem;
						}
						
						.info{
							flex: 1;
							display: flex;
							flex-direction: column;
							margin-left: .3rem;
							.title{
								@include sc(.55rem,$fontcolor);
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
							top: .3rem;
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
		
	}
	
	
</style>