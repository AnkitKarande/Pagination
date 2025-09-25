public with sharing class OpportunityControllerForPagination {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunity(){
        return [SELECT Id,Name,StageName,CloseDate from Opportunity];
    }

    @AuraEnabled
    public static Map<String,Object> getOpportunities(Integer pageSize, Integer offset){
        
        List<Opportunity> OpportunityList = [SELECT Id,Name,StageName,CloseDate from Opportunity
                                            ORDER BY CreatedDate DESC LIMIT:pageSize OFFSET:offset];
        Integer totalOpportunities = [SELECT COUNT() from Opportunity];
        
        Map<String,Object> opportunityMap = new Map<String,Object>();
        opportunityMap.put('opportunities',OpportunityList);
        opportunityMap.put('totalOpportunities',totalOpportunities);
        return opportunityMap;
    }
}