<template>
  <div class="login">
    <div class="login-item">
      <p>ELADMIN 后台管理系统</p>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" :prefix-icon="Briefcase" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="ruleForm.code"
            :prefix-icon="CircleCheckFilled"
            style="width: 65%; margin-right: 20px"
          ></el-input>
          <img :src="base64Img" alt="" style="width: 30%; height: 45px" @click="getCode" />
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox value="Remember me" name="type">记住我</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { UserFilled, Briefcase, CircleCheckFilled } from '@element-plus/icons-vue'
import { getCodeApi } from '../../api'
interface RuleForm {
  username: string
  password: string
  code: string
  type: string[]
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  code: '',
  type: []
})

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

//请求验证码
const base64Img = ref('')
const getCode = () => {
  getCodeApi({}).then((res) => {
    base64Img.value = res.data.img
    // console.log(base64Img.value)
  })
}
getCode()
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url(https://eladmin.vip/demo/static/img/background.4a692a58.jpeg);
  background-size: 100% 100%;
  overflow: hidden;
  .login-item {
    width: 500px;
    height: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin: 200px auto;
    p {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: bolder;
      color: #666;
    }
    :deep(.el-input) {
      height: 45px;
    }
    :deep(.el-button) {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
