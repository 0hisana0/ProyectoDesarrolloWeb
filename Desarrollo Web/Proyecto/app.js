var totalPosts = 0

function publicar() {
    var texto = document.getElementById("texto").value

    if (texto == "") {
        alert("¡Escribe algo antes de publicar!")
        return
    }

    var feed = document.getElementById("feed")

    var tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"

    tarjeta.innerHTML =
        "<p><b>Andres Soria</b> <small style='color:gray'>ahora mismo</small></p>" +
        "<p>" + texto + "</p>" +
        "<button class='btn-like' onclick='darLike(this)'>❤ 0 me gusta</button>" +
        "<button class='btn-like' onclick='verComentarios(this)'>💬 comentarios</button>" +
        "<div class='comentarios' style='display:none'>" +
            "<div class='lista-comentarios'></div>" +
            "<input type='text' placeholder='escribe un comentario'>" +
            "<button onclick='agregarComentario(this)'>enviar</button>" +
        "</div>"

    feed.insertBefore(tarjeta, feed.firstChild)

    document.getElementById("texto").value = ""
    totalPosts++
}

function darLike(btn) {
    var likes = parseInt(btn.getAttribute("data-likes") || "0")
    likes++
    btn.setAttribute("data-likes", likes)
    btn.innerHTML = "❤ " + likes + " me gusta"
    btn.style.color = "red"
}

function verComentarios(btn) {
    var tarjeta = btn.parentElement
    var seccion = tarjeta.querySelector(".comentarios")

    if (seccion.style.display == "none") {
        seccion.style.display = "block"
    } else {
        seccion.style.display = "none"
    }
}

function agregarComentario(btn) {
    var seccion = btn.parentElement
    var input = seccion.querySelector("input")
    var texto = input.value

    if (texto == "") return

    var lista = seccion.querySelector(".lista-comentarios")
    lista.innerHTML += "<p><b>Andres Soria:</b> " + texto + "</p>"
    input.value = ""
}

function verFeed() {
    document.getElementById("pagina-feed").style.display = "block"
    document.getElementById("pagina-perfil").style.display = "none"
}

function verPerfil() {
    document.getElementById("pagina-feed").style.display = "none"
    document.getElementById("pagina-perfil").style.display = "block"
    document.getElementById("total-posts").innerHTML = totalPosts
}