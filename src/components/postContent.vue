<template>
  <div id="Post">

  	<div class="post-content commentEntry">
      <div v-if="content_loading==true" style="text-align:center">  	
	      <br>
	      <inline-loading></inline-loading>
      </div>

      <div v-else-if="content_loading=='error'" style="text-align:center">
        <br>
      	Error
      </div>

      <div v-else class="comment">
        <span :style="colorful(content.gender)" class="gender">{{content.gender}}</span>
        <span class="school">{{content.school}}</span>
        <span class="school" v-if="!content.school">匿名</span>
        <h3 class="title">{{content.title}}</h3>
        <div class="info">
          <span class="forumName">{{content.forumName}}</span>
          <span class="time">{{ beautyTime(content.createdAt) }}</span>
        </div>
        <div >
        	<pre>{{content.content}}</pre>
	        <div style="opacity: .35;">
	          <span class="likeCount">{{content.likeCount}} Likes</span>
	          <span>, </span>
	          <span class="commentCount">{{content.commentCount}} comments</span>
	        </div>
	        <div>
	        	<span class="topic" v-for="topic in content.topics"> {{ topic }} </span>
	        </div>
        </div>
      </div>
  	</div>

  	<div v-if="popular_comments.length!=0" class="commentEntry">

      <div v-if="popular_comment_loading==true" style="text-align:center">  	
	      <br>
	      <inline-loading></inline-loading>
      </div>

      <div v-else-if="popular_comment_loading=='error'" style="text-align:center">
        <br>
      	Error
      </div>

      <div class="comment" v-else>
      	<span style="opacity: .35;">熱門回應</span>
      	<div class="content" v-for="pc in popular_comments">
      		<div>
		        <span :style="colorful(content.gender)" class="gender">{{pc.gender}}</span>
		        <span class="school">{{pc.school}}</span>
		        <span class="school" v-if="!pc.school">匿名</span>
		      </div>
  		    <div class="info">
  		    	<span class="floor">B{{pc.floor}}</span>
  		    	<span class="time">{{beautyTime(pc.createdAt)}}</span>
  		    </div>
  		    <div>
  		    	<pre>{{pc.content}}</pre>
  		   		 <p class="likeCount" style="opacity:.35;">{{pc.likeCount}} likes</p>
  		    </div>
        </div>
	    </div>
  	</div>

  	<div v-infinite-scroll="getComments" infinite-scroll-disabled="busy" class="commentEntry">
      <div class="comment">
      	<span style="opacity:.35">最新回應</span>
      	<div class="content" v-for="c in comments">
      		<div>
		        <span :style="colorful(content.gender)" class="gender">{{c.gender}}</span>
		        <span class="school">{{c.school}}</span>
		        <span class="school" v-if="!c.school">匿名</span>
		      </div>
  		    <div class="info">
  		    	<span class="floor">B{{c.floor}}</span>
  		    	<span class="time">{{ beautyTime(c.createdAt) }}</span>
  		    </div>
  		    <div>
  		    	<pre>{{c.content}}</pre>
  		   		 <p class="likeCount" style="opacity:.35;">{{c.likeCount}} likes</p>
  		    </div>
        </div>
	    </div>
    	<div v-if="comment_loading==true" style="text-align:center">  	
    	      <br>
    	      <inline-loading></inline-loading>
    	</div>

    	<div v-else-if="comment_loading=='error'" style="text-align:center">
            <br>
          	Error
    	</div>		
  	</div>
  </div>
</template>

<script>
import {InlineLoading} from 'vux'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  components: {
  	InlineLoading
  },
  directives:{
    infiniteScroll
  },
  watch:{
  	'$route.params.postId':function(postId){
  		this.postId = postId;
  		console.log(postId)
  		this.initial();
  	}
  },

  mounted(){
  	this.initial()
  },
  data () {
    return {
    	postId:0,
    	content:[],
    	content_loading:true,
    	comment_loading:true,
    	popular_comment_loading:true,
    	after:0,
    	busy:false,
    	popular_comments:[],
    	comments:[],
    	commentsLength:0,

    }
  },
  computed:{
  },
  methods:{    
    colorful(g){
      if(g==='F') return 'color:rgb(255,192,203);'
      else if(g==='M') return 'color:rgb(30,144,255);'
      else return
    },
    beautyTime(time){
      let t = new Date(time);

      return t.getMonth()+'月'+t.getDate()+'日 '+t.getHours()+':'+t.getMinutes() 
    },
  	initial(){
	  	this.postId = this.$route.params.postId
	  	this.getContent();
	  	this.getPopularComments();
	  	this.getComments();
  	},
  	getContent(){
      //const CORS = 'https://cors-realdennis.herokuapp.com/';
      let api = this.CORS + 'https://www.dcard.tw/_api/posts/';

      this.content_loading = true;
	    this.$http.get(api+this.postId).then((response)=>{
            this.content = response.data;
            this.content_loading=false
            console.log(response)
          }).catch((err)=>{
              console.log("error:");
              console.log(err);
              this.content_loading="error"
     	})
  	},
  	getPopularComments(){
      //const CORS = 'https://cors-realdennis.herokuapp.com/';
      let api = this.CORS + 'https://www.dcard.tw/_api/posts/';
      this.comment_loading = true;
      this.$http.get(api+this.postId+'/comments',{
      	params:{
      		popular:true
      	}
      }).then(response=>{
            this.popular_comments = response.data
            this.popular_comment_loading=false
          }).catch((err)=>{
              console.log("error:");
              console.log(err);
              this.popular_comment_loading="error"
             })
  	},

  	getComments(){
      if(this.busy) return;
      this.busy = true;
      //Mutex

      //const CORS = 'https://cors-realdennis.herokuapp.com/';
      let api = this.CORS + 'https://www.dcard.tw/_api/posts/';
      this.comment_loading = true;
      this.$http.get(api+this.postId+'/comments',{
      	params:{
	      	after:this.after
	      }
      }).then(response=>{
            this.commentsLength = response.data.length;
            if(this.commentsLength===30){
              this.after += 30;
              this.busy = false;
            }
            else this.busy=true;
        	this.comments = this.comments.concat(response.data);
            this.comment_loading=false
          }).catch((err)=>{
              console.log("error:");
              console.log(err);
              this.comment_loading="error"
              this.busy = true
             })
  	}
  }
}
</script>

<style>

#Post {
  padding-bottom:70px;
}

.content{  
  margin:20px 0;
  border-bottom:1px solid #dfdfdf;

}

.post-content{
  line-height: 30px;
}

.comment{
  margin:0 10px;
}
.commentEntry{
  padding: 20px 0;
  background-color: white;
  margin-bottom: 10px;
}
.floor {
  padding-right: 5px;
  border-right:solid 1px gray;
}
.info {
  font-size:12px;
  opacity: .45;
}
.topic {
  background-color:rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.65);
  font-size: 0.8125em;
  margin: 8px;
  padding: 8px 16px;
  border-radius: 4px;
}

pre {
white-space: pre-wrap;
word-wrap: break-word;
}

</style>
