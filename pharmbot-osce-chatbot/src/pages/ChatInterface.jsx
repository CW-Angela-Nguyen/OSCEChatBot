
import { useEffect, useState } from "react";
import { getBotReply } from "../chatAPI";

function ChatInterface() {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load selected case from localStorage
  useEffect(() => {
    const selectedCase = JSON.parse(localStorage.getItem("selectedCase"));
    if (selectedCase) {
      const systemPrompt = {
        role: "system",
        content: \`You are a patient in a pharmacy OSCE simulation. Your presenting complaint is: "\${selectedCase.casePrompt}". Respond like a real patient.\`
      };
      const initialMessage = {
        role: "assistant",
        content: selectedCase.casePrompt
      };
      setChatLog([systemPrompt, initialMessage]);
    }
  }, []);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const updatedChat = [...chatLog, { role: "user", content: userInput }];
    setChatLog(updatedChat);
    setIsLoading(true);
    setUserInput("");

    const reply = await getBotReply(updatedChat);
    setChatLog([...updatedChat, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">OSCE Chat</h2>
      <div className="border p-4 h-96 overflow-y-auto bg-gray-50 rounded">
        {chatLog.filter(msg => msg.role !== "system").map((msg, index) => (
          <div
            key={index}
            className={\`my-2 p-2 rounded \${msg.role === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"}\`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-400 italic">Typing...</div>}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 border p-2 rounded mr-2"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
