import React, { useRef } from 'react'
import api from '../utils/api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const nameRef = useRef()
  const passwordRef = useRef()
  const auth = useAuth()
  const navigate = useNavigate()

  const onSubmit = () => {
    if (!nameRef.current.value || !passwordRef.current.value) {
      return false
    }

    api
      .post('login', {
        name: nameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        auth.login(response.data)
        navigate('/')
      })
      .catch(console.log)
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center p-[30px]'>
      <div className='rounded-[12px] border border-gray-200 shadow-md py-[30px] px-[20px]'>
        <div className='flex mb-[20px]'>
          <div className='flex flex-col items-center'>
            <img
              src='./user.svg'
              alt='User Avatar'
              className='mb-[20px] w-[100px] h-[100px]'
            />
            <h2 className='text-xl text-center'>Авторизация</h2>
          </div>
          <div className='px-[30px] min-w-[300px]'>
            <div className='flex h-[32px] gap-[24px] mb-[20px]'>
              <input
                ref={nameRef}
                type='text'
                className='block border h-full w-full rounded-md border-gray-300 text-base px-[12px]'
                placeholder='Введите имя'
              />
            </div>
            <div className='flex h-[32px] gap-[24px] mb-[20px]'>
              <input
                ref={passwordRef}
                type='text'
                className='block border h-full w-full rounded-md border-gray-300 text-base px-[12px]'
                placeholder='Введите пароль'
              />
            </div>
            <button
              className='rounded-md w-full bg-blue-600 px-[12px] h-[32px] text-white'
              onClick={onSubmit}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
