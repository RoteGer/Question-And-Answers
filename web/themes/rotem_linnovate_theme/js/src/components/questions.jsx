import React, { useState, useEffect, useCallback } from 'react';
import { fetchQuestions, fetchTopics } from '../services/apiService';
import CollapsibleQuestion from './CollapsibleQuestion';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openQuestionId, setOpenQuestionId] = useState(null);

  useEffect(() => {
    const getQuestionsAndTopics = async () => {
      try {
        const questionsData = await fetchQuestions();
        setQuestions(questionsData);
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getQuestionsAndTopics();
  }, []);

  const getFilteredQuestions = useCallback(() => {
    if (selectedTopic) {
      return questions.filter(question =>
        question.relationships.field_tags.data.some(tag => tag.id === selectedTopic)
      );
    }
    return [];
  }, [questions, selectedTopic]);

  const filteredQuestions = getFilteredQuestions();

  const handleQuestionClick = (questionId) => {
    setOpenQuestionId(prevOpenQuestionId => prevOpenQuestionId === questionId ? null : questionId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="app-container">
      <div className="topics-container">
        {topics.map(topic => (
          <div
            key={topic.id}
            className={`topic-box ${selectedTopic === topic.id ? 'selected' : ''}`}
            onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
          >
            {topic.attributes.name}
          </div>
        ))}
      </div>
      {selectedTopic && (
        <ul className="questions-container">
          {filteredQuestions.map(question => (
            <CollapsibleQuestion
              key={question.id}
              question={question}
              isOpen={question.id === openQuestionId}
              onClick={() => handleQuestionClick(question.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Questions;
