import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveConfig } from './config/loveConfig';
import { Link } from 'react-router-dom';

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  // Fallback questions if config is empty
  const questions = loveConfig.quizQuestions?.length > 0 ? loveConfig.quizQuestions : [
    {
      question: "Where did we first meet?",
      options: ["At a Bahnhof", "At a party", "At school", "Online"],
      answer: 0
    },
    {
      question: "What is my favorite thing about you?",
      options: ["Your eyes", "Your smile", "Your laugh", "Everything"],
      answer: 3
    },
    {
      question: "What was our first movie together?",
      options: ["A horror movie", "A romantic movie", "An action movie", "A cartoon"],
      answer: 1
    }
  ];

  const handleOptionClick = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Delay before moving to next question
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setQuizFinished(true);
      }
    }, 2000); // 2 seconds to read the feedback
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] flex flex-col items-center justify-center py-24 px-4 font-quicksand relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] bg-[#f9c5d1] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-[#e8d5f2] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* HEADER */}
        {!quizFinished && !showProposal && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-[#a1445a] mb-3">
              Let's see how well you know us ❤️
            </h1>
            <p className="text-[#c76b85] font-dancing text-xl">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </motion.div>
        )}

        {/* QUIZ CARD */}
        {!quizFinished && !showProposal && (
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[40px] shadow-2xl border border-white/60"
          >
            <h2 className="font-playfair text-2xl md:text-3xl text-[#7a4b5a] text-center mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === questions[currentQuestion].answer;
                const isSelected = selectedOption === index;

                let btnClass = "bg-white border-[#f3cdd8] text-[#9e4a60] hover:bg-[#fff0f5]";
                if (isAnswered) {
                  if (isCorrect) btnClass = "bg-green-100 border-green-400 text-green-700 shadow-[0_0_15px_rgba(74,222,128,0.4)]";
                  else if (isSelected && !isCorrect) btnClass = "bg-red-100 border-red-400 text-red-700";
                  else btnClass = "bg-white border-gray-200 text-gray-400 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                    className={`w-full text-left px-6 py-4 rounded-2xl border-2 font-semibold text-lg transition-all duration-300 ${btnClass} ${!isAnswered && 'hover:scale-[1.02] active:scale-[0.98] shadow-sm'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {isAnswered && isCorrect && <span className="text-xl">❤️</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            <div className="h-10 mt-6 text-center">
              <AnimatePresence>
                {isAnswered && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`font-bold text-lg ${selectedOption === questions[currentQuestion].answer ? 'text-green-600' : 'text-[#c76b85]'}`}
                  >
                    {selectedOption === questions[currentQuestion].answer 
                      ? "Of course you remembered! ❤️" 
                      : "Almost! 😜 You'll get the next one."}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* QUIZ FINISHED - TRANSITION */}
        {quizFinished && !showProposal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-[40px] shadow-2xl border border-white/60 text-center"
          >
            <div className="text-6xl mb-6 animate-bounce">🏆</div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#a1445a] mb-4">
              ❤️ You passed the girlfriend test!
            </h2>
            <p className="text-[#c76b85] font-dancing text-2xl mb-8">
              You scored {score} out of {questions.length}. I knew you were the one.
            </p>
            
            <div className="mt-8 pt-8 border-t border-[#f3cdd8]">
              <h3 className="text-[#7a4b5a] text-xl font-semibold mb-6 animate-pulse">
                But there is one final question...
              </h3>
              <button
                onClick={() => setShowProposal(true)}
                className="bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_25px_-8px_#b15b73] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                See the final question 💌
              </button>
            </div>
          </motion.div>
        )}

        {/* FINAL PROPOSAL */}
        {showProposal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/90 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-[0_30px_60px_-20px_rgba(180,120,140,0.5)] border border-white/60 text-center relative overflow-hidden"
          >
            {/* Floating hearts inside proposal */}
            <div className="absolute top-4 left-4 text-4xl opacity-20 animate-ping">❤️</div>
            <div className="absolute bottom-8 right-8 text-4xl opacity-20 animate-ping delay-300">💖</div>

            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-[#a1445a] mb-6">
              Will you be my Valentine...<br/> forever?
            </h2>
            <p className="font-dancing text-2xl md:text-3xl text-[#c76b85] mb-10">
              I already know the answer, but I wanted to ask anyway. 🥰
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={() => setShowProposal(false)} // Just in case she clicks no, we loop back playfully
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-[#f3cdd8] text-[#9e4a60] hover:bg-[#fff0f5] transition-all"
              >
                Yes, forever 💍
              </button>
            </div>

            <div className="mt-10">
             <Link 
  to="/transition" 
  className="inline-block mt-6 bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_25px_-8px_#b15b73] hover:scale-105 active:scale-95 transition-all duration-300"
>
  Proceed to the Final Question ❤️
</Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default LoveQuiz;