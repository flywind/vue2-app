<template>
	<div class="container">
		<tb-header fixed goback title="Accounts.google.com">
			<svg class="refresh" slot="right" @click="reload">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#refresh"></use>
			</svg>
		</tb-header>
		<section class="signin">
			<svg class="google">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#google"></use>
			</svg>
			<h1>Sign in</h1>
			<h2>Continue to YouTube. You'll also sign in to Google services in your apps & Safari</h2>
			<div class="item">
				<h3>Email</h3>
				<input type="text"  />
				<div class="tip">Couldn't find your Google Account</div>
			</div>
			<div class="forgot">Forgot email</div>
			<div class="sign-text">
				<span>Create account</span>
				<mt-button type="primary">NEXT</mt-button>
			</div>
		</section>
		
    </div>
</template>

<script type="text/babel">
	import tbHeader from '../components/header';
	export default{
		data(){
			return {
				
			}
		},
		mounted(){
			
		},
		components:{
			tbHeader
		},
		computed:{
			
		},
		methods:{
			reload(){
				window.location.reload();
			},
			
		}
	}
</script>

<style lang="scss">
	@import "../assets/mixin";
	.container{
		display:flex;
		flex-direction: column;
		.signin{
			margin-top:1.9rem;
			display:flex;
			flex-direction:column;
			padding: 0 .6rem;
			.google{
				@include wh(3rem,1rem);
				margin-top:.8rem;
			}
			h1{
				margin-top:.4rem;
				@include sc(.9rem,$fontcolor);
			}
			h2{
				@include sc(.6rem,$fontcolor);
			}
			.item{
				margin-top:2rem;
				display: flex;
				flex-direction: column;
				align-items:flex-start;
				justify-content: flex-start;
				h3{
					@include sc(.6rem,$subfontcolor);
					transform:scale(.8);
					margin-left: -0.1rem;
				}
				input{
					border-bottom: .025rem solid $bc;
					width: 100%;
					@include sc(.7rem,$fontcolor);
					height:1.5rem;
					font-weight:bold;
				}
				.tip{
					@include sc(.6rem,$red);
					transform:scale(.8);
					font-weight:bold;
					margin-top:.2rem;
					margin-left:-1.45rem;
					width:100%;
				}
				
			}
			.forgot{
				@include sc(.6rem,$blue);
				margin-top: 1rem;
			}
			.sign-text{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top:1.5rem;
				span{
					@include sc(.6rem,$blue);
				}
			}
		}
	}
	
	
</style>