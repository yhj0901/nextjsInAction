'use client';

import React, { useState, useEffect } from 'react';

const questions = [
  '당신의 이름은 무엇인가요?',
  '현재 나이는 어떻게 되시나요?',
  '어떤 직업에 종사하고 계신가요?',
  '가장 좋아하는 취미는 무엇인가요?',
  '일주일에 운동을 몇 번 하시나요?',
  '가장 좋아하는 음식은 무엇인가요?',
  '최근에 읽은 책 중 가장 인상 깊었던 책은?',
  '스트레스 해소 방법은 무엇인가요?',
  '향후 5년 후의 목표는 무엇인가요?',
  '이 설문에 참여한 소감을 말씀해주세요.',
];

export default function SurveyForm() {
  const [page, setPage] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [currentResponses, setCurrentResponses] = useState(['', '']);

  useEffect(() => {
    if (
      currentResponses[0] &&
      currentResponses[1] &&
      page < Math.floor(questions.length / 2) - 1
    ) {
      const timer = setTimeout(() => {
        setPage(page + 1);
        setCurrentResponses(['', '']);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentResponses, page]);

  useEffect(() => {
    setResponses((prev) => {
      const newResponses = [...prev];
      newResponses[page * 2] = currentResponses[0];
      newResponses[page * 2 + 1] = currentResponses[1];
      return newResponses;
    });
  }, [currentResponses, page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey responses:', responses);
    alert('설문이 제출되었습니다. 감사합니다!');
    // 모든 질문에 대한 답변 초기화
    setCurrentResponses(['', '']);
    // 초기 1번질문으로 돌아가기
    setPage(0);
  };

  const progress = ((page + 1) / Math.ceil(questions.length / 2)) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">설문조사</h1>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {Math.round(progress)}% 완료
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                {[0, 1].map((i) => {
                  const questionIndex = page * 2 + i;
                  return questionIndex < questions.length ? (
                    <div key={questionIndex} className="relative">
                      <label
                        htmlFor={`question-${questionIndex}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {questions[questionIndex]}
                      </label>
                      <input
                        id={`question-${questionIndex}`}
                        type="text"
                        value={currentResponses[i]}
                        onChange={(e) => {
                          const newResponses = [...currentResponses];
                          newResponses[i] = e.target.value;
                          setCurrentResponses(newResponses);
                        }}
                        required
                        aria-required="true"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder={questions[questionIndex]}
                      />
                    </div>
                  ) : null;
                })}
                <div className="relative pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (page > 0) {
                        setPage(page - 1);
                        setCurrentResponses([
                          responses[page * 2 - 2],
                          responses[page * 2 - 1],
                        ]);
                      }
                    }}
                    disabled={page === 0}
                    className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 disabled:opacity-50"
                  >
                    이전
                  </button>
                  {page === Math.floor(questions.length / 2) - 1 ? (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                      제출
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (page < Math.floor(questions.length / 2) - 1) {
                          setPage(page + 1);
                          setCurrentResponses(['', '']);
                        }
                      }}
                      disabled={!currentResponses[0] || !currentResponses[1]}
                      className="bg-blue-500 text-white rounded-md px-4 py-2 disabled:opacity-50"
                    >
                      다음
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
