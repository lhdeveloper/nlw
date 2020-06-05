function populateUFs(){
    const ufSelect = document.querySelector('select[name="uf"]');

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( (states) => {
        var estados = states.sort()
        for(state of estados){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name="state"]');

    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {

        for(city of cities){ 
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


// Itens selecionaveis
const itemsCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsCollect){
    item.addEventListener('click', handleSelectItem);
}

const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

function handleSelectItem(event){
    const itemLi = event.target;
    // adicionar ou remover uma classe com js
    itemLi.classList.toggle('selected');
    const itemId = itemLi.dataset.id;

    console.log("ITEM ID:", itemId)

    //verificar se tem itens selecionados, se sim 
    //pegar os itens selecionados;
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    });

    // se ja estiver selecionado, tirar da seleção
    if(alreadySelected != -1){
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    }else {
        selectedItems.push(itemId)
    }

    console.log("SELECT ITEMS:", itemId)

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
}

