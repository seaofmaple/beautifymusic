<template>
  <div id="comment-page">
    <div class="post-comment">
      <el-input
        type="textarea"
        class="input"
        placeholder="请输入内容"
        v-model="commentInfo"
        maxlength="140"
        show-word-limit
        resize="none"
        rows="4"
      >
      </el-input>
      <button @click="postComment">评论</button>
    </div>
    <div style="margin-left: 20px" v-show="comment.hotComments != undefined && comment.hotComments.length > 0">
      <p style="font-weight: 600; cursor: default; margin-bottom: 2%">
        精彩评论({{ length }})
      </p>
      <!--精彩评论的信息-->
      <div
        v-for="(item, index) in comment.hotComments"
        :key="index"
        style="
          position: relative;
          width:87%
          border-top: 2px solid rgb(240, 240, 242);
          border-bottom: 1px solid rgb(240, 240, 242);
          padding: 15px 0;
          font-size: 15px;
        "
      >
        <div>
          <!--用户头像-->
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="
              display: inline;
              width: 50px;
              height: 50px;
              border-radius: 25px;
              cursor: pointer;
            "
          />

          <!--评论信息-->
          <div style="margin-left: 60px; margin-top: -60px">
            <p>
              <span style="color: #4d99de; cursor: pointer">{{ item.user.nickname }}</span
              >: {{ item.content }}
            </p>

            <br v-if="item.beReplied != undefined && item.beReplied.length > 0" />
            <!--子评论-->
            <div
              v-if="item.beReplied != undefined && item.beReplied.length > 0"
              style="background-color: rgb(241, 241, 244); padding: 5px 5px"
            >
              <p v-for="(citem, index) in item.beReplied" :key="index">
                <span style="color: #4d99de; cursor: pointer">{{
                  citem.user.nickname
                }}</span
                >: {{ citem.content }}
              </p>
            </div>

            <p style="display: block; font-size: 13px; color: gray; opacity: 0.7">
              {{ item.time | dateFormat }}
            </p>
          </div>
        </div>
        <!-- 点赞等功能 -->
        <div style="position: absolute; right: 0; bottom: 1%; opacity: 0.9">
          <span v-if="!item.liked">
            <i class="iconfont" style="font-size: 25px; cursor: pointer"></i
            >{{ item.likedCount }}
          </span>
          <span v-else>
            <i
              class="iconfont"
              style="font-size: 25px; margin-right: 20px; color: #ff3a3a; cursor: pointer"
            ></i>
          </span>
          <i
            class="el-icon-chat-line-round"
            style="font-size: 25px; cursor: pointer; margin-left: 15px"
          ></i>
        </div>
      </div>
      <div
        v-show="comment.moreHot"
        style="
          display: inline-block;
          margin-left: 40%;
          margin-top: 3%;
          transform: translateX(-50%);
          border-radius: 20px;
          border: 1px solid #d8d8d8;
          padding: 5px 15px;
          cursor: pointer;
        "
      >
        更多精彩评论>
      </div>
    </div>
    <div style="margin-left: 20px" v-show="comment.total > 0">
      <p style="font-weight: 600; cursor: default; margin-bottom: 2%">
        最新评论({{ comment.total }})
      </p>
      <!--最新评论的信息-->
      <div
        v-for="(item, index) in comment.comments"
        :key="index"
        style="
          position: relative;
          width:87%
          border-top: 2px solid rgb(240, 240, 242);
          border-bottom: 1px solid rgb(240, 240, 242);
          padding: 15px 0;
          font-size: 15px;
        "
      >
        <div>
          <!--用户头像-->
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="
              display: inline;
              width: 50px;
              height: 50px;
              border-radius: 25px;
              cursor: pointer;
            "
          />

          <!--评论信息-->
          <div style="margin-left: 60px; margin-top: -60px">
            <p>
              <span style="color: #4d99de; cursor: pointer">{{ item.user.nickname }}</span
              >: {{ item.content }}
            </p>

            <br v-if="item.beReplied != undefined && item.beReplied.length > 0" />
            <!--子评论-->
            <div
              v-if="item.beReplied != undefined && item.beReplied.length > 0"
              style="background-color: rgb(241, 241, 244); padding: 5px 5px"
            >
              <p v-for="(citem, index) in item.beReplied" :key="index">
                <span style="color: #4d99de; cursor: pointer">{{
                  citem.user.nickname
                }}</span
                >: {{ citem.content }}
              </p>
            </div>

            <p style="display: block; font-size: 13px; color: gray; opacity: 0.7">
              {{ item.time | dateFormat }}
            </p>
          </div>
        </div>
        <!-- 点赞等功能 -->
        <div style="position: absolute; right: 0; bottom: 1%; opacity: 0.9">
          <span v-if="!item.liked">
            <i class="iconfont icon-dianzan" style="font-size: 25px; cursor: pointer"></i
            >{{ item.likedCount }}
          </span>
          <span v-else>
            <i
              class="iconfont"
              style="font-size: 25px; margin-right: 20px; color: #ff3a3a; cursor: pointer"
            ></i>
          </span>
          <i
            class="el-icon-chat-line-round"
            style="font-size: 25px; cursor: pointer; margin-left: 15px"
          ></i>
        </div>
      </div>
      <br /><br />
      <el-pagination
      :page-size="20"
      :background="true"
      :current-page.sync="currentPage"
      @current-change="handleCurrentPage(currentPage)"
      layout="prev, pager, next"
      :total="comment.total"
      class="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvComment',
  props: {
    comment: Object,
    //歌单id
    songListid: String
  },
  data() {
    return {
      //用户评论信息
      commentInfo: '',
      currentPage: 1
    }
  },
  methods: {
    postComment() {

    },
    handleCurrentPage(page) {
      this.$emit('changePage', page)
    }
  },
  filters: {
    dateFormat (originVal) {
      const dt = new Date(originVal)

      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDay() + '').padStart(2, '0')

      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  },
  computed: {
    length() {
      if(this.comment.hotComments) {
        return this.comment.hotComments.length
      }
    }
  }
}

</script>
<style scoped>
.input {
  width: 700px;
  margin-top: 30px;
  margin-left: 30px;
}
button {
  padding: 5px 10px;
  background-color: #fff;
  outline: none;
  border-radius: 5px;
  position: absolute;
  left: 700px;
  top: 630px;
}
.iconfont::before {
  content: '';
  background:url("../../../assets/imgs/thumbs-up.svg") no-repeat;
  background-size: 19px 24px;
  width:19px;
  height:24px;
  position:absolute;
  left: -20px;
  top:25%;
}
.page {
  margin-left: 150px;
  margin-bottom: 30px;
}
</style>