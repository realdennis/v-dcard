<template>
  <div id="app" style="height:100%;" @click.right.prevent>

	<x-header 
      style="width:100%;
				      position:absolute;
				      left:0;
				      top:0;
				      z-index:100;
				      background-color:rgb(15, 107, 164);
				      /*background-color:rgb(0, 106, 166)*/" :style="check">
		<span>V-Dcard</span>
		<x-icon @click="drawerVisibility = !drawerVisibility" slot="overwrite-left" type="navicon" size="40" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>

    <x-icon @click="goBack" type="ios-arrow-thin-left" size="40" style="position:absolute;bottom:20;right:20;border:1px solid rgb(15, 107, 164);border-radius:100%;z-index:100"></x-icon>
	<!-- main content -->
	<drawer
	width="200px;"
	:show.sync="drawerVisibility"
	show-mode="push"
	:drawer-style="{'-webkit-overflow-scrolling':'touch','background-color':/*'rgb(0, 45, 70)'*/'#00325f' ,width: '70vw','overflow':'scroll','padding-top':'46px'}">
	<!-- drawer content -->
		<div slot="drawer" >
			<br>
			<ul>
				<li>
					<router-link class="forum" to="/" @click.native="drawerVisibility = false" >全部</router-link>
				</li>
				<li>
					<a class="forum" href="https://github.com/realdennis/v-dcard" @click="drawerVisibility = false" >Github</a>
				</li>
			</ul>

			<p @click="type1 = !type1" style="color:hsla(0,0%,100%,.6);margin:10px;">分類看板</p>
			<transition name="slide-fade">
			  	<ul v-if="type1">
					<li v-for="f in forums" >
						<router-link class="forum" :to="'/'+f.alias" @click.native="drawerVisibility = false" >{{f.name}}</router-link>
					</li>
				</ul>
			</transition>

			<p @click="type2 = !type2" style="color:hsla(0,0%,100%,.6); margin:10px;">校園看板</p>
			<transition name="slide-fade">
				<ul v-if="type2">
					<li v-for="s in schools" >
						<router-link class="forum" :to="'/'+s.alias" @click.native="drawerVisibility = false"  >{{s.name}}</router-link>
					</li>
				</ul>
			</transition>
			<br>
			<br>
		</div>

		<div id="router-post">
			<router-view></router-view>
		</div>
	</drawer>
  </div>
</template>

<script>
import { XHeader,Drawer } from 'vux'
import school from './components/school.json'
import forum from './components/forum.json'

export default {
  name: 'app',
  components: {
    XHeader,Drawer
  },
  data(){
  	return{
    	drawerVisibility: false,
    	showMode:'push',
      	check:'',
      	schools:school,
      	forums:forum,
      	type1:false,
      	type2:false
  	}
  },
  methods:{
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false
      }
      return true
    },
    goBack(){
    	history.go(-1);
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

#app{
	margin:0 auto;
}
body {
  box-sizing: border-box;
  background-color: #fbf9fe;
  color: #495060;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
/*	background-color:rgb(71, 108, 201);*/
	background-color:rgb(0,50,78);
}

li {
	margin-top:10px;
	text-align:left;
}

#router-post {
	padding-top:46px;
	height: 100%;
	margin:0 10px;
	overflow-x:hidden;
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;
}

.forum{
	font-size:15px;
	color:hsla(0,0%,100%,.8);
}
.forum:hover{
	color:pink
}

.slide-fade-enter-active {
  transition: all .5s ;
}
.slide-fade-leave-active {
  transition: all .3s ;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(-20px);
  opacity: 0;
}

.vux-x-icon {
  fill: rgb(86, 167, 212);
}
</style>
