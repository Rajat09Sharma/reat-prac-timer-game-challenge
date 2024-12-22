import { forwardRef, useImperativeHandle, useRef } from "react"
import {createPortal} from "react-dom"


const ResultModal = forwardRef(function ResultModal({ targetTime, remainningTime, onReset }, ref) {

    const dialog = useRef();

    const userLost = remainningTime <= 0;
    const formattedRemainningTime = (remainningTime / 1000).toFixed(2);
    const score = Math.round((1 - remainningTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })


    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            <h2>{userLost && "You Lost!"}</h2>
            {!userLost && <h2> You Score is:{score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainningTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )
}
)
export default ResultModal;