public with sharing class OpportunityControllerForPagination {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunity(){
        return [SELECT Id,Name,StageName,CloseDate from Opportunity];
    }
}