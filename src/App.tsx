import "./App.css";
import Button from "./components/UI/Button/Button";
import Counter from "./components/UI/Counter/Counter";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Counter
        quantity={30}
        size={24}
        variant={"primary"}
        stroke={true}
        pulse={true}
      />
      <Button size={56} variant={"primary"} state={"enabled"}>
        <Button.Text text={"Что сделать"} />
        <Button.Counter quantity={10} />
      </Button>
    </div>
  );
}

export default App;
