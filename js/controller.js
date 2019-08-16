import {view} from './view.js';
export class controller {

    constructor(modelObj) {
        this.model = modelObj;
        this.view = new view(this);
        this.headline = undefined;
    }
    getAll = () => {
        return this.model.getAll();
    }
    getAllKeys = () => {
        return this.model.getAllKeys();
    }
    removeLoader = () =>{
        this.model.removeLoader()
    }
    loadHeadlineFile = () => {
        this.loadScript();
    }
    loadScript =  () => {
        
        let isLoaded = document.querySelectorAll("#headline-myModal");
        
        if (isLoaded.length > 0) {
            this.headline.init();
            return;
        }
         import('./headline.js').then(module => {
            this.headline = new module.headline();
        });
    }


}
