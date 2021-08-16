const URL ="https://poenggrenser.herokuapp.com"

function handleKeyUp(e){
    var x = document.getElementById("inputfield");
    const query = x.value
    fetch(`${URL}/search?q=${query}`)
        .then(res => res.json())
        .then(res => handleNewData(res.data))
        .catch((e) => console.log(e))
}

function handleNewData(data){
    var div = document.getElementById("answers")
    div.innerHTML = '';
    data.forEach(handleSingleStudy(div))
}

function handleSingleStudy(div){
    return (study) => {
        var btn = document.createElement("button");
        btn.className = "studyBtn"
        btn.onclick = handleClick
        console.log(study)
        btn.innerHTML = study[0]
        div.appendChild(btn)
    }
}

function handleClick(e){
    console.log(this)
}
