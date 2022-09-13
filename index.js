let listaDeProdutos = document.getElementById("listaDeProdutos")
let listaDeProdutosCarrinho = document.querySelector("#carrinho").children[0]

let carrinho = document.getElementById("carrinho")
let carrinhoVazio = document.getElementsByClassName("carrinhoVazio")

let quantidade = 0
let soma = 0

testCarrinho()

for (let i = 0; i < data.length; i++) {
    listaDeProdutos.append(gerarTeamplate(data[i]))
}

let botoesHeader = document.getElementsByClassName("botaoHeader")

for (let i = 0; i < botoesHeader.length; i++) {
    let botaoH = botoesHeader[i]
    botaoH.addEventListener("click", function (event) {
        listaDeProdutos.innerHTML = ""
        let palavra = event.target.innerText
        console.log(palavra)
        filtro(palavra)
    })
}

function filtro(palavra) {
    for (let i = 0; i < data.length; i++) {
        if (palavra === "Todos") {
            listaDeProdutos.append(gerarTeamplate(data[i]))
        } else if (palavra === data[i].tag[0]) {
            listaDeProdutos.append(gerarTeamplate(data[i]))
        }
    }
}



function gerarTeamplate(produto) {
    let li = document.createElement("li")
    li.id = `produto_${produto.id}`
    li.innerHTML = `
    <img src="${produto.img}">
    <h4>${produto.tag[0]}</h4>
    <h3>${produto.nameItem}</h3>
    <p>${produto.description}</p>
    <h5>R$ ${produto.value}</h5>
    `

    let botao = document.createElement("button")
    botao.id = `botaoAdd_${produto.id}`
    botao.className = "botaoAdd"
    botao.innerText = "Adicionar ao carrinho"
    botao.addEventListener('click', function (event) {
        let idElemento = +((event.target.id).substring(9))
        let objeto = pesquisarProduto(idElemento)
        if (verificaCarrinho(idElemento) === true) {
            insereCarrinho(objeto)
            testCarrinho()
        } else {
            alert("O produto já está no carrinho")
        }
    })

    li.append(botao)
    return li
}

function pesquisarProduto(id) {
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            return gerarObjetoCarrinho(data[i])
        }
    }
}

function gerarObjetoCarrinho(produto) {
    let objeto = {
        id: produto.id,
        name: produto.nameItem,
        img: produto.img,
        value: produto.value,
    }
    return objeto
}

function insereCarrinho(objeto) {
    quantidade++
    soma += objeto.value

    document.getElementById("quantidade").innerText = quantidade
    document.getElementById("soma").innerText = `R$ ${soma}`

    let li = document.createElement("li")
    let div = document.createElement("div")
    let button = document.createElement("button")

    li.id = `objetoCarrinho_${objeto.id}`
    li.innerHTML =
        `
    <img src="${objeto.img}">
    `

    div.innerHTML =
        `
    <h3>${objeto.name}</h3>
    <h4>R$ ${objeto.value}</h4>
    `
    button.innerText = "Remover do carrinho"
    button.addEventListener("click", function (event) {
        quantidade--
        soma -= objeto.value
        document.getElementById("quantidade").innerText = quantidade
        document.getElementById("soma").innerText = `R$ ${soma}`

        let li = event.path[2]
        li.remove()
        testCarrinho()
    })

    div.append(button)
    li.append(div)


    listaDeProdutosCarrinho.append(li)
}

function verificaCarrinho(id) {
    let elemento = document.getElementById(`objetoCarrinho_${id}`)
    if (elemento == null) {
        return true
    }
    else false
}

function testCarrinho() {
    document.querySelector("#carrinho").style.display = "block"
    document.querySelector("#carrinhoVazio").style.display = "flex"

    if (quantidade > 0) {
        document.querySelector("#carrinhoVazio").style.display = "none"
        console.log(document.querySelector("#carrinhoVazio").style.display)
    } else {
        document.querySelector("#carrinho").style.display = "none"
        console.log(document.querySelector("#carrinho").style.display)
    }
}

