<template>
  <div id="article">
  <!-- Allpost -->
    <div class="post" v-for="p in posts">
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

    <div  v-if="loading==true" style="text-align:center">
      <br>
      <inline-loading></inline-loading>
    </div>
    
    <div v-else-if="loading=='error'" style="text-align:center">
      <br>
      Error
    </div>
    
    <div v-else>
      <p v-if="articleLength!=30" class="more">沒有更多文章囉！</p>
      <p v-else class="more">上滑查看更多文章</p>
    </div>
  </div>
</template>

<script>
import { InlineLoading,Tab, TabItem, Group, Cell,XHeader,Divider } from 'vux'

export default {
  components: {
    Tab, TabItem,
    Group,
    Cell,
    XHeader,Divider,InlineLoading
  },
  watch:{
    '$route.params.board':function(board){
      this.getPost(board);
      this.posts={};
    }
  },
  mounted(){
    console.log('mouted');
    let board = this.$route.params.board;
    this.getPost(board);

  },
  created(){
    console.log('created')
  },
  updated(){
    console.log('updated')
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      posts:{},
      articleLength:0,
      loading:false,
    }
  },
  methods:{
    getPost(board){
      this.loading=true;
      console.log('I am loading')
      if(board==undefined){
        this.$http.get('https://942bf4e6.ngrok.io/https://www.dcard.tw/_api/posts?popular=true').then((response) => {
          //console.log(response.data)
          //this.posts = response.data
          this.articleLength = response.data.length;
          this.posts = {...this.post,...response.data};

          this.loading=false

        }).catch(err=>{
          console.log("error:");
          console.log(err);
          this.loading="error"
        })
      }else{
        this.$http.get(' https://942bf4e6.ngrok.io/https://www.dcard.tw/_api/forums/'+board+'/posts?popular=true').then((response) => {
          console.log(response.data);
          this.articleLength = response.data.length;
          this.posts = {...this.post,...response.data}


          this.loading=false

        }).catch(err=>{
          console.log("error:");
          console.log(err);
          this.loading="error"

        });
      }
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

.post {
  border-bottom: 1px solid #dedede;
  padding:15px 0;
  margin:0 10px;
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
  font-size: 13px;
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
</style>
