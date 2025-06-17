import Graph from "./components/Graph.jsx";
import Input from "./components/Input.jsx";
import Navbar from "./components/Navbar.jsx";
import { DataContextProvider } from "./DataContext.jsx";

function App() {

  return (
    <>
    <DataContextProvider>
      <Navbar />
      <div className="container mx-auto pb-20">
        <Input />
        <Graph />
      </div>
    </DataContextProvider>
    </>
  )
}

export default App
