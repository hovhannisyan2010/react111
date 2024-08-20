import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {  
  
  const [page,setPage] = useState(1)
  const [pageNums,setPageNums]=useState([1,page,3,"..."])
  const api_key = "api_key=9b702a6b89b0278738dab62417267c49";
  const [populary, setPopulary] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?${api_key}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setPopulary(res.results)
        setPageNums([res.total_pages])
      }
    );
  }, [page]);
  console.log(populary);
  return <div className="App">
    <div className="parent">
    {
      populary.map((e)=>{
        return <Card films={e} key={e.id}/>
      })
    }
    </div>
    <div className="pages">
      
      <button onClick={()=>{setPage(page-1)}}>{page-1}</button>
      <button onClick={()=>{setPage(page)}}>{page}</button>
      <button onClick={()=>{setPage(page+1)}}>{page+1}</button>
      <h1>.</h1>
      <h1>.</h1>
      <h1>.</h1>
      <button onClick={()=>{setPage(pageNums)}}>{pageNums}</button>
      

    </div>
  </div>;
}

export default App;

// let root = document.getElementById("root");
// let popularURL = "https://api.themoviedb.org/3/movie/popular?" + api_key;
