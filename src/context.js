import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState={
  cart:cartItems,
  total:0,
  amount:0,
  isLoading:false,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)

  const remove=(id)=>{
    dispatch({type:'REMOVE_ITEM' ,payload:id})
  }
  const increase=(id)=>{
    dispatch({type:'INCREASE' ,payload:id})
  }
  const decrease=(id)=>{
    dispatch({type:'DECREASE',payload:id})
  }

  const clearCart=()=>{
    dispatch({type:'CLEAR_CART'})
  }

  const fetchData=async ()=>{
    dispatch({type:'LOADING'})
    const response=await fetch(url)
    const cart= await response.json()
    dispatch({type:'SHOW_ITEMS', payload: cart})
  }

  useEffect(() => {
    fetchData()
  }, [])

    useEffect(() => {
    dispatch({type:'TOTAL_ITEMS'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        increase,
        decrease,
        remove,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }