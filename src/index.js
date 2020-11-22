    
    const dogCollection = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector('#dog-info')

    
    fetch('http://localhost:3000/pups')
        .then(response => {
            return response.json()
        }).then((dogsArray) => {
            dogsArray.forEach((dogObj) => {
                renderDogSpan(dogObj)
            })
        })

    function renderDogSpan(dogObj) {
        const div = document.createElement("div")
        div.classList.add("dog-bar")
        div.dataset.id = dogObj.id
        div.innerHTML = `
            <span id="dog-name">${dogObj.name}</span>
        `
        dogCollection.append(div)
    }



dogCollection.addEventListener('click', (e) => {
    
    if (e.target.matches('span#dog-name')) {
        let div = e.target.closest('div')
        let id = div.dataset.id
        
        fetch(`http://localhost:3000/pups/${id}`)
            .then(response => {
                return response.json()
            }).then((dogObj) => {
                renderDogDiv(dogObj)
            })
        

        function renderDogDiv(dogObj) {
            dogInfo.innerHTML = ""

            const div = document.createElement("div")
            div.dataset.id = dogObj.id
            let dogStatus = ""
            
            dogStatus = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!" 
            
            div.innerHTML = `
                <img src=${dogObj.image} />
                <h2>${dogObj.name}</h2>
                <button id="is-good-dog">
                    ${dogStatus} 
                </button>
            `
            dogInfo.append(div)
        }   
    }
})

dogInfo.addEventListener('click', (e) => {
    if (e.target.matches('button#is-good-dog')) {
        let div = e.target.closest('div')
        let id = div.dataset.id
        let behaviorDisplay = div.querySelector('button')
        let newValue = behaviorDisplay.textContent === "Good Dog!" ? "Bad Dog!" : "Good Dog!"
        
        
        fetch(`http://localhost:3000/pups/${id}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               "Accept": "application/json"
            },
            body: JSON.stringify({ isGoodDog: newValue })
        })
            .then(response => {
                return response.json()
            })
            .then((dogObj) => {
                behaviorDisplay.textContent = newValue
            })
        
    }
})




