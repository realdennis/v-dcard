<template>
  <div>
  <!-- Allpost -->
    <div class="post" v-for="p in posts">
      <span class="gender">{{p.gender}}</span>
      <span class="forumName">{{p.forumName}}</span>
      <span class="school">{{p.school}}</span>
      <h3 class="title">{{p.title}}</h3>
      <p class="excerpt">{{p.excerpt}}</p>
      <div style="opacity: .35;">
        <span class="likeCount">{{p.likeCount}} Likes</span>
        <span>, </span>
        <span class="commentCount">{{p.commentCount}} comments</span>
      </div>
    </div>
    

  </div>
</template>

<script>
import { Tab, TabItem, Group, Cell,XHeader,Divider } from 'vux'

export default {
  components: {
    Tab, TabItem,
    Group,
    Cell,
    XHeader,Divider
  },
  mounted(){
    console.log('mouted');
    let board = this.$route.params.board;

    if(board===undefined){
      this.$http.get('https://b32de5f2.ngrok.io/https://www.dcard.tw/_api/posts?popular=true').then((response) => {
        console.log(response.data)
        this.posts = response.data
      })
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      posts:{},
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

.post {
  border-bottom: 1px solid #dedede;
  padding:15px 0;
}

.title {
  font-weight: 700;
  font-size: 18px;
  margin: 0;
  min-height: 28px;
  opacity: .85;
  overflow: hidden;
  padding-bottom: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.excerpt {
  min-height: 16px;
  opacity: .6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
