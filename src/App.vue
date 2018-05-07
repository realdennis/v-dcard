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
	:drawer-style="{'-webkit-overflow-scrolling':'touch','background-color':'rgb(0, 45, 70)', width: '70vw','overflow':'scroll','padding-top':'46px'}">
	<!-- drawer content -->
		<div slot="drawer" >
			<ul>
				<li>
					<router-link class="forum" to="/" @click.native="drawerVisibility = false" >全部</router-link>
				</li>
				<li>
					<a class="forum" href="https://github.com/realdennis" @click="drawerVisibility = false" >Github</a>
				</li>
			</ul>

			<p @click="dosomething('type1')" style="color:hsla(0,0%,100%,.6);margin:10px">分類看板</p>
			<transition name="fade">
			  	<ul :style="type1">
					<li v-for="f in forums">
						<router-link class="forum" :to="f.alias" @click.native="drawerVisibility = false" >{{f.name}}</router-link>
					</li>
				</ul>
			</transition>

			<p @click="dosomething('type2')" style="color:hsla(0,0%,100%,.6); margin:10px">校園看板</p>
			<transition name="fade">
				<ul :style="type2">
					<li v-for="s in schools">
						<router-link class="forum" :to="s.alias" @click.native="drawerVisibility = false"  >{{s.name}}</router-link>
					</li>
				</ul>
			</transition>
		</div>

		<div id="router-post">
		<router-view></router-view>
		</div>
	</drawer>
  </div>
</template>

<script>
import { XHeader,Drawer,Group,Cell,Radio } from 'vux'
import school from './components/school.json'
import forum from './components/forum.json'

export default {
  name: 'app',
  components: {
    XHeader,Drawer,Group,Cell,Radio
  },
  data(){
  	return{
    	drawerVisibility: false,
    	showMode:'push',
      	check:'',
      	schools:school,
      	forums:forum,
      	type1:'',
      	type2:''
  	}
  },
  created(){
  },
  methods:{
    isShowNav () {
      if (this.entryUrl.indexOf('hide-nav') > -1) {
        return false
      }
      return true
    },
    dosomething(type){
    	if(type==="type1"){
    		this.type1===''?this.type1='display:none':this.type1='';
    	}else{
    		this.type2===''?this.type2='display:none':this.type2='';
    	}
    }
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
	height: 100%;
	margin:0 10px;
	overflow-x:hidden;
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;
}

.forum{
	font-size:15px;color:hsla(0,0%,100%,.6);
}
.forum:hover{
	color:pink
}
</style>
