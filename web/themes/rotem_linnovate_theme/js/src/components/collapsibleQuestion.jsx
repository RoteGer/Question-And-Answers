import React from 'react';

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

export default CollapsibleQuestion;
