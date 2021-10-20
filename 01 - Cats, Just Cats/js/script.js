const API = {
    url: "https://api.thecatapi.com/v1/breeds",
    res: [],
    async fetchData() {
        const data = await fetch(this.url)
        this.res = await data.json()
    }
}

const DOM = {
    update(cat) {
        const catInfo = {
            Name: cat.name,
            Alt_Names: cat.alt_names,
            Description: cat.description,
            Origin: cat.origin,
            Temperament: cat.temperament,
            Weight: cat.weight.metric + ' kg',
            Life_Span: cat.life_span + ' years',
            Adaptability: cat.adaptability,
            Affection_Level: cat.affection_level,
            Child_Friendly: cat.child_friendly,
            Dog_Friendly: cat.dog_friendly,
            Stranger_Friendly: cat.stranger_friendly,
            Energy_Level: cat.energy_level,
            Intelligence: cat.intelligence,
            Social_Needs: cat.social_needs,
        }

        const imgContainer = document.querySelector('.content .image')
        const infoList = document.querySelector('.content .info .infoList')

        imgContainer.innerHTML = null
        infoList.innerHTML = null
        
        if ('image' in cat) {
            const img = document.createElement('img')
            img.src = cat.image.url
            img.alt = `${cat.name} breed cat image.`
            imgContainer.appendChild(img)
        }

        Object.keys(catInfo).map((key) => {
            const li = document.createElement('li')
            const strong = document.createElement('strong')

            if (catInfo[key]) {
                strong.innerHTML = key.replaceAll('_', ' ') + ": "
                li.appendChild(strong)
                li.innerHTML += catInfo[key]
        
                infoList.appendChild(li)
            }
        })
    }
}

const App = {
    async init() {
        await API.fetchData()
        this.updateCat()
    },

    updateCat() {
        DOM.update(this.getRandomCat())
    },

    getRandomCat() {
        const randInt = Math.floor(Math.random() * API.res.length)
        return API.res[randInt]
    }
}

App.init()