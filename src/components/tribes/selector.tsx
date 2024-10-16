"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { questions, Tribe, tribesInfo } from "@/lib/types";


export default function Selector({ userId }: { userId: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<Tribe | null>(null);
  const [fade, setFade] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Shuffle options once on the client side
  useEffect(() => {
    questions.forEach((question) => {
      question.options = shuffleOptions(question.options);
    });
  }, []);

  const handleOptionClick = (value: string) => {
    setFade(true);

    setTimeout(() => {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: value,
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateResult();
      }

      setFade(false);
    }, 500);
  };

  const calculateResult = () => {
    const tribeCounts: { [key in Tribe]: number } = {
      Ateredes: 0,
      Covenant: 0,
      Thunderbolt: 0,
      Gryffindor: 0,
      Fraternity: 0,
      Hunted: 0,
      Highness: 0,
      Jedi: 0,
    };

    Object.keys(answers).forEach((key) => {
      const answerValue = answers[parseInt(key)];
      const tribe = currentQuestion.mapping[answerValue];
      tribeCounts[tribe]++;
    });

    const resultTribe = Object.keys(tribeCounts).reduce((a, b) =>
      tribeCounts[a as Tribe] > tribeCounts[b as Tribe] ? a : b,
    ) as Tribe;

    setResult(resultTribe);
  };

  const shuffleOptions = (options: { label: string; value: string }[]) => {
    return [...options].sort(() => Math.random() - 0.5);
  };

  if (!quizStarted) {
    return (
      <Card
        className={
          "flex w-full flex-col items-center justify-center p-1 pt-3 text-center"
        }
      >
        <h2 className="mb-4 text-3xl font-bold">{`Hol'up, champion!`}</h2>
        <h2 className="mb-4 text-xl font-bold">{`Doing things are easy, but the what happens next might not`}</h2>
        <ul className="">
          <li className="m-2">{`Go with your gut. The weirder the answer, the better!`}</li>
          <li className="m-2">{`Choose what speaks to you, not what sounds cool.`}</li>
          <li className="m-2">{`This is all about fun. Don't stress—just enjoy the ride!`}</li>
          <li className="m-2">{`Once you pick, no take-backs. Trust your instincts!`}</li>
          <li className="m-2">{`This might be life threatning. You're might be at the gunpoint`}</li>
        </ul>
        <p className="my-2 mt-4">Ready to find your tribe?</p>
        <Button
          onClick={startQuiz}
          className="w-full rounded-b-[10px] rounded-t-[3px] text-xl font-bold"
        >
          Go
        </Button>
      </Card>
    );
  }

  if (result) {
    return (
      <div
        className={`flex flex-col items-center justify-center transition-opacity duration-100 ${fade ? "opacity-0" : "opacity-100"}`}
      >
        <Result resultTribe={result} userId={userId} />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center text-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
    >
      <h2 className="mb-4 text-5xl font-bold">{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option.value}>
            <Button
              onClick={() => handleOptionClick(option.value)}
              variant="ghost"
            >
              {option.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Result = ({
  resultTribe,
  userId,
}: {
  resultTribe: string;
  userId: string;
}) => {
  const [countdown, setCountdown] = useState(5);
  const [showTribe, setShowTribe] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-in");

  useEffect(() => {
    if (countdown === 1) {
      setAnimationClass("fade-out");
      const timer = setTimeout(() => {
        setShowTribe(true);
        setAnimationClass("fade-in");
      }, 500); // Duration matches the fade-out animation
      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setAnimationClass("fade-out");
      const timeout = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        setAnimationClass("fade-in");
      }, 500); // Duration matches the fade-out animation
      return () => clearTimeout(timeout);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (showTribe) {
      const updateTribe = async () => {
        try {
          const response = await fetch(`/api/users/${userId}/tribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tribe: resultTribe }),
          });

          if (!response.ok) {
            console.error("Failed to update tribe");
          }
        } catch (error) {
          console.error("Error updating tribe:", error);
        }
      };

      updateTribe();
    }
  }, [showTribe, resultTribe, userId]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      {!showTribe ? (
        <>
          {`Changing you'r world in`}
          <div className={`font-bold ${animationClass} text-9xl`}>
            {countdown}
          </div>
        </>
      ) : (
        <div className={animationClass}>
          <h2 className="text-3xl font-bold">Your Tribe is {resultTribe}</h2>
          <p>{tribesInfo[resultTribe]}</p>
        </div>
      )}
    </div>
  );
};

