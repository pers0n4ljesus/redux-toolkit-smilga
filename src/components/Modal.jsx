import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your cart?</h4>
        <button 
          className="btn confirm-btn"
          onClick={() => {
            dispatch(clearCart());
            dispatch(closeModal());
          }}>confirm</button>
        <button 
          className="btn clear-btn"
          onClick={() => dispatch(closeModal())}>cancel</button>
      </div>
    </aside>
  )
}
