
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
const ganre = [
  { id: 28, name: "action" },
  { id: 12, name: "adventure" },
  { id: 16, name: "animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "history" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "ScienceFiction" },
  { id: 10770, name: "TVMovie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
const api_key = "api_key=9b702a6b89b0278738dab62417267c49";
function App() {
  const [page, setPage] = useState(1)
  const [pageNums, setPageNums] = useState([1, page, 3, "..."])
  const [populary, setPopulary] = useState([]);
  const [ganres, setGanres] = useState([])
  const [ganrenum, setganrenum] = useState([])
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?${api_key}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setPopulary(res.results)
        if (res.total_pages) {
          let arr = page > 1 ? [page - 1] : []
          for (let i = page; i < res.total_pages; i++) {
            arr.push(i)
            if (i - page === 10) {
              break
            }
          }
          setPageNums(arr)
        }
        setGanres(ganre)
      }
      );
  }, [page]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?${api_key}&with_genres=${ganrenum}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setPopulary(res.results)
        if (res.total_pages) {
          let arr = page > 1 ? [page - 1] : []
          for (let i = page; i < res.total_pages; i++) {
            arr.push(i)
            if (i - page === 10) {
              break
            }
          }
          setPageNums(arr)
        }
      })
  }, [ganrenum, page])

  return <div className="App">
    <div className="ganres">
      {ganres.map((e, i) => {
        return <button key={i} onClick={() => {
          setganrenum(e.id)
        }}>{e.name}</button>
      })}
    </div>
    <div className="parent">
      {
        populary.map((e) => {
          return <Card films={e} key={e.id} />
        })
      }
    </div>

    <div className="pages">

      {pageNums.map((e, i) => {
        if (e >= 1) {
          return <button key={i} onClick={() => { setPage(e) }}>{e}</button>
        }

      })}
    </div>
  </div>;
}

export default App;

