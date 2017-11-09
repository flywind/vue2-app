<template>
	<div class="container">
		<tb-header fixed logo user></tb-header>
		<section class="main-container" v-if="userinfo">
			<section class="main">
				<section class="library-actions">
					<router-link to="/library/history" tag="section" class="action">
						<svg>
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#history"></use>
						</svg>
						<div class="text">History</div>
					</router-link>
					<router-link to="/library/myvideos" tag="section" class="action">
						<svg>
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#videos"></use>
						</svg>
						<div class="text">My videos</div>
					</router-link>
					<router-link to="/library/watchlater" tag="section" class="action">
						<svg>
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#later"></use>
						</svg>
						<div class="text">Watch later</div>
					</router-link>
				</section>
				<section class="library-playlists">
					<h3>
						<span>Playlists(A-Z)</span>
						<svg>
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#downarrow"></use>
						</svg>
					</h3>
					<section class="content">
						<section class="item">
							<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3261206205,3223802339&fm=200&gp=0.jpg" />
							<div class="right">
								<div>Cartoon</div>
								<span>9 videos</span>
							</div>
						</section>
						<section class="item">
							<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2977438224,308154113&fm=200&gp=0.jpg" />
							<div class="right">
								<div>English</div>
								<span>3 videos</span>
							</div>
						</section>
						<section class="item">
							<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3582876027,2227690373&fm=200&gp=0.jpg" />
							<div class="right">
								<div>Favorites</div>
								<span>81 videos</span>
							</div>
						</section>
						<section class="item">
							<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1358625351,2526800625&fm=200&gp=0.jpg" />
							<div class="right">
								<div>Liked videos</div>
								<span>52 videos</span>
							</div>
						</section>
					</section>
				</section>
			</section>
			
		</section>
		<section class="no-login" v-else>
			<svg>
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#library"></use>
			</svg>
			<h3>Enjoy your favorite videos</h3>
			<p>Sign in to access videos that you have liked or saved</p>
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
		.main{
			margin: 1.9rem 0;
			.library-actions{
				display: flex;
				flex-direction: column;
				border-bottom: .025rem solid $bc;
				.action{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 2.3rem;
					svg{
						@include wh(1rem,1rem);
						fill:#757575;
						margin-left: .9rem;
					}
					.text{
						@include sc(.6rem,$fontcolor);
						margin-left: .9rem;
					}
				}
				section:last-child{
					margin-bottom: .5rem;
				}
			}
			.library-playlists{
				display: flex;
				flex-direction: column;
				h3{
					display: flex;
					align-items: center;
					justify-content: flex-start;
					height: 2rem;
					span{
						@include sc(.6rem,$subfontcolor);
						white-space: nowrap;
						margin-left: .5rem;
						font-weight: bold;
					}
					svg{
						@include wh(.6rem,.6rem);
						fill:$subfontcolor;
						margin-left: .2rem;
					}
				}
				.content{
					display: flex;
					flex-direction: column;
					.item{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						height: 2.7rem;
						img{
							@include wh(2rem,2rem);
							margin-left: .5rem;
							border-radius: .15rem;
						}
						.right{
							flex: 1;
							margin-left: .5rem;
							display: flex;
							flex-direction: column;
							div{
								@include sc(.6rem,$fontcolor);
							}
							span{
								@include sc(.5rem,$subfontcolor);
							}
						}
					}
				}
			}
			
		}
		
	}
	
	
</style>