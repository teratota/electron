// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
fs = require('fs');
fse = require('fs-extra')
var nodeConsole = require('console');
var console = new nodeConsole.Console(process.stdout, process.stderr);
const {shell} = require('electron');

let path = "C:\\Users";

let lastName = '';

let numberMax = '';

let listCopy = '';


viewDir()

function listeFile() {
    let folder = document.getElementById("dir").value;
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

function fileOrDir(){
    let file = document.getElementById("categorie").value;
    if(file == 'Dossier'){
        let div = "<input type='texte' id='newdir'><button onclick='newDir()'>Valider</button>"
        document.getElementById("FormFileOrDir").innerHTML = div;
    }else{
        let div = "<input type='texte' id='newfile'><button onclick='newFile()'>Valider</button>"
        document.getElementById("FormFileOrDir").innerHTML = div;
    }
}

function newFile(){
    let file = document.getElementById("newfile").value;
    createPath = path+"\\"+file
    fs.writeFile(createPath, '', function (err) {
        if (err) {
            console.log(err);
        }
        console.log('File is created successfully.');
        document.getElementById("FormFileOrDir").innerHTML = '';
    });
    viewDir();
}

function newDir(){
    let file = document.getElementById("newdir").value;
    createPath = path+"\\"+file
    fs.mkdir(createPath, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Dir is created successfully.');
        document.getElementById("FormFileOrDir").innerHTML = '';
    });
    viewDir();
}

function renameFileOrDir(name){
    let newName = document.getElementById('input'+name).value;
    document.getElementById(name).innerHTML = '';
    let lastName = path+"\\"+name
    newName = path+"\\"+newName
    fs.rename(lastName, newName, () => { 
        console.log("\nFile Renamed!\n"); 
        viewDir();
        let myNotification = new Notification('Title', {
            body: 'Lorem Ipsum Dolor Sit Amet'
          })
      }); 
}

function openRename(name){
    let div = '<input type="text" id=\'input' + name + '\'><button onclick="renameFileOrDir(\'' + name + '\')">Valider</button';
    document.getElementById(name).innerHTML = div;
}

function deleteDir(){
    dir = path+"\\"+name
    fs.rmdir(dir, { 
        recursive: true, 
      }, (error) => { 
        if (error) { 
          console.log(error); 
        } 
        else { 
          console.log("Recursive: Directories Deleted!"); 
        } 
      }); 
    viewDir();
}

function deleteFileOrDir(name){
    file = path+"\\"+name
    shell.moveItemToTrash(file);
    viewDir();
}

function copy(){
    let listDirOrFile = [];
    let x = 0;
    for (var i = 1;i <= numberMax; i++){
        if (document.getElementById("selection" + i).checked === true){
            listDirOrFile[x] = path+"\\"+document.getElementById("selection" + i).value;
        }  
        x++
    }
    let div = "<button onclick='paste()'>coller</button><button onclick='stop()'>Annuler</button>"
    document.getElementById('copier').innerHTML = "";
    document.getElementById('coller').innerHTML = div;
    listCopy = listDirOrFile;
}

function paste(){
    listCopy.forEach(function (file) {
        folder = file.split("\\")
        destination = path+'\\'+folder[folder.length-1]
        fse.copy(file, destination, function (err) {
            if (err){
                console.log('An error occured while copying the folder.')
                return console.error(err)
            }
            console.log('Copy completed!')
            viewDir();
        });
    })
    stop();
}

function stop(){
    
    let div = "<button onclick='copy()'>copier</button>"
    document.getElementById('copier').innerHTML = div;
    document.getElementById('coller').innerHTML = "";
    listCopy = []
}

function viewDir(){
    fs.readdir(path, function (err, files) {
        if (err) {
            console.log(err);
        }
        let div = ''
        x=1;
        files.forEach(function (name) {
            if(fs.statSync(path+'\\'+name).isFile()){
                div+= '<tr>'
                div+= '<td><input type="checkbox" id="selection'+x+'" value=\'' + name+ '\'></td>';
                div+= '<td><img src="../image/document-outline.svg" height="20px" width="20px"></td>';
                div+= '<td><a> ' + name + ' </a></td>';
                div+= '<td><button onclick="deleteFileOrDir(\'' + name + '\')"><img src="../image/trash-outline.svg" height="15px" width="15px"></button> <button onclick="openFile(\'' + name + '\')"><img src="../image/open-outline.svg" height="15px" width="15px"></button></button><button onclick=openRename(\'' + name + '\')><img src="../image/create-outline.svg" height="15px" width="15px"></button><p><p><div id =\'' + name + '\'></div></td>';
                div+= '</tr>'
            }else{
                div+= '<tr>'
                div+= '<td><input type="checkbox" id="selection'+x+'" value=\'' + name+ '\'></td>';
                div+='<td><img src="../image/folder-outline.svg" height="20px" width="20px"></td>'
                div+= '<td><a onclick="goToDir(\'' + name + '\')"> ' + name + ' </a></td>'
                div+='<td><button onclick=deleteFileOrDir(\'' + name + '\')><img src="../image/trash-outline.svg" height="15px" width="15px"></button><button onclick=openRename(\'' + name + '\')><img src="../image/create-outline.svg" height="15px" width="15px"></button><p><p><div id =\'' + name + '\'></div></td>'
                div+= '</tr>'
            }
            x++
        });
        numberMax = x-1;
        document.getElementById("list").innerHTML = div;
    });
}

function openFile(name){
    file = path+"\\"+name
    shell.openExternal(file);
}
