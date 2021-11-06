const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      let shopCart = state.cart.map((shopItem) => {
        if (shopItem.id === action.payload) {
          return { ...shopItem, amount: shopItem.amount + 1 };
        }
        return shopItem;
      });
      return { ...state, cart: shopCart };

    case "DECREASE":
      let shopCart1 = state.cart
        .map((shopItem) => {
          if (shopItem.id === action.payload) {
            return { ...shopItem, amount: shopItem.amount - 1 };
          }
          return shopItem;
        })
        .filter((shopItem) => shopItem.amount !== 0);
      return { ...state, cart: shopCart1 };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((shopItem) => shopItem.id !== action.payload),
      };

    case "LOADING":
      return { ...state, isLoading: true };

    case "SHOW_ITEMS":
      return { ...state, cart: action.payload, isLoading: false };

    case "TOTAL_ITEMS":
      let {total,amount}= state.cart.reduce((cartTotal,cartItem)=>{
          const {price,amount}=cartItem;
          const itemTotal=price*amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;

          return cartTotal
      },{
        total:0,
        amount:0, 
      })
      total = parseFloat(total.toFixed(2))
      return {...state,total,amount}

    case "CLEAR_CART":
      return { ...state, cart: [] };
  }

  throw new Error("action type not found");
};

export default reducer;
