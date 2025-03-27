import { useState } from "react";
import { Input, Button, Typography, Card } from "antd";

const { Title, Text } = Typography;

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState( Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    if (attempts <= 0) return; // tránh nhập khi hết lượt

    const guessedNumber = parseInt(guess);

    if (isNaN(guessedNumber)) {
      setMessage("⚠️ Vui lòng nhập một số hợp lệ!");
      return;
    }

    if (guessedNumber < randomNumber) {
      setMessage(" Bạn đoán quá thấp!");
    } else if (guessedNumber > randomNumber) {
      setMessage(" Bạn đoán quá cao!");
    } else {
      setMessage(" Chúc mừng! Bạn đã đoán đúng!");
      return;
    }

    setAttempts(attempts - 1);

    if (attempts - 1 === 0) {
      setMessage(`❌ Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
    }

    setGuess(""); // reset ô nhập
  };

  return (
    <Card
      title="🎲 Trò chơi đoán số"
      style={{ width: 400, margin: "50px auto", textAlign: "center", }}
    >
      <Title level={4}>Dự đoán số trong khoảng từ 1 đến 100</Title>
      <Text strong>Bạn còn {attempts} lượt để đoán số.</Text>
      <br />
      <Input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Nhập số của bạn..."
        disabled={attempts === 0}
        style={{ width: "60%", marginTop: 10 }}
      />
      <br />
      <Button
        type="primary"
        onClick={handleGuess}
        disabled={attempts === 0}
        style={{ marginTop: 10 }}
      >
        Đoán
      </Button>
      <br />
      <Text type={attempts === 0 ? "danger" : "success"}>{message}</Text>
    </Card>
  );
};

export default RandomNumber;