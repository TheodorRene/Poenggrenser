import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <body>
      <h1> Poengrenser 2019 </h1>
      <FuzzySearch/>
      </body>
    </div>
  );
}
const URL ="https://poengrenser.theodorc.no"
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



    return (
        <div style={mainStudyStyle} key={props.key} onClick={handleClick}>
            {props.studyName} {!isVisible && '◄'} {isVisible &&  '▼'}
            {isVisible && data.map((item, index) => {
                if(item[2] === -1.0){
                    return(
                        <div key={index} style={studyStyle}>
                            {item[0]} {item[1]} N/A {item[3]}
                        </div>
                    )
                }
                return(
                    <div key={index} style={studyStyle}>
                        {item[0]} {item[1]} {item[2]} {item[3]}
                    </div>
                )
            })}
        </div>
    )
}

/*
 */

export default App;
