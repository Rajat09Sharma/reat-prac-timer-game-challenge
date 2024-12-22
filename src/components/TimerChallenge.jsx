import { useRef, useState } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemainning, setTimeRemainning] = useState(targetTime * 1000);
  
  const timer = useRef();
  const dialogRef = useRef();

  const timerStarted = timeRemainning > 0 && timeRemainning < targetTime * 1000;

  if(timeRemainning<=0){
    clearInterval(timer.current);
    dialogRef.current.open();
  }


  function handleStartTImer() {
    timer.current = setInterval(() => {
      setTimeRemainning(prevsTime => prevsTime - 10);
    }, 10);
  }

  function handleStopTimer() {
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  function handleReset(){
    setTimeRemainning(targetTime*1000);
  }

  return (
    <>
      <ResultModal ref={dialogRef} remainningTime={timeRemainning} targetTime={targetTime} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : " "}
        </p>
        <p>
          <button onClick={timerStarted ? handleStopTimer : handleStartTImer}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "TIme is running" : "Timer inactive"}
        </p>
      </section>
    </>
  )
}
