<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        ></el-input>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <el-form-item label="课程类别">
        <el-select
          @change="subjectLevelOneChanged"
          @focus="subjectFocus"
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select
          style="padding-left: 10px"
          v-model="courseInfo.subjectId"
          placeholder="请选择"
        >
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select
          @focus="teacherFocus"
          v-model="courseInfo.teacherId"
          placeholder="请选择"
        >
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <vue-tinymce v-model="courseInfo.description" :setting="setting" />
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :auto-upload="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="UPLOAD_URL"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="请输入课程价格"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/course/course";
import subject from "@/api/subject/subject";
export default {
  data() {
    return {
      teacherFocusCount: true, //节流
      subjectFocusCount: true,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        id: "",
        title: "",
        subjectId: "",
        subjectParentId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover:
          "http://edu-longyang.oss-cn-beijing.aliyuncs.com/2020/08/05/25f411209c8b44b9b003482b6265c3c9file.png",
        price: 0,
      },
      props: {
        label: "title",
        value: "id",
      },
      isUpdate: false,
      courseId: "",
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
      UPLOAD_URL: "http://localhost:8100/eduoss/file/upload",
      setting: {
        menubar: false,
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist |table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link table lists fullscreen quickbars",
        language: "zh_CN", //本地化设置
        height: 300,
      }, //本地化设置
    };
  },
  watch: {
    $route(to, from) {
      //路由变化方式，当路由发送变化，方法就执行
      console.log("watch $route");
      this.courseInfo = {};
    },
  },
  methods: {
    teacherFocus() {
      if (this.teacherFocusCount) {
        this.findAllTeacher();
        console.log("teacherfocus");
      }
      this.teacherFocusCount = false;
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        //根据id获取课程基本信息
        this.courseId = this.$route.params.id;
        this.fetchCourseInfoById(id);
      }
    },
    subjectLevelOneChanged() {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (this.subjectOneList[i].id === this.courseInfo.subjectParentId) {
          this.subjectTwoList = this.subjectOneList[i].children;
          console.log(this.subjectOneList[i].children);
          this.courseInfo.subjectId = "";
        }
      }
    },
    subjectFocus() {
      if (this.subjectFocusCount) {
        this.getAllSubject();
      }
      console.log("subjectfocus");
      this.subjectFocusCount = false;
    },
    next() {
      this.saveOrUpdate();
    },
    fetchCourseInfoById(id) {
      course
        .getCourseById(id)
        .then((response) => {
          this.courseInfo.title = response.data.list.title;
          this.courseInfo.subjectId = response.data.list.subjectId;
          this.courseInfo.teacherId = response.data.list.teacherId;
          this.courseInfo.subjectParentId = response.data.list.subjectParentId;
          this.teacherList = response.data.list.teacherList;
          this.subjectOneList = response.data.list.subjectList;
          this.courseInfo.lessonNum = response.data.list.lessonNum;
          this.courseInfo.description = response.data.list.description;
          this.courseInfo.cover = response.data.list.cover;
          this.courseInfo.price = response.data.list.price;
          for (let i = 0; i < this.subjectOneList.length; i++) {
            if (this.subjectOneList[i].id === this.courseInfo.subjectParentId) {
              this.subjectTwoList = this.subjectOneList[i].children;
            }
          }
        })
        .catch((error) => {});
    },
    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseInfo.cover = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //更新课程信息
    updateCourseInfo() {
      course
        .updateCourseById(this.courseInfo)
        .then((response) => {
          if (response.code == 20000) {
            this.$message.success("修改成功");
            this.isUpdate = true;
          }
        })
        .catch();
    },
    //查询所有的分类
    getAllSubject() {
      subject
        .getSubjectList()
        .then((response) => {
          this.subjectOneList = response.data.list;
          console.log(this.subjectOneList);
        })
        .catch((error) => {});
    },
    //查询所有讲师
    findAllTeacher() {
      course
        .getTeacherList()
        .then((response) => {
          this.teacherList = response.data.items;
        })
        .catch((error) => {});
    },
    //判断是保存还是更新
    saveOrUpdate() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.courseInfo.id = id;
        this.updateCourseInfo();
        this.$router.push({ path: "/course/chapter/" + id });
      } else {
        course
          .addCourse(this.courseInfo)
          .then((response) => {
            this.$message.success("添加课程信息成功");
            this.$router.push({ path: "/course/chapter/" + response.data.id });
          })
          .catch((error) => {});
      }
    },
  },
  created() {
    //判断路径中是否有课程id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      //根据课程id 查询课程基本信息
      this.init();
    } else {
      //初始化所有讲师
      this.findAllTeacher();
      //初始化一级分类
      this.getAllSubject();
    }
  },
};
</script>
<style scoped></style>
