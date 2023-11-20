import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/api'

const AdminHome = () => {
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState([])

  const userRef = useRef()
  const accountRef = useRef()
  const balanceRef = useRef()
  const passwordRef = useRef()

  const amountRef = useRef()
  const personalAccountRef = useRef()

  const onUserAdd = () => {
    if (
      !userRef.current.value ||
      !accountRef.current.value ||
      !passwordRef.current.value
    ) {
      return
    }

    api
      .post('/users/create', {
        token: user.token,
        name: userRef.current.value,
        password: passwordRef.current.value,
        personal_account: accountRef.current.value,
        balance: +balanceRef.current.value,
      })
      .then(() => {
        userRef.current.value =
          passwordRef.current.value =
          accountRef.current.value =
          balanceRef.current.value =
            ''
      })
      .catch(console.log())
  }

  const onSubmit = () => {
    if (!personalAccountRef.current.value || !amountRef.current.value) {
      return
    }

    api
      .post('/balance/add', {
        balance: amountRef.current.value,
        personal_account: personalAccountRef.current.value,
      })
      .then(() => {
        personalAccountRef.current.value = amountRef.current.value = ''
      })
      .catch(console.log)
  }

  useEffect(() => {
    api
      .get('transactions')
      .then((response) => {
        setTransactions(response.data)
      })
      .catch(console.log)
  }, [])

  return (
    <div className='w-full min-h-screen flex justify-center items-center p-[30px] gap-[50px]'>
      <div className='rounded-[12px] border border-gray-200 shadow-md py-[30px] px-[20px]'>
        <div className='flex flex-col items-center mb-[20px]'>
          <img
            src='./user.svg'
            alt='User Avatar'
            className='mb-[20px] w-[100px] h-[100px]'
          />
          <h2 className='text-xl text-center'>{user.name}</h2>
        </div>
        <div>
          <div>
            <p className='text-base mb-[5px]'>Добавить пользователя</p>
            <div className='flex gap-[24px] mb-[20px] items-center'>
              <div className='flex-1'>
                <input
                  type='text'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px] mb-[10px]'
                  placeholder='Введите имя'
                  ref={userRef}
                />
                <input
                  type='text'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px] mb-[10px]'
                  placeholder='Введите пароль'
                  ref={passwordRef}
                />
                <input
                  type='text'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px] mb-[10px]'
                  placeholder='Введите лицевой счет'
                  ref={accountRef}
                />
                <input
                  type='number'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px]'
                  placeholder='Введите баланс'
                  ref={balanceRef}
                />
              </div>
              <button
                className='rounded-md bg-blue-600 px-[12px] h-[32px] text-white'
                onClick={onUserAdd}
              >
                Добавить
              </button>
            </div>
          </div>
          <div>
            <p className='text-base mb-[5px]'>Пополнить баланс пользователя</p>
            <div className='flex gap-[24px] mb-[20px] items-center'>
              <div className='flex-1'>
                <input
                  type='number'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px] mb-[10px]'
                  placeholder='Введите сумму'
                  ref={amountRef}
                />
                <input
                  type='text'
                  className='block border h-[32px] w-full rounded-md border-gray-300 text-base px-[12px]'
                  placeholder='Введите лицевой счет'
                  ref={personalAccountRef}
                />
              </div>
              <button
                className='rounded-md bg-blue-600 px-[12px] h-[32px] text-white'
                onClick={onSubmit}
              >
                Пополнить
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
      {transactions.length !== 0 && (
        <div className='rounded-[12px] border border-gray-200 shadow-md py-[30px] px-[20px]'>
          <ul className='space-y-[15px]'>
            {transactions?.map((transaction) => (
              <li
                key={transaction.id}
                className='flex gap-[20px] justify-between'
              >
                <div>
                  <p>
                    Отправитель: {transaction.from.name}, (
                    {transaction.from.personal_account})
                  </p>
                  <p>
                    Получатель: {transaction.to.name}, (
                    {transaction.to.personal_account})
                  </p>
                  <p>Сумма: {transaction.amount}р</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AdminHome
