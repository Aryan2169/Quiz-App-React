import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data } from '../assets/Assets/data';

const Quiz = () => {
    const savedIndex = localStorage.getItem('quizIndex') || 0;
    const savedScore = localStorage.getItem('quizScore') || 0;

    const [index, setIndex] = useState(parseInt(savedIndex) || 0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(parseInt(savedScore) || 0);
    const [result, setResult] = useState(localStorage.getItem('quizCompleted') === 'true');

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);
    const option_array = [Option1, Option2, Option3, Option4];

    useEffect(() => {
        localStorage.setItem('quizIndex', index);
        localStorage.setItem('quizScore', score);
    }, [index, score]);

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add('correct');
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                localStorage.setItem('quizCompleted', 'true');
                return 0;
            }

            setIndex(prevIndex => prevIndex + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_array.forEach((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        localStorage.removeItem('quizCompleted');
    }

    return (
        <div className='container'>
            {result ? (
                <div className='result'>
                    <h1>Results:</h1>
                    <h2 className='score'>Your scored {score} out of {data.length}</h2>
                    <button onClick={reset} className='reset'>
                        Reset
                    </button>
                </div>
            ) : (
                <>
                    <h1>Quiz App</h1>
                    <hr />
                    <h2>{index + 1}.{question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    );
}

export default Quiz;
