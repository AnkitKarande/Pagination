import { LightningElement, wire } from 'lwc';
import getOpportunity from '@salesforce/apex/OpportunityControllerForPagination.getOpportunity';

const columns = [
    {label:'Opportunity Id',fieldName:'Id'},
    {label:'Opportunity Name',fieldName:'Name'},
    {label:'Opportunity Stage',fieldName:'StageName'},
    {label:'Opportunity Close Date',fieldName:'CloseDate'}
]

export default class ClientSidePagination extends LightningElement {

    allOpportunityData
    singlePageOpportunityData
    columns = columns
    pageNumber = 1;
    pageSize = 10;
    totalPages = 0;
    

    @wire(getOpportunity)
    fetchingOpportunities({data,error}){
        if(data){
            this.allOpportunityData = data;
            console.log(data);
            this.totalPages = Math.ceil(this.allOpportunityData.length/this.pageSize);
            this.setPageData();
        }
        else if (error){
            console.error(error);
        }
    }

    setPageData(){
        const startIndex = (this.pageNumber-1)*this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.singlePageOpportunityData = this.allOpportunityData.slice(startIndex,endIndex);
    }

    previousPage(){
        if(this.pageNumber >1){
            this.pageNumber--;
            this.setPageData();
        }
    }

    nextPage(){
        if(this.pageNumber < this.totalPages){
            this.pageNumber++;
            this.setPageData();
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