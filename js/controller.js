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
        this.loadScript('/js/headline.js');
    }
    loadScript = async (path) => {

        let isLoaded = document.querySelectorAll("#headline-myModal");
        
        if (isLoaded.length > 0) {
            this.headline.init();
            return;
        }
        let module = await import('/js/headline.js');
        this.headline = new module.headline();
    }


}
