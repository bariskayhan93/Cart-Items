const reducer = (state, action) => {

    switch(action.type){
        case 'INCREASE':
           let shopCart=state.cart.map((shopItem)=>{
               if(shopItem.id===action.payload.id){
                   return {...shopItem, amount: shopItem.amount+1}
               }
               return shopItem
           })
           return {...state, shopCart}

        case 'DECREASE':
           let shopCart1=state.cart.map((shopItem)=>{
                if(shopItem.id===action.payload.id){
                    return {...shopItem, amount: shopItem.amount-1}
                }
                return shopItem
            })
            .filter((shopItem) => shopItem.amount !== 0)
            return { ...state, cart: shopCart1 }

            case 'REMOVE_ITEM': 
                return {
                  ...state,
                  cart: state.cart.filter((shopItem) => shopItem.id !== action.payload),
                }
              
            
        case 'LOADING':
            return {...state, isLoading:true}

        case 'SHOW_ITEMS':
        return {...state,cart:action.payload, isLoading:false}
    }

    throw new Error('action type not found')

};

export default reducer;
