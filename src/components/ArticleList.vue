<template>
  <div id="article">
  <!-- Allpost -->
    <div v-infinite-scroll="getPost" infinite-scroll-disabled="busy">
      <div class="post" v-for="p in posts" @click="clickPost(p.id)">
        <span class="gender">{{p.gender}}</span>
        <span class="forumName">{{p.forumName}}</span>
        <span class="school">{{p.school}}</span>
        <span class="school" v-if="!p.school">匿名</span>
        <h3 class="title">{{p.title}}</h3>
        <p class="excerpt">{{p.excerpt}}</p>
        <div style="opacity: .35;">
          <span class="likeCount">{{p.likeCount}} Likes</span>
          <span>, </span>
          <span class="commentCount">{{p.commentCount}} comments</span>
        </div>
      </div>
    </div>

    <div  v-if="loading==true" style="text-align:center">
      <br>
      <inline-loading></inline-loading>
    </div>
    
    <div v-else-if="loading=='error'" style="text-align:center">
      <br>
      Error
    </div>
    
    <div v-else>
      <p v-if="busy" class="more">沒有更多文章囉！</p>
      <p v-else class="more">上滑查看更多文章</p>
    </div>
  </div>
</template>

<script>
import { InlineLoading, Tab, TabItem } from 'vux'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  components: {
    Tab, TabItem,
    InlineLoading,
  },
  directives:{
    infiniteScroll
  },
  watch:{
    '$route.params.board':function(board){
      console.log('board change')
      this.timeout = 0;
      this.board = board;
      this.posts=[];
      this.before = null;
      this.busy = false;
      this.getPost();
    },
    'popular':function(popular){
      console.log('popular change')
      this.timeout = 0;
      this.popular=popular;
      this.posts=[];
      this.before = null;
      this.busy = false;
      this.getPost();
    }
  },
  mounted(){
    this.board = this.$route.params.board;
    //this.board = board;
  },
  props:['popular'],
  data () {
    return {
      board:undefined,
      msg: 'Hello World!',
      posts:[],
      articleLength:0,
      loading:false,
      before:null,
      timeout:0,
      busy:false
    }
  },
  methods:{
    clickPost(id){
      this.$router.push('/post/'+id)
    },
    getPost(){
      
      if(this.busy) return;
      this.busy = true;
      //Mutex

      if(this.articleLength<30 && this.before!==null ) return //unusual req
      this.loading=true;

      const CORS = 'https://c2250e18.ngrok.io/';
      let api = CORS + 'https://www.dcard.tw/_api/';
      if(this.board!=undefined) api = api + 'forums/' + this.board + '/';
      let url = api + 'posts'

      this.$http.get(url,{
        params:{
          popular:this.popular,
          before:this.before
        }
      }).then((response)=>{
            this.articleLength = response.data.length;
            if(this.articleLength===30){
              this.before = response.data[this.articleLength-1].id;
              this.busy = false;
            }
            else this.busy=true;

            this.posts = this.posts.concat(response.data) ;
            this.loading=false
          }).catch((err)=>{
              console.log("error:");
              console.log(err);
              this.loading="error"
              this.busy = true
             })
    }     
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.gender {
}
.more {
  margin-top:20px;
  text-align: center;
  opacity:.35;
}


#article {
  padding-bottom:70px;
}

.title {
  color: rgb(38, 38, 38);
  font-size: 17px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0px 0px 8px;
}
.excerpt {    
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0px;
}

.forumName {  
  -ms-flex: 0 0 auto;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  opacity: .65;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.forumName::after{
  content: "\FF0E";
}
.school {
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post {
  border-bottom: 1px solid #dedede;
  padding:15px 10px;
  margin:0 0px;
}

.post:active{
  background-color:rgba(255,192,203,.3);
}
</style>
