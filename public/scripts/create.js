function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
      for(const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    } )

}

populateUFs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  console.log(ufValue)
  
  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
  citySelect.disabled = true

  fetch(url)
    .then( res => res.json() )
    .then( cities => {
      for(city of cities){
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    } )

}


document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)



//coleta
//pegar todos os li

const itemsToColect = document.querySelectorAll(".itens-grid li")

for(const item of itemsToColect){
  item.addEventListener("click", handleSelectedItem)
}

const colectedItems = document.querySelector("input[name=itens]")

let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target

  //adicionar ou remover uma classe do li
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  //verificar os itens selecionados

  const alredySelected = selectedItems.findIndex(item => item == itemId) //true or false

  //se já selecionado
  if(alredySelected >= 0){
    //filtra os valores para criar uma lista com os valores que foram retirados
    const filteredItems = selectedItems.filter(item =>  item != itemId)

    selectedItems = filteredItems
  }else{
    selectedItems.push(itemId)
  }

  colectedItems.value = selectedItems

}