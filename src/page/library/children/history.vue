<template>
	<div class="container">
		<tb-header fixed goback title="History">
			<svg class="more" slot="right" @click="popupVisible = true">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
			</svg>
		</tb-header>
		<mt-popup v-model="popupVisible" position="bottom" class="history-actionsheet">
			<div>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use>
				</svg>
				<div class="text">Clear watch history</div>
			</div>
			<div>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pause"></use>
				</svg>
				<div class="text">Pause watch history</div>
			</div>
			<div class="close" @click="popupVisible = false">
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
				</svg>
				<div class="text">Cancel</div>
			</div>
		</mt-popup>
		<div class="item-search">
			<svg>
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
			</svg>
			<input type="text" v-model="keyword" placeholder="Search watch history" @focusin="searchInputin" @focusout="searchInputout"/>
			<transition name="historyin" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
				<a class="cancel-btn" v-if="searchcancel" @click="clearKeyword">CANCEL</a>
			</transition>
		</div>
		<section class="history-main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-if="list.length">
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
				actions:[],
				keyword: '',
				searchcancel: false,
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
			searchInputin(){
				this.searchcancel = true;
			},
			searchInputout(){
				if(!this.keyword){
					this.searchcancel = false;
				}
			},
			clearKeyword(){
				this.keyword = '';
				this.searchcancel = false;
			},
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
	
		.history-main{
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
						flex:1;
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
		
		.history-actionsheet{
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
		.item-search{
			display: flex;
			align-items: center;
			margin-top: 1.9rem;
			justify-content: space-between;
			height: 1.9rem;
			svg{
				@include wh(.7rem,.7rem);
				fill:#b2b2b2;
				margin-left: .6rem;
			}
			input{
				flex: 1;
				margin-left: .6rem;
				height: 1.5rem
			}
			a{
				@include wh(3.5rem,1.9rem);
				background-color: #e6e6e6;
				@include sc(.5rem, #6a6a6a);
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
			}
		}
		
		
	}
	
	
</style>