<template>
  <div class="login">
      <div class="login-wrap">
        <ul class="menu-tab">
          <li v-for="item in menu" :key="item.id" :class="{'current':item.isCurrent}" @click="toggleMenu(item)">{{item.text}}</li>
        </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="info-ruleForm" size="medium" >
          <el-form-item label="邮箱" prop="username" >
            <el-input type="text" v-model="ruleForm.username" autocomplete="off" id="username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password"  >
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="12"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" class="code">
            <label for="code">验证码</label>
            <el-row :gutter="10">
              <el-col :span="15"><el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
              <el-col :span="9"><el-button type="success" plain  class="block">获取验证码</el-button></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import { valiUsername, valiPass, valiCode, stripscript } from '@/utils/validates'
export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!valiUsername(value)) {
        callback(new Error('用户名邮箱格式不正确'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!valiPass(value)) {
        callback(new Error('密码为6-12位的字母+数字组合'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      value = stripscript(value)
      this.ruleForm.code = value
      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (!valiCode(value)) {
        setTimeout(() => {
          callback(new Error('验证码格式有误'))
        }, 1000)
      } else {
        callback()
      }
    }
    return {
      menu: [
        {
          id: 0,
          text: '登录',
          isCurrent: true
        },
        {
          id: 1,
          text: '注册',
          isCurrent: false
        }
      ],
      ruleForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateName, trigger: ['blur', 'change'] }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    toggleMenu (item) {
      // 将item传进来
      this.menu.forEach(e => {
        // 将所有的都变为false
        e.isCurrent = false
      })
      item.isCurrent = true
    },
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
    justify-content: center;
    align-items: center;
    .login-wrap {
      width: 330px;
      .menu-tab {
        margin: auto;
        text-align: center;
        margin-bottom: 40px;
        li {
          width: 88px;
          height: 36px;
          line-height: 36px;
          border-radius: 2px;
          display: inline-block;
          cursor: pointer;
          color: #fff;
          margin-right: 10px;
          &.current {
            background-color: rgba(0,0,0,.1);
          }
        }
      }
      .info-ruleForm {
        .block {
          // display: block;
          width: 100%
        }
        .code {
          margin-bottom: 32px;
        }
      }
    }
}

</style>
