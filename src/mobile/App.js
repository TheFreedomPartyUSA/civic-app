import { Text, View, Button } from "react-native";
import { useState } from "react";

export default function App() {
  const [answer, setAnswer] = useState("");

  async function ask() {
    const res = await fetch("http://YOUR_IP:3000/api/ask", {
      method: "POST",
      body: JSON.stringify({ question: "Do I need a lawyer?" }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <View style={{ padding: 40 }}>
      <Text>Know Your Rights</Text>

      <Button title="Ask AI" onPress={ask} />

      <Text>{answer}</Text>
    </View>
  );
}