const URL ="https://poenggrenser.herokuapp.com"

function node(id){
    return document.getElementById(id)
}

function handleKeyUp(e){
    var x = document.getElementById("inputfield");
    const query = x.value
    if (query == ""){
        answers.innerHTML = ""
    } else {
        fetch(`${URL}/search?q=${query}`)
            .then(res => res.json())
            .then(res => handleNewData(res.data))
            .catch((e) => console.log(e))
    }
}

function handleNewData(data){
    var div = document.getElementById("answers")
    div.innerHTML = '';
    data.forEach(handleSingleStudy(div))
}

function handleSingleStudy(div){
    return (study) => {
        const [study_name, _] = study
        var wrapper = document.createElement("div");
        wrapper.className = "study-wrapper"

        var btn = document.createElement("button");
        btn.className = "studyBtn"
        btn.onclick = handleClick
        btn.innerHTML = "◄"
        btn.dataset.study_name=study_name


        var study_type_title = document.createElement("h3")
        study_type_title.innerHTML = study_name

        var button_title_wrapper = document.createElement("div");
        button_title_wrapper.className = "button-title"

        var result_wrapper = document.createElement("div");
        result_wrapper.className = "result-wrapper"
        result_wrapper.id = study_name + "-wrapper"

        button_title_wrapper.appendChild(btn)
        button_title_wrapper.appendChild(study_type_title)

        wrapper.appendChild(button_title_wrapper)
        wrapper.appendChild(result_wrapper)

        div.appendChild(wrapper)
    }
}

function handleClick(){
    if (this.innerHTML === "▼"){
        this.innerHTML = "◄"
        var study_wrapper = node(this.dataset.study_name+"-wrapper")
        study_wrapper.innerHTML = ""
    } else {
        this.innerHTML = "▼"
        fetch(`${URL}/points?study=${this.dataset.study_name}`)
            .then(res => res.json())
            .then(res => handleStudyResult(res.data, this.dataset.study_name))
    }
}

function handleStudyResult(studies_result, study_name){
    var study_wrapper = node(study_name+"-wrapper")
    study_wrapper.innerHTML = ""
    studies_result.forEach( result => {
        let [studie, sted, poeng, type ] = result

        var result = document.createElement("p")
        result.innerHTML = `${studie} ${sted} ${poeng} ${type}`

        study_wrapper.appendChild(result)
    })
}
