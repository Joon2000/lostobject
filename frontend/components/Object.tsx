import { createActor, storage } from "../../src/declarations/storage";
import React, { useState } from 'react';


const Object = ({id:id}) => {
  // 폼 데이터를 관리할 상태
  const [input, setInput] = useState("");

  // 텍스트 에어리어 값이 변경될 때 호출되는 핸들러
  const handleChange = (e) => {
    setInput(e.target.value)
  };

  // 폼을 제출할 때 호출되는 핸들러df
  const handleSubmit = async (e) => {
    e.preventDefault();

    // await storage.store(id, input)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">텍스트:</label>
        <textarea
          id="text"
          name="text"
          value={input}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Object;