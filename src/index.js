
document.addEventListener("DOMContentLoaded", () => {
    
    const dogCollection = document.querySelector("#dog-bar")
    
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
})

const dogCollection = document.querySelector("#dog-bar")
const dogInfo = document.querySelector('#dog-info')

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
            const div = document.createElement("div")
            div.classList.add("dog-info")
            div.dataset.id = dogObj.id 
            div.innerHTML = `
                <img src=${dogObj.image} />
                <h2>${dogObj.name}</h2>
                <button id="is-good-dog">
                    ${dogObj.isGoodDog} 
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
        console.log(id)
    }

    fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            
        }


    })

})

