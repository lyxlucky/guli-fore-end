<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <li>
                  <a title="数据库" href="#">数据库</a>
                </li>
                <li class="current">
                  <a title="外语考试" href="#">外语考试</a>
                </li>
                <li>
                  <a title="教师资格证" href="#">教师资格证</a>
                </li>
                <li>
                  <a title="公务员" href="#">公务员</a>
                </li>
                <li>
                  <a title="移动开发" href="#">移动开发</a>
                </li>
                <li>
                  <a title="操作系统" href="#">操作系统</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="职称英语" href="#">职称英语</a>
                </li>
                <li>
                  <a title="英语四级" href="#">英语四级</a>
                </li>
                <li>
                  <a title="英语六级" href="#">英语六级</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li>
                <a title="关注度" href="#">关注度</a>
              </li>
              <li>
                <a title="最新" href="#">最新</a>
              </li>
              <li class="current bg-orange">
                <a title="价格" href="#"
                  >价格&nbsp;
                  <span>↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="data == null" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理 中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data != null" class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in data" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title" />
                    <div class="cc-mask">
                      <a
                        :href="'/course/' + item.id"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                        >开始学习</a
                      >
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      href="/course/1"
                      :title="item.title"
                      class="course-title fsize18 c-333"
                      >{{ item.title }}</a
                    >
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{
                        Number(item.price) == 0 ? "免费" : item.price + "￥"
                      }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ item.viewCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">{{ item.commentCount }}评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <!-- 公共分页 开始 -->
        <el-pagination
          :current-page="current"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
        />
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "../../api/course";
export default {
  data() {
    return {
      current: 1,
      pageSize: 8,
      total: 0,
      data: {},
      subjectOneList: [],
      subjectTwoList: [],
      searchObj: {},
      oneIndex: -1,
      twoIndex: -1,
      buyCount: "",
      gmtCreate: "",
      price: "",
    };
  },
  created() {
    this.getCourseList();
  },
  methods: {
    handleCurrentChange(newpage) {
      this.current = newpage;
      this.getCourseList();
    },
    getCourseList() {
      course.getCourseList(this.current, this.pageSize, this.searchObj).then((res) => {
        this.data = res.data.data.items;
        this.total = res.data.data.total;
      });
    },
    getSubjectList() {
      course.getSubjectList().then((res) => {});
    },
  },
};
</script>
