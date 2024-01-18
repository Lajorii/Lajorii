let Gutta = ["Alex", "Axel", "Benny", "Birk", "Ian", "Jonas", "Kasper", "Magnus", "Marius", "Ola", "Oliver", "Oscar", "Peder", "Pelle", "Raul", "Sangel", "Sondre", "Thorbjørn"];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

shuffleArray(Gutta)

let startmeny = document.getElementById("startmeny")
let velgevindu = document.getElementById("velge-vindu")
let spørsmål = ""

lengdetest = Gutta.length

function LagListe(Ferdig) {
    let tabell = document.getElementById("tabelliste")
    let liste = document.getElementById("liste")
    

    for (let i = 0; i < Ferdig.length; i++) {
        let rad = document.createElement("tr")
        let nummer_rute = document.createElement("th")
        nummer_rute.innerHTML = i + 1 + "."
        let navn_rute = document.createElement("td")
        navn_rute.innerHTML = Ferdig[i]

        rad.appendChild(nummer_rute)
        rad.appendChild(navn_rute)

        tabell.appendChild(rad)
    }

    velgevindu.style.display = "none"
    liste.style.display = "block"

}

let navn1
let navn2

function VisBilder(person1, person2) {
    console.log(person1)
    console.log(person2)
    let bilde1 = document.getElementById("bilde1")
    let bilde2 = document.getElementById("bilde2")

    navn1 = document.getElementById("navn1")
    navn2 = document.getElementById("navn2")

    bilde1.src = "Bilder/" + person1 + ".jpg"
    bilde2.src = "Bilder/" + person2 + ".jpg"

    navn1.innerHTML = person1
    navn2.innerHTML = person2
}

function bildetest() {
    VisBilder(Gutta[1], Gutta[0])
    console.log("test")
}

document.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        startmeny.style.display = "none"

        spørsmål = document.getElementById("Spørsmål").value
        let overskrift_spørsmål = document.getElementById("overskrift_spørsmål")
        let overskrift_liste = document.getElementById("overskrift_liste")

        overskrift_spørsmål.innerHTML = spørsmål;
        overskrift_liste.innerHTML = "Resultat: " + spørsmål

        velgevindu.style.display = "grid"

        console.log(spørsmål)

        await DivideSort(Gutta)
    }
});

let pers1 = 0
let pers2 = 0

let knapp1 = document.getElementById("navn1")
let knapp2 = document.getElementById("navn2")

let ErVenstreTrykket = false
let ErHøyreTrykket = false

knapp1.addEventListener("click", function () {
    ErVenstreTrykket = true
    
})

knapp2.addEventListener("click", function () {
    ErHøyreTrykket = true
   
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function Sjekk(person1, person2) {
    return new Promise((resolve) => {
        ErHøyreTrykket = false
        ErVenstreTrykket = false

        pers1 = 0
        pers2 = 0

        VisBilder(person1, person2)

        function clickHandler() {
            if (ErVenstreTrykket || ErHøyreTrykket) {
                if (ErVenstreTrykket) {
                    pers1 = 1
                } else {
                    pers2 = 1
                }
                resolve()
                document.removeEventListener('click', clickHandler)
            }
        }

        document.addEventListener('click', clickHandler)
    });
}

async function DivideSort(liste) {
    if (liste.length <= 1) {
        return liste
    }

    let mid = Math.floor(liste.length / 2)

    let left = await DivideSort(liste.slice(0, mid))
    let right = await DivideSort(liste.slice(mid))

    return Merge(left, right)
}

async function Merge(left, right) {
    let FerdigListe = []

    while (left.length && right.length) {
        await Sjekk(left[0], right[0])

        if (pers1 > pers2) {
            FerdigListe.push(left.shift())
        } else {
            FerdigListe.push(right.shift())
        }
    }

    console.log([...FerdigListe, ...left, ...right])

    if (lengdetest == [...FerdigListe, ...left, ...right].length) {
        LagListe([...FerdigListe, ...left, ...right])
    }
    return [...FerdigListe, ...left, ...right]

    
}