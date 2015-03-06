package representation;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Match {

    @JsonProperty
    private int     id;
    @JsonProperty
    private String  datum;
    @JsonProperty
    private String  spieltyp;
    @JsonProperty
    private String  mannschaft_1;
    @JsonProperty
    private String  mannschaft_2;
    @JsonProperty
    private Boolean ergebnis;
    @JsonProperty
    private float  quoteM1;
    @JsonProperty
    private float  quoteM2;
    @JsonProperty
    private float  quoteX;
    @JsonProperty
    private String quoteM1Chance;
    @JsonProperty
    private String quoteXChance;
    @JsonProperty
    private String quoteM2Chance;
    @JsonProperty
    private String quotenkey;    
    @JsonProperty
    private List<Float> historyQM1;
    @JsonProperty
    private List<Float> historyQM2;
    @JsonProperty
    private List<Float> historyQX;
    @JsonProperty
    private List<String> historyDate;
    @JsonProperty
    private boolean hasHistory;
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public String getSpieltyp() {
        return spieltyp;
    }

    public void setSpieltyp(String spieltyp) {
        this.spieltyp = spieltyp;
    }

    public String getMannschaft_1() {
        return mannschaft_1;
    }

    public void setMannschaft_1(String mannschaft_1) {
        this.mannschaft_1 = mannschaft_1;
    }

    public String getMannschaft_2() {
        return mannschaft_2;
    }

    public void setMannschaft_2(String mannschaft_2) {
        this.mannschaft_2 = mannschaft_2;
    }

    public Boolean getErgebnis() {
        return ergebnis;
    }

    public void setErgebnis(Boolean ergebnis) {
        this.ergebnis = ergebnis;
    }

    
    

    
   

    
    public String getQuoteM1Chance() {
        return quoteM1Chance;
    }

    
    public void setQuoteM1Chance(String quoteM1Chance) {
        this.quoteM1Chance = quoteM1Chance;
    }

    
    public String getQuoteXChance() {
        return quoteXChance;
    }

    
    public void setQuoteXChance(String quoteXChance) {
        this.quoteXChance = quoteXChance;
    }

    
    public String getQuoteM2Chance() {
        return quoteM2Chance;
    }

    
    public void setQuoteM2Chance(String quoteM2Chance) {
        this.quoteM2Chance = quoteM2Chance;
    }

    
    public String getQuotenkey() {
        return quotenkey;
    }

    
    public void setQuotenkey(String quotenkey) {
        this.quotenkey = quotenkey;
    }

    
   
    
    public List<String> getHistoryDate() {
        return historyDate;
    }

    
    public void setHistoryDate(List<String> historyDate) {
        this.historyDate = historyDate;
    }

    
    public boolean isHasHistory() {
        return hasHistory;
    }

    
    public void setHasHistory(boolean hasHistory) {
        this.hasHistory = hasHistory;
    }

    
    public List<Float> getHistoryQM1() {
        return historyQM1;
    }

    
    public void setHistoryQM1(List<Float> historyQM1) {
        this.historyQM1 = historyQM1;
    }

    
    public List<Float> getHistoryQM2() {
        return historyQM2;
    }

    
    public void setHistoryQM2(List<Float> historyQM2) {
        this.historyQM2 = historyQM2;
    }

    
    public List<Float> getHistoryQX() {
        return historyQX;
    }

    
    public void setHistoryQX(List<Float> historyQX) {
        this.historyQX = historyQX;
    }

    
    public float getQuoteM1() {
        return quoteM1;
    }

    
    public void setQuoteM1(float quoteM1) {
        this.quoteM1 = quoteM1;
    }

    
    public float getQuoteM2() {
        return quoteM2;
    }

    
    public void setQuoteM2(float quoteM2) {
        this.quoteM2 = quoteM2;
    }

    
    public float getQuoteX() {
        return quoteX;
    }

    
    public void setQuoteX(float quoteX) {
        this.quoteX = quoteX;
    }

}
