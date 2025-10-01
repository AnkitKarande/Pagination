import { LightningElement } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityControllerForPagination.getOpportunities';

export default class LazyLoading extends LightningElement {

    columns = [
        {label:'Opportunity Id',fieldName:'Id'},
        {label:'Opportunity Name',fieldName:'Name'},
        {label:'Opportunity Stage',fieldName:'StageName'},
        {label:'Opportunity Close Date',fieldName:'CloseDate'}
    ]
    OpportunityData = []
    isLoading = false;
    allOpportunitiesLoaded = false;

    pageSize = 10;
    offset = 0;
    totalRecords = 0;

    connectedCallback(){
        this.loadOpportunityData();
    }
    loadOpportunityData(){
        if(this.allOpportunitiesLoaded){
            return;
        }
        this.isLoading = true;
        setTimeout(()=>{
            getOpportunities({
            pageSize : this.pageSize,
            offset : this.offset
            }).then(result=>{
                console.log(result);
                const newOpportunitiesData = result.opportunities;
                this.totalRecords = result.totalOpportunities;

                this.OpportunityData = [...this.OpportunityData,...newOpportunitiesData];
                this.offset = this.OpportunityData.length;

                if(this.OpportunityData.length >= this.totalRecords){
                    this.allOpportunitiesLoaded = true;
                }

                this.isLoading = false;

            }).catch(error=>{
                console.error(error);
            })
        },1000);
    }

    loadMoreOpportunities(){
        this.loadOpportunityData();
    }
    
}