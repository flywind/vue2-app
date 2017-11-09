<template>
	<div class="container">
		<tb-header fixed goback title="Add contacts">
			<svg class="more" slot="right" @click="popupVisible = true">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more"></use>
			</svg>
		</tb-header>
		<mt-popup v-model="popupVisible" position="bottom" class="add-contacts-actionsheet">
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
		<section class="add-contacts-main">
			<div class="row">
				<div class="circle">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#link"></use>
					</svg>
				</div>
				<div class="text">Send invitation link</div>
			</div>
			<div class="row">
				<div class="circle book">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#book"></use>
					</svg>
				</div>
				<div class="text">Find in phone book</div>
			</div>
		</section>
		
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
				
			}
		},
		mounted(){
			
			
		},
		components:{
			tbHeader,
			tbTabbar,
		},
		computed:{
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	@import "../../../assets/mixin";
	.container{
		display:flex;
		flex-direction: column;
		.add-contacts-actionsheet{
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
		.add-contacts-main{
			display: flex;
			flex-direction: column;
			margin-top: 1.9rem;
			.row{
				display: flex;
				align-items: center;
				margin-top: .8rem;
				margin-bottom: .3rem;
				.circle{
					@include wh(2.5rem,2.5rem);
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #ff8d16;
					border-radius: 50%;
					margin-left: .6rem;
					svg{
						@include wh(1.6rem,1.6rem);
					}
				}
				.text{
					flex: 1;
					margin-left: 1.2rem;
					@include sc(.8rem,$fontcolor);
				}
				div.book{
					background-color: #3da6ff;
					svg{
						@include wh(1.2rem,1.2rem);
					}
				}
			}
		}
		
		
	}
	
	
</style>