<template>
  <div class="login">
      <div class="tab-wra">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm" size="medium" >
        <el-form-item  prop="email" label="活动名称">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off" id="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
           <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
         </el-form-item>
        <el-form-item  prop="code" class="code">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" id="code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" plain>发送验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="submit" >提交</el-button>
        </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
import { stripscript, username, pas } from '@/utils/validat'
export default {
  data () {
    var validateEmail = (rule, value, callback) => {
      // const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!username(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value)
      value = stripscript(value)
      // const reg = /^(?![0-9]+)(?![a−zA−Z]+)[0-9A-Za-z]{8,20}$/
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!pas(value)) {
        callback(new Error('密码必须同时包含字母和数组'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不为空'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        password: '',
        code: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { validator: validateEmail, trigger: ['blur'] }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: ['blur', 'change'] },
          { min: 6, max: 6, message: '长度为6个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
    --themeColor: #344a5f;
    background-color: var(--themeColor);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .tab-wra {
      width: 330px;
      .code {
        margin-bottom: 20px;
      }
      .submit {
        width: 100%;
      }
    }
}

</style>
