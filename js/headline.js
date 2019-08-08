
export class headline{
    constructor(){
        this.data = undefined;
        this.createPopUp();
        this.init();
    }
    init = () => {
        this.data = [];
        this.showPopUP();
        this.initializeLoader();
        this.fetchHeadlines();
    }

    fetchHeadlines = async function(){
        console.log("fetchheadline");
       
        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=d4e03df5989c4e4a998e4fb2fe632d48`).then(result => result.json()).then(jsonres => this.set(jsonres)).catch(() => {
            alert("Cannot able to fetch data")
        });
        this.showData();
        this.removeLoader();
        
    }

    set = (data1) => {
        
        
        data1.articles.forEach(element => {
            const tempData = {
                title: element.title,
                description: element.description
            };
            this.data.push(tempData);
        });
       
    }
    showData = () => {
        
        if(this.data.length === 0){
            alert("data array is empty");
            return;
        }
        document.getElementById("headline-modal-header").innerHTML = "Headlines";
        this.data.forEach(element => {
            let title = this.createElement("h3", "", "headline-modal-title");
            let description = this.createElement("p","","headline-modal-para");
            let breakline = this.createElement("hr","","");
            title.innerHTML = element.title;
            description.innerHTML = element.description;
            document.getElementById("headline-modal-body").appendChild(title);
            document.getElementById("headline-modal-body").appendChild(description);
            document.getElementById("headline-modal-body").appendChild(breakline);

        });
        document.getElementById("headline-myModal").style.display = "block"
    }
    initializeLoader = () =>{
        console.log("ini loader");
        let body = document.getElementById("headline-modal-content");
        let loaderDiv = this.createElement("div","","headline-loader");
        body.appendChild(loaderDiv);
    }
    
    removeLoader = () => {
        console.log("remove loader");
        document.getElementById("headline-loader").style.display = "none";
    }

    createPopUp = () => {
        console.log("cretepopup");
        let parent = document.getElementById("heading");
        let modal = this.createElement("div", "modal", "headline-myModal");
        parent.appendChild(modal);

        let modal_content = this.createElement("div", "modal-content", "headline-modal-content");

        modal.appendChild(modal_content);

        let modal_header = this.createElement("div", "modal-header", "");

        modal_content.appendChild(modal_header);

        let close = this.createElement("span","close","");
        close.onclick = () => {
            modal.style.display = "none";
        }
        close.innerHTML = "&times";
        modal_header.appendChild(close);

        let heading = this.createElement("h2", "", "headline-modal-header")

        modal_header.appendChild(heading);

        let modal_body = this.createElement("div", "", "headline-modal-body")

        modal_content.appendChild(modal_body);   

    }
    createElement = (type, classname, id) => {

        var element = document.createElement(type);
        element.className = classname || "";
        element.id = id || "";
        return element;
    }
    showPopUP = () => {
        document.getElementById("headline-myModal").style.display = "block";
    }
}
