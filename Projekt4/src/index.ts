class App {
    title:string
    text:string
    id:string = "id"
    notes:number = 0
    note = [{}]
    constructor() {
        this.createMenu()
        this.storage();
    }
    //addNote(){
      //  this.title = <HTMLInputElement>document.getElementById("title")
     //   console.log("xD")
    //}
    storage(){
        Object.keys(localStorage).forEach(function(key){
            //console.log(localStorage.getItem(key)[0]);

            
         });
    }
    createMenu(){
        

        const title = document.createElement("input")
        title.type = "text"
        title.setAttribute("id","title")
        title.placeholder = "title"
        const text = document.createElement("input")
        text.type = "text"
        text.placeholder = "text"
        const divs = <HTMLDivElement>document.getElementById("divs");
        const btnAdd = document.createElement("button")
        btnAdd.innerText = "Add";
        btnAdd.addEventListener("click", () =>{
            this.title = title.value;
            this.text = text.value
            //console.log(this.title + " titlee")
            //console.log(this.text + " textt")
            const note = document.createElement("div")
            note.classList.add("note")
            note.setAttribute("id",this.id+this.notes)
            divs.appendChild(note);
            const noteTitle = document.createElement("p")
            noteTitle.classList.add("title")
            const noteText = document.createElement("p")
            noteTitle.innerText = this.title
            noteText.innerText = this.text
            note.appendChild(noteTitle);
            note.appendChild(noteText);
            //console.log(this.note);
            
            var getData = 
            {
                "title":this.title,
                "text":this.text,
                "id": this.id+this.notes
            }
            localStorage.setItem(this.id+this.notes, JSON.stringify(getData));

            //localStorage.setItem(this.id+this.notes, this.title)
            let notepads =[]
            var val = localStorage.getItem(this.id+this.notes);
            notepads.push(val)
            console.log(notepads)
            
            const btnDel = document.createElement("button")
            btnDel.setAttribute("id",this.id+this.notes)
            btnDel.innerText = "Delete";
            note.appendChild(btnDel);
            

            btnDel.addEventListener("click", () =>{
                console.log("id usuwanego z ls "+btnDel.getAttribute("id"))
                console.log("usuwany jest " +note)
                note.parentElement.removeChild(note)
                localStorage.removeItem(btnDel.getAttribute("id"))
                this.notes--;
                
            })
            this.notes++;
        })
        const menu = <HTMLDivElement>document.getElementById("menu");
        menu.appendChild(title)
        menu.appendChild(text)
        menu.appendChild(btnAdd)
        console.log(localStorage)
    }
    
}

const app = new App();