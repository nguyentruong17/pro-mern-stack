import React from 'react';

const IssueAdd = ({ onAddIssue }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due_at: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };

    onAddIssue(issue);
    
    form.owner.value = "";
    form.title.value = "";
  };

  return (
    <form name="issueAdd" onSubmit={handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" />
      <input type="text" name="title" placeholder="Title" />
      <button>Add</button>
    </form>
  );
};

export default IssueAdd;
