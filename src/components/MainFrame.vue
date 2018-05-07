<template>
  <div id="Main">
    <div>
       <tab :line-width=2 active-color='rgb(86, 167, 212)' v-model="index">
        <tab-item v-for="item in list2" 
                  :key="item.index" 
                  @on-item-click="tabclick(item.popular)">
                {{item.name}}</tab-item>
      </tab>

    <transition name="slide-fade">
      <ArticalList  :popular="popular"></ArticalList>
    </transition>
    </div>
  </div>
</template>

<script>
import ArticalList from './ArticleList'
import {Tab,TabItem,Swiper,SwiperItem} from 'vux'

export default {
  components: {
    ArticalList,
    Tab,TabItem
  },
  directives:{
  },
  watch:{
  },
  mounted(){
  },
  data () {
    return {
      popular:true,
      index01: 0,
      list2:[{
        name:'熱門',
        popular:true,
        index:0
      },{
        name:'最新',
        popular:false,
        index:1
      }],
      demo2: '熱門',
      index: 0,
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      }
    }
  },
  methods:{
    tabclick(p){
      this.popular = p
    }
  }
}
</script>

<style>

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
</style>
