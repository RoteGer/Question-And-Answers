export const fetchQuestions = async () => {
    const response = await fetch('/jsonapi/node/question');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // sort method:
    // If the result is negative, a comes before b.
    // If the result is positive, a comes after b.
    // If the result is zero, the order of a and b remains unchanged relative to each other.
    return data.data.sort((a, b) => a.attributes.field_order - b.attributes.field_order);
  };
  
export const fetchTopics = async () => {
    const response = await fetch('/jsonapi/taxonomy_term/tags');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
};
  