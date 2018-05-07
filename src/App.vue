<template>
  <div id="app" style="height:100%;">

	<x-header 
      style="width:100%;
				      position:absolute;
				      left:0;
				      top:0;
				      z-index:100;
				      background-color:rgb(0, 106, 166)" :style="check">
		<span>Dcard</span>
		<x-icon @click="drawerVisibility = !drawerVisibility" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>

	<!-- main content -->
	<drawer
	width="200px;"
	:show.sync="drawerVisibility"
	show-mode="push"
	:drawer-style="{'background-color':'rgb(0, 45, 70)', width: '70vw','overflow':'scroll','padding-top':'46px'}">

	<!-- drawer content -->
		<div slot="drawer" >
			<ul>
				<li>
					<router-link to="/" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >全部</router-link>
				</li>
				<li>
					<a href="https://github.com/realdennis" @click="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >Github</a>
				</li>
			</ul>
			<br>
				<p style="color:hsla(0,0%,100%,.6)">分類看板</p>
		  	<ul>
				<li>
					<router-link to="/movie" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >電影</router-link>
				</li>
				<li>
					<router-link to="/relationship" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >感情</router-link>
				</li>

				<li>
					<router-link to="/game" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >遊戲</router-link>
				</li>
				<li>
					<router-link to="/acg" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >動漫</router-link>
				</li>
			</ul>
			<br>

			<p style="color:hsla(0,0%,100%,.6)">校園看板</p>
			<ul>
				<li>
					<router-link to="/nctu" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >交通大學</router-link>
				</li>
				<li>
					<router-link to="/ncku" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >成功大學</router-link>
				</li>
				<li>
					<router-link to="/ntou" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >海洋大學</router-link>
				</li>
				<li>
					<router-link to="/ntu" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >台灣大學</router-link>
				</li>
				<li>
					<router-link to="/nccu" @click.native="drawerVisibility = false" style="font-size:20px;color:hsla(0,0%,100%,.6);" >政治大學</router-link>
				</li>
				</ul>
		  <!--
		<group title="" style="margin-top:20px;">
		  <cell title="全部" link="/demo"  @click.native="drawerVisibility = false"  style="color:rgb(128,153,167);background-color:rgb(0,50,78);">
		  </cell>
		  <cell title="Github" link="http://github.com/realdennis" value="Star me" @click.native="drawerVisibility = false"  style="color:rgb(128,153,167);background-color:rgb(0,50,78);">
		  </cell>	
		</group>

		<group title="訂閱看板" style="margin-top:20px;">
		  <cell title="Demo" link="/demo" value="演示" @click="drawerVisibility = false">
		  </cell>
		 	<cell title="Buy me a coffee" link="project/donate" @click="drawerVisibility = false">
		  </cell>
		  <cell title="Github" link="http://github.com/airyland/vux" value="Star me" @click="drawerVisibility = false">
		  </cell>
		</group>
		<group title="校園看板">
		</group>
		-->
		</div>

		<div id="router-post">
		<router-view></router-view>
		</div>
	</drawer>
  </div>
</template>

<script>
import { XHeader,Drawer,Group,Cell,Radio,ViewBox } from 'vux'

export default {
  name: 'app',
  components: {
    XHeader,Drawer,Group,Cell,Radio,ViewBox
  },
  data(){
  	return{
    	drawerVisibility: false,
    	showMode:'push',
      check:''
  	}
  },
  methods:{
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false
      }
      return true
    },
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

ul {
	padding:10px;
	padding-left:30px; 
	list-style:none;
	background-color:rgb(0,50,78);
}

li {
	margin-top:10px;
	text-align:left;
}

#router-post {
	padding-top:46px;
	height:100%;
	margin:0 10px;
	overflow-x:hidden;
	overflow-y:scroll;
}
</style>
