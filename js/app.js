import {model} from './model.js';
export class object {

    constructor() {

        this.sourceText = "";
        this.dateText = "";
        this.authorText = "";
        this.imageurlText = "";
        this.contentText = "";
        this.descriptionText = ""

    }

    setSource = (source1) => {
        this.sourceText = source1;
    }
    

    setDate = (date) => {
        let newdate = this.formatDate(date);
        this.dateText = newdate;
    }
    

    setAuthor = (category) => {
        this.authorText = category;
    }
   

    setImageurl = (url) => {
        this.imageurlText = url;
    }
   

    setContent = (content) => {
        this.contentText = content;
    }
   

    setDescription = (description) => {
        this.descriptionText = description;
    }

   
    
    formatDate = (date) => {
        const tempDate = new Date(date);
        const month = tempDate.toLocaleString('default', {
            month: 'long'
        })
        const year = tempDate.getFullYear();
        const day = tempDate.getDay();

        return `${day} ${month} ${year}`;
    }
}
new model();