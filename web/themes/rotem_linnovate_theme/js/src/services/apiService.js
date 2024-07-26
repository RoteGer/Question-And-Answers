export const fetchQuestions = async () => {
    const response = await fetch('/jsonapi/node/question');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
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
  