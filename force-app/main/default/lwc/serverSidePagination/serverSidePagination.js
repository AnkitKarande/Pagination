import { LightningElement } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityControllerForPagination.getOpportunities';

export default class ServerSidePagination extends LightningElement {

    columns = [
        {label:'Opportunity Id',fieldName:"Id"},
        {label:'Opportunity Name',fieldName:"Name"},
        {label:'Opportunity Stage',fieldName:"StageName"},
        {label:'Opportunity Close Date',fieldName:"CloseDate"}
    ]

    OpportunityData
    pageNumber = 1;
    totalPages = 0;
    pageSize = 10;

    connectedCallback(){
        this.loadOpportunityData();
    }

    loadOpportunityData(){
        const calculatedOffset = (this.pageNumber - 1) * this.pageSize;
        getOpportunities({
            pageSize : this.pageSize,
            offset : calculatedOffset
        }).then(result=>{
            this.OpportunityData = result.opportunities;
            this.totalPages = Math.ceil(result.totalOpportunities/this.pageSize);
        }).catch(error=>{
            console.error(error);
        })
    }

    previousPage(){
        if(this.pageNumber>1){
            this.pageNumber--;
            this.loadOpportunityData();
        }
    }
    nextPage(){
        if(this.pageNumber<this.totalPages){
            this.pageNumber++;
            this.loadOpportunityData();
        }
    }

    get isFirstPage(){
        return this.pageNumber == 1;
    }
    get isLastPage(){
        return this.pageNumber == this.totalPages;
    }
    get rowOffset(){
        return (this.pageNumber-1)*this.pageSize;
    }
}