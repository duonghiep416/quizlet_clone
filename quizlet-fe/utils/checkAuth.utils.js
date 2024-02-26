import { object, ref, string } from 'yup'
// Schema cho form đăng nhập
const loginSchema = object().shape({
  email: string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/,
      'Mật khẩu phải chứa cả chữ cái và số'
    )
})

// Schema cho form đăng ký
const registerSchema = object().shape({
  name: string().required('Vui lòng nhập tên'),
  email: string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/,
      'Mật khẩu phải chứa ít nhất một chữ cái và một số'
    ),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Mật khẩu nhập lại không khớp')
    .required('Vui lòng xác nhận mật khẩu')
})

const checkInputLogin = async (email, password) => {
  try {
    await loginSchema.validate({ email, password }, { abortEarly: false })
    return {
      status: true
    }
  } catch (error) {
    return handleErrorMessage(error)
  }
}

const checkInputRegister = async (name, email, password, confirmPassword) => {
  try {
    await registerSchema.validate(
      { name, email, password, confirmPassword },
      { abortEarly: false }
    )
    return {
      status: true
    }
  } catch (error) {
    return handleErrorMessage(error)
  }
}

const handleErrorMessage = (error) => {
  const errors = error.inner.map((e) => {
    return {
      field: e.path,
      message: e.message
    }
  })
  const result = errors.reduce((acc, cur) => {
    return { ...acc, [cur.field]: cur.message }
  }, {})
  return {
    status: false,
    errors: result
  }
}

export { checkInputLogin, checkInputRegister }
