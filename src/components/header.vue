<template>
	<header class="tube-header" :class="{'tube-fixed': fixed}">
		<div class="tube-header-left">
			<svg class="tube-goback" v-if="goback" @click="$router.go(-1)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#goback"></use>
            </svg>
			<slot name="left"></slot>
			<svg class="logo" v-if="logo">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use>
			</svg>
		</div>
		<div class="tube-deader-title">
			<span v-if="title" :style="{'text-align':titlePosition,display: 'block'}">{{title}}</span>
			<slot v-else name="center"></slot>
		</div>
		<div class="tube-header-right">
			<svg class="camera">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#camera"></use>
			</svg>
			<svg class="search">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
			</svg>
			<slot name="right"></slot>
			<span v-if="user">
				<svg class="user" @click="visiable = !visiable" v-if="userinfo">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
				</svg>
				<svg class="user" @click="visiable = !visiable" v-else>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user2"></use>
				</svg>
			</span>
		</div>
		<mt-popup class="profile-popup" v-model="visiable" position="bottom" :modal="false" v-if="userinfo">
			<header>
				<svg class="close" @click="visiable = false">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
				</svg>
				<h1>Account</h1>
			</header>
			<section class="content">
				<div>
					<svg class="account">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#account"></use>
					</svg>
					<span>My channel</span>
				</div>
				<div class="border">
					<svg class="switchaccount">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#switchaccount"></use>
					</svg>
					<span>Switch account</span>
				</div>
				<div>
					<svg class="settings">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#settings"></use>
					</svg>
					<span>Settings</span>
				</div>
				<div>
					<svg class="lock">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use>
					</svg>
					<span>Terms & privacy policy</span>
				</div>
				<div>
					<svg class="help">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#help"></use>
					</svg>
					<span>Help & feedback</span>
				</div>
			</section>
		</mt-popup>
		<mt-popup class="profile-popup" v-model="visiable" position="bottom" :modal="false" v-else>
			<header>
				<svg class="close" @click="visiable = false">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
				</svg>
				<h1>Account</h1>
			</header>
			<section class="signin">
				<svg class="settings">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#door"></use>
				</svg>
				<p>Sign in now to upload, save, and comment on videos</p>
				<router-link to="/signin">
					<mt-button type="primary">SIGN IN</mt-button>
				</router-link>
			</section>
			<section class="content">
				<div>
					<svg class="settings">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#activity"></use>
					</svg>
					<span>Notifications</span>
				</div>
				<div>
					<svg class="settings">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#settings"></use>
					</svg>
					<span>Settings</span>
				</div>
				<div>
					<svg class="lock">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use>
					</svg>
					<span>Terms & privacy policy</span>
				</div>
				<div>
					<svg class="help">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#help"></use>
					</svg>
					<span>Help & feedback</span>
				</div>
			</section>
		</mt-popup>
	</header>
	
</template>

<script>
export default {
  name: 'tb-header',
  props: {
  	fixed: Boolean,
  	goback: Boolean,
  	logo: Boolean,
  	user: Boolean,
  	title: String,
  	titlePosition: String
  },
  data(){
  	return{
  		visiable: false,
  		userinfo: false,
  	}
  }
}
</script>

<style lang="scss">
	@import "../assets/var";
	.mint-button--primary{
		background-color: #5383ec;
	}
	.tube-header{
		height: $header-height;
		border-bottom: .025rem solid $border-in-color;
		box-shadow: 0 .1rem .3rem $border-in-color;
		white-space: nowrap;
		background: $color-white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tube-header-left{
			display:flex;
			align-items:center;
			justify-content:flex-start;
			.tube-goback{
				width: .9rem;
				height: .9rem;
				fill: #666;
				margin-left: .5rem;
				margin-right: .5rem;
			}
			.logo{
				width: 4.5rem;
				height: 1.074rem;
				margin-left:.48rem;
				fill:#666;
			}
		}
		.tube-deader-title{
			flex:1;
			color: #212121;
			font-size: .8rem;
		}
		.tube-header-right{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			svg{
				width:1.3rem;
				height: 1.3rem;
				fill:#666;
			}
			svg.more{
				margin-right: .2rem;
			}
			svg.refresh{
				margin-right: .4rem;
				width: .85rem;
				height: .85rem;
			}
			svg.search{
				width: .85rem;
				height: .85rem;
				margin-right: 1rem;
			}
			svg.user{
				margin-right: .48rem;
			}
			svg.camera{
				width: .85rem;
				height: .85rem;
				margin-right: 1rem;
			}
			
		}
	}
	.tube-fixed{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 2;
	}
	.profile-popup{
		width: 100%;
		height: 100%;
		background: #fff;
		display: flex;
		flex-direction:column;
		header{
			border-bottom: .025rem solid #ebebeb;
			box-shadow: 0 .1rem .3rem #ebebeb;
			height: 1.9rem;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			svg{
				width: .9rem;
				height: .9rem;
				fill: #666;
				margin-left: .5rem;
				margin-right: .5rem;
			}
			h1{
				flex:1;
				color: #757575;
				font-size: .8rem;
			}
		}
		.content{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding-top: .2rem;
			div{
				display: flex;
				height:2.3rem;
				align-items: center;
				svg{
					width: 1rem;
					height: 1rem;
					fill: #666;
					margin-left: .8rem;
					margin-right: .8rem;
				}
				span{
					font-size: .6rem;
				}
			}
			div.border{
				border-bottom:0.025rem solid $border-in-color;
			}
		}
		.signin{
			display: flex;
			flex-direction: column;
			align-items: center;
			border-bottom:0.025rem solid $border-in-color;
			svg{
				width:7rem;
				height:7rem;
				margin-top: .8rem;
			}
			p{
				color:$color-subfont;
				font-size: .6rem;
				transform: scale(.85);
				margin-top: 1.6rem;
			}
			button{
				margin-top: .8rem;
				margin-bottom: .8rem;
			}
		}
	}
</style>
