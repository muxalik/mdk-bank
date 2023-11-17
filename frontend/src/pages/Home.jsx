import React, { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/api'

const Home = () => {
  const { logout, user, login } = useAuth()

  const balanceRef = useRef()

  const amountRef = useRef()
  const personalAccountRef = useRef()

  const addBalance = () => {
    if (!balanceRef.current.value) {
      return
    }

    api
      .post('/balance/add', { balance: +balanceRef.current.value })
      .then((response) => {
        login({
          ...user,
          balance: response.data.balance,
        })
        balanceRef.current.value = ''
      })
      .catch(console.log)
  }

  const onTransfer = () => {
    if (!personalAccountRef.current.value || !amountRef.current.value) {
      return
    }

    api
      .post('/transactions/create', {
        amount: +amountRef.current.value,
        personal_account: personalAccountRef.current.value,
      })
      .then((response) => {
        login({
          ...user,
          balance: response.data.balance,
        })
        personalAccountRef.current.value = amountRef.current.value = ''
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
            <h2 className='text-xl text-center'>{user.name}</h2>
          </div>
          <div className='px-[50px]'>
            <p className='text-lg'>Лицевой счет:</p>
            <p className='text-lg mb-[15px]'>{user.personal_account}</p>
            <p className='text-lg'>Баланс:</p>
            <p className='text-lg'>{user.balance || 0}р</p>
          </div>
        </div>
        <div>
          <div>
            <p className='text-base mb-[5px]'>Пополнить баланс</p>
            <div className='flex h-[32px] gap-[24px] mb-[20px]'>
              <input
                type='number'
                className='block border h-full w-full rounded-md border-gray-300 text-base px-[12px]'
                placeholder='Введите сумму'
                ref={balanceRef}
              />
              <button
                className='rounded-md bg-blue-600 px-[12px] h-[32px] text-white'
                onClick={addBalance}
              >
                Пополнить
              </button>
            </div>
          </div>
          <div>
            <p className='text-base mb-[5px]'>Выполнить перевод</p>
            <div className='flex gap-[24px] mb-[20px] items-center'>
              <div className='flex-1'>
                <input
                  type='number'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px] mb-[10px]'
                  placeholder='Введите сумму'
                  ref={amountRef}
                />
                <input
                  type='number'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px]'
                  placeholder='Введите лицевой счет'
                  ref={personalAccountRef}
                />
              </div>
              <button
                onClick={onTransfer}
                className='rounded-md bg-blue-600 px-[12px] h-[32px] text-white'
              >
                Перевести
              </button>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              className='rounded-md bg-blue-600 px-[12px] h-[32px] text-white'
              onClick={logout}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
