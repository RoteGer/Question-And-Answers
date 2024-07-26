import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// Component for displaying questions and topics
const Questions = () => {
  // State hooks for managing data and UI state
  const [questions, setQuestions] = useState([]); // Stores the list of questions
  const [topics, setTopics] = useState([]); // Stores the list of topics
  const [selectedTopic, setSelectedTopic] = useState(null); // Stores the currently selected topic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openQuestionId, setOpenQuestionId] = useState(null); // Stores the ID of the open question

  // Effect hook to fetch questions and topics when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/jsonapi/node/question');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the response data as JSON
        const sortedQuestions = data.data.sort((a, b) => a.attributes.field_order - b.attributes.field_order); // Sort questions by field_order
        setQuestions(sortedQuestions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await fetch('/jsonapi/taxonomy_term/tags'); // Fetch topics from the API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the response data as JSON
        setTopics(data.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchQuestions();
    fetchTopics();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Memoized function to get questions filtered by the selected topic
  const getFilteredQuestions = useCallback(() => {
    if (selectedTopic) {
      return questions.filter(question =>
        question.relationships.field_tags.data.some(tag => tag.id === selectedTopic) // Filter questions based on the selected topic
      );
    }
    return []; // Return an empty array if no topic is selected
  }, [questions, selectedTopic]); // Dependencies

  const filteredQuestions = getFilteredQuestions();

  // Function to handle opening/closing a question
  const handleQuestionClick = (questionId) => {
    setOpenQuestionId(prevOpenQuestionId => prevOpenQuestionId === questionId ? null : questionId);
  };

  // Render loading
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

// Component for displaying a single collapsible question
const CollapsibleQuestion = ({ question, isOpen, onClick }) => {
  return (
    <li className="question-item">
      <div className="question-title" onClick={onClick}>
        <h2>{question.attributes.title}</h2>
      </div>
      {isOpen && (
        <div className="question-content">
          {question.attributes.field_answer_body && (
            <div>
              <p>{question.attributes.field_answer_body}</p>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

// Render the Questions component to the DOM
const container = document.getElementById('react-app');
const root = createRoot(container);

root.render(<Questions />);
