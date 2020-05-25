// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

fs = require('fs');

let path = "C:\\";

viewDir()

function listeFile() {
    let folder = document.getElementById("dir").value;
    console.log(folder)
    path = folder
    viewDir()
}

function goToDir(name) {
    path += "\\"+name
    viewDir()
}

function lastDir(){
    folder = path.split("\\")
    folder.splice(-1,1)
    path = folder.join('\\');
    viewDir();
    
}

function fileOrDire(){
    let file = document.getElementById("categorie").value;
    if(file = 'Dossier'){
        let div = "<input type='texte' id='newdir'><button onclick='newFile()'>Valider</button>"
        document.getElementById("list").innerHTML = div;
    }else{
        let div = "<input type='texte' id='newfile'><button onclick='newFile()'>Valider</button>"
        document.getElementById("list").innerHTML = div;
    }
}

function newFile(){
    let file = document.getElementById("newfile").value;
    
}

function newDir(){

}

function viewDir(){
    fs.readdir(path, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        let div = ''
        files.forEach(function (name) {
            div+= '<p><a onclick="goToDir(\'' + name + '\')">' + name + '</a><p>'
        });
        document.getElementById("list").innerHTML = div;
    });
}