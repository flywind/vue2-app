<template>
	<div class="container">
		<tb-header fixed goback title="Contacts">
			<svg class="more" slot="right" @click="popupVisible = true">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
			</svg>
		</tb-header>
		<mt-popup v-model="popupVisible" position="bottom" class="my-contacts-actionsheet">
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
		<div class="my-contacts-sort" style="display:none">
			<span>DATE ADDEN(NEWEST)</span>
			<svg>
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#downarrow"></use>
			</svg>
		</div>
		<section class="my-contacts-main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-if="list.length">
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
		<section class="my-contacts-none" ref="wrapper" v-else>
			<img class="no-contact" src="../../../assets/nocontacts.svg" />
			<h1>No contacts</h1>
			<h2>Add contacts to share videos faster</h2>
			<mt-button type="primary" @click.active="$router.push({path:'/activity/addcontacts'})">ADD CONTACTS</mt-button>
		</section>
		<!--<img class="video-none" ref="wrapper" src="../../../assets/videolist.svg" v-else/>-->
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
			/*setTimeout(() => {
				this.getVideos();
			},1000)*/
			
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

		.my-contacts-main{
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
		/*.video-none{
			margin: 0 0 1.9rem;
			overflow: scroll;
		}*/
		.my-contacts-none{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top:1.9rem;
			img {
				@include wh(12rem,12rem);
				margin-top:3rem;
			}
			h1{
				@include sc(.7rem,$fontcolor);
				font-weight: bold;
				margin-top:1rem;
			}
			h2{
				@include sc(.5rem,$subfontcolor);
				margin-top: .5rem;
			}
			button{
				font-size: .6rem;
				margin-top: .8rem;
				background-color: $blue;
			}
		}
		.my-contacts-actionsheet{
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
		.my-contacts-sort{
			display: flex;
			align-items: center;
			margin-top: 1.9rem;
			justify-content: flex-start;
			height: 1.9rem;
			border-bottom: .025rem solid $bc;
			span{
				@include sc(.5rem,$subfontcolor);
				margin-left: .6rem;
				font-weight: bold;
			}
			svg{
				@include wh(.7rem,.7rem);
				fill:$subfontcolor;
				margin-left: .1rem;
			}
			
		}
		
		
	}
	
	
</style>