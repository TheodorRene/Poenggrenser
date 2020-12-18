import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <body>
      <h1> Poengrenser 2020 </h1>
      <FuzzySearch/>
      </body>
    </div>
  );
}
const URL ="https://poenggrenser.herokuapp.com"
//const URL ="http://localhost:5000"

const FuzzySearch = () => {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [hasMounted, setHasMounted] = useState(false)

    useEffect( () => {
        if(hasMounted) {
            fetch(`${URL}/search?q=${query}`)
                .then(res => res.json())
                .then(res => setData(res.data))
                .catch((e) => console.log(e))
        }
        else{
            setHasMounted(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query])

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
       setQuery(e.target.value)
    }

  return(
      <div>
      <input type="text" value={query} onChange={handleChange}/>
      <div>
          {data && query && data.map((item, index) => {
              return(
                  <Study studyName={item[0]} key={index} />
              )
          })}
          {!query && "Søk etter ønsket studie"}
      </div>
      </div>

  )
}

type studyProps = {
    studyName: String,
    key: number,
}

const Study = (props:studyProps) => {

    const [data, setData] = useState([])
    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        if(!isVisible){
            fetch(`${URL}/points?study=${props.studyName}`)
                .then(res => res.json())
                .then(res => setData(res.data))
        }
        setIsVisible(!isVisible)
    }

    const studyStyle = {
        color: 'grey'
    };
    const mainStudyStyle ={
        cursor: 'pointer',
        color: '#444',
    }

    const pointStyle ={
        cursor: 'pointer',
        color: '#444',
    }



    return (
        <div style={mainStudyStyle} key={props.key} onClick={handleClick}>
            {props.studyName} {!isVisible && '◄'} {isVisible &&  '▼'}
            {isVisible && data.map((item, index) => {
                let [studie, sted, poeng, type ] = item

                if(item[2] === -1.0){
                    // @ts-ignore
                    return(
                        <div key={index} style={studyStyle}>
                            {studie} {sted} N/A {type}
                        </div>
                    )
                }
                // @ts-ignore
                return(
                    <div key={index} style={studyStyle}>
                        {studie} {sted} <span style={pointStyle}>{poeng}</span> {type} 
                    </div>
                )
            })}
        </div>
    )
}

/*
 */

export default App;
