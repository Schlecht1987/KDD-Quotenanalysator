/*
 * 
 */
package representation;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class Match.
 */
public class Match {

    /** The id. */
    @JsonProperty
    private int     id;
    
    /** The datum. */
    @JsonProperty
    private String  datum;
    
    /** The spieltyp. */
    @JsonProperty
    private String  spieltyp;
    
    /** The mannschaft_1. */
    @JsonProperty
    private String  mannschaft_1;
    
    /** The mannschaft_2. */
    @JsonProperty
    private String  mannschaft_2;
    
    /** The ergebnis. */
    @JsonProperty
    private Boolean ergebnis;
    
    /** The quote m1. */
    @JsonProperty
    private float  quoteM1;
    
    /** The quote m2. */
    @JsonProperty
    private float  quoteM2;
    
    /** The quote x. */
    @JsonProperty
    private float  quoteX;
    
    /** The quote m1 chance. */
    @JsonProperty
    private float quoteM1Chance;
    
    /** The quote x chance. */
    @JsonProperty
    private float quoteXChance;
    
    /** The quote m2 chance. */
    @JsonProperty
    private float quoteM2Chance;
    
    /** The quotenkey. */
    @JsonProperty
    private float quotenkey;    
    
    /** The history q m1. */
    @JsonProperty
    private List<Float> historyQM1;
    
    /** The history q m2. */
    @JsonProperty
    private List<Float> historyQM2;
    
    /** The history qx. */
    @JsonProperty
    private List<Float> historyQX;
    
    /** The history date. */
    @JsonProperty
    private List<String> historyDate;
    
    /** The has history. */
    @JsonProperty
    private boolean hasHistory;
    
    @JsonProperty
    private float quoteM1Expecation;
    
    @JsonProperty
    private int quoteM1CountGames;
    
    @JsonProperty
    private float quoteM1RealChance;
    
    @JsonProperty
    private int quoteM1Wins;
    
    @JsonProperty
    private int quoteM1Loses;
    
    @JsonProperty
    private float quoteM1UsedQuoteForStats;
    
    @JsonProperty
    private float quoteXExpecation;
    
    @JsonProperty
    private int quoteXCountGames;
    
    @JsonProperty
    private float quoteXRealChance;
    
    @JsonProperty
    private int quoteXWins;
    
    @JsonProperty
    private int quoteXLoses;
    @JsonProperty
    private float quoteXUsedQuoteForStats;
    
    @JsonProperty
    private float quoteM2Expecation;
    
    @JsonProperty
    private int quoteM2CountGames;
    
    @JsonProperty
    private float quoteM2RealChance;
    
    @JsonProperty
    private int quoteM2Wins;
    
    @JsonProperty
    private int quoteM2Loses;
    
    @JsonProperty
    private float quoteM2UsedQuoteForStats;

    /**
     * Gets the id.
     *
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the id.
     *
     * @param id the new id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the datum.
     *
     * @return the datum
     */
    public String getDatum() {
        return datum;
    }

    /**
     * Sets the datum.
     *
     * @param datum the new datum
     */
    public void setDatum(String datum) {
        this.datum = datum;
    }

    /**
     * Gets the spieltyp.
     *
     * @return the spieltyp
     */
    public String getSpieltyp() {
        return spieltyp;
    }

    /**
     * Sets the spieltyp.
     *
     * @param spieltyp the new spieltyp
     */
    public void setSpieltyp(String spieltyp) {
        this.spieltyp = spieltyp;
    }

    /**
     * Gets the mannschaft_1.
     *
     * @return the mannschaft_1
     */
    public String getMannschaft_1() {
        return mannschaft_1;
    }

    /**
     * Sets the mannschaft_1.
     *
     * @param mannschaft_1 the new mannschaft_1
     */
    public void setMannschaft_1(String mannschaft_1) {
        this.mannschaft_1 = mannschaft_1;
    }

    /**
     * Gets the mannschaft_2.
     *
     * @return the mannschaft_2
     */
    public String getMannschaft_2() {
        return mannschaft_2;
    }

    /**
     * Sets the mannschaft_2.
     *
     * @param mannschaft_2 the new mannschaft_2
     */
    public void setMannschaft_2(String mannschaft_2) {
        this.mannschaft_2 = mannschaft_2;
    }

    /**
     * Gets the ergebnis.
     *
     * @return the ergebnis
     */
    public Boolean getErgebnis() {
        return ergebnis;
    }

    /**
     * Sets the ergebnis.
     *
     * @param ergebnis the new ergebnis
     */
    public void setErgebnis(Boolean ergebnis) {
        this.ergebnis = ergebnis;
    }

    
    

    
   

    
    
    
   
    
    /**
     * Gets the history date.
     *
     * @return the history date
     */
    public List<String> getHistoryDate() {
        return historyDate;
    }

    
    /**
     * Sets the history date.
     *
     * @param historyDate the new history date
     */
    public void setHistoryDate(List<String> historyDate) {
        this.historyDate = historyDate;
    }

    
    /**
     * Checks if is checks for history.
     *
     * @return true, if is checks for history
     */
    public boolean isHasHistory() {
        return hasHistory;
    }

    
    /**
     * Sets the checks for history.
     *
     * @param hasHistory the new checks for history
     */
    public void setHasHistory(boolean hasHistory) {
        this.hasHistory = hasHistory;
    }

    
    /**
     * Gets the history q m1.
     *
     * @return the history q m1
     */
    public List<Float> getHistoryQM1() {
        return historyQM1;
    }

    
    /**
     * Sets the history q m1.
     *
     * @param historyQM1 the new history q m1
     */
    public void setHistoryQM1(List<Float> historyQM1) {
        this.historyQM1 = historyQM1;
    }

    
    /**
     * Gets the history q m2.
     *
     * @return the history q m2
     */
    public List<Float> getHistoryQM2() {
        return historyQM2;
    }

    
    /**
     * Sets the history q m2.
     *
     * @param historyQM2 the new history q m2
     */
    public void setHistoryQM2(List<Float> historyQM2) {
        this.historyQM2 = historyQM2;
    }

    
    /**
     * Gets the history qx.
     *
     * @return the history qx
     */
    public List<Float> getHistoryQX() {
        return historyQX;
    }

    
    /**
     * Sets the history qx.
     *
     * @param historyQX the new history qx
     */
    public void setHistoryQX(List<Float> historyQX) {
        this.historyQX = historyQX;
    }

    
    /**
     * Gets the quote m1.
     *
     * @return the quote m1
     */
    public float getQuoteM1() {
        return quoteM1;
    }

    
    /**
     * Sets the quote m1.
     *
     * @param quoteM1 the new quote m1
     */
    public void setQuoteM1(float quoteM1) {
        this.quoteM1 = quoteM1;
    }

    
    /**
     * Gets the quote m2.
     *
     * @return the quote m2
     */
    public float getQuoteM2() {
        return quoteM2;
    }

    
    /**
     * Sets the quote m2.
     *
     * @param quoteM2 the new quote m2
     */
    public void setQuoteM2(float quoteM2) {
        this.quoteM2 = quoteM2;
    }

    
    /**
     * Gets the quote x.
     *
     * @return the quote x
     */
    public float getQuoteX() {
        return quoteX;
    }

    
    /**
     * Sets the quote x.
     *
     * @param quoteX the new quote x
     */
    public void setQuoteX(float quoteX) {
        this.quoteX = quoteX;
    }

    
    /**
     * Gets the quote m1 chance.
     *
     * @return the quote m1 chance
     */
    public float getQuoteM1Chance() {
        return quoteM1Chance;
    }

    
    /**
     * Sets the quote m1 chance.
     *
     * @param quoteM1Chance the new quote m1 chance
     */
    public void setQuoteM1Chance(float quoteM1Chance) {
        this.quoteM1Chance = quoteM1Chance;
    }

    
    /**
     * Gets the quote x chance.
     *
     * @return the quote x chance
     */
    public float getQuoteXChance() {
        return quoteXChance;
    }

    
    /**
     * Sets the quote x chance.
     *
     * @param quoteXChance the new quote x chance
     */
    public void setQuoteXChance(float quoteXChance) {
        this.quoteXChance = quoteXChance;
    }

    
    /**
     * Gets the quote m2 chance.
     *
     * @return the quote m2 chance
     */
    public float getQuoteM2Chance() {
        return quoteM2Chance;
    }

    
    /**
     * Sets the quote m2 chance.
     *
     * @param quoteM2Chance the new quote m2 chance
     */
    public void setQuoteM2Chance(float quoteM2Chance) {
        this.quoteM2Chance = quoteM2Chance;
    }

    
    /**
     * Gets the quotenkey.
     *
     * @return the quotenkey
     */
    public float getQuotenkey() {
        return quotenkey;
    }

    
    /**
     * Sets the quotenkey.
     *
     * @param quotenkey the new quotenkey
     */
    public void setQuotenkey(float quotenkey) {
        this.quotenkey = quotenkey;
    }

    
    public float getQuoteM1Expecation() {
        return quoteM1Expecation;
    }

    
    public void setQuoteM1Expecation(float quoteM1Expecation) {
        this.quoteM1Expecation = quoteM1Expecation;
    }

    
    public int getQuoteM1CountGames() {
        return quoteM1CountGames;
    }

    
    public void setQuoteM1CountGames(int quoteM1CountGames) {
        this.quoteM1CountGames = quoteM1CountGames;
    }

    
    public float getQuoteM1RealChance() {
        return quoteM1RealChance;
    }

    
    public void setQuoteM1RealChance(float quoteM1RealChance) {
        this.quoteM1RealChance = quoteM1RealChance;
    }

    
    public int getQuoteM1Wins() {
        return quoteM1Wins;
    }

    
    public void setQuoteM1Wins(int quoteM1Wins) {
        this.quoteM1Wins = quoteM1Wins;
    }

    
    public int getQuoteM1Loses() {
        return quoteM1Loses;
    }

    
    public void setQuoteM1Loses(int quoteM1Loses) {
        this.quoteM1Loses = quoteM1Loses;
    }

    
    public float getQuoteXExpecation() {
        return quoteXExpecation;
    }

    
    public void setQuoteXExpecation(float quoteXExpecation) {
        this.quoteXExpecation = quoteXExpecation;
    }

    
    public int getQuoteXCountGames() {
        return quoteXCountGames;
    }

    
    public void setQuoteXCountGames(int quoteXCountGames) {
        this.quoteXCountGames = quoteXCountGames;
    }

    
    public float getQuoteXRealChance() {
        return quoteXRealChance;
    }

    
    public void setQuoteXRealChance(float quoteXRealChance) {
        this.quoteXRealChance = quoteXRealChance;
    }

    
    public int getQuoteXWins() {
        return quoteXWins;
    }

    
    public void setQuoteXWins(int quoteXWins) {
        this.quoteXWins = quoteXWins;
    }

    
    public int getQuoteXLoses() {
        return quoteXLoses;
    }

    
    public void setQuoteXLoses(int quoteXLoses) {
        this.quoteXLoses = quoteXLoses;
    }

    
    public float getQuoteM2Expecation() {
        return quoteM2Expecation;
    }

    
    public void setQuoteM2Expecation(float quoteM2Expecation) {
        this.quoteM2Expecation = quoteM2Expecation;
    }

    
    public int getQuoteM2CountGames() {
        return quoteM2CountGames;
    }

    
    public void setQuoteM2CountGames(int quoteM2CountGames) {
        this.quoteM2CountGames = quoteM2CountGames;
    }

    
    public float getQuoteM2RealChance() {
        return quoteM2RealChance;
    }

    
    public void setQuoteM2RealChance(float quoteM2RealChance) {
        this.quoteM2RealChance = quoteM2RealChance;
    }

    
    public int getQuoteM2Wins() {
        return quoteM2Wins;
    }

    
    public void setQuoteM2Wins(int quoteM2Wins) {
        this.quoteM2Wins = quoteM2Wins;
    }

    
    public float getQuoteM1UsedQuoteForStats() {
        return quoteM1UsedQuoteForStats;
    }

    
    public void setQuoteM1UsedQuoteForStats(float quoteM1UsedQuoteForStats) {
        this.quoteM1UsedQuoteForStats = quoteM1UsedQuoteForStats;
    }

    
    public float getQuoteXUsedQuoteForStats() {
        return quoteXUsedQuoteForStats;
    }

    
    public void setQuoteXUsedQuoteForStats(float quoteXUsedQuoteForStats) {
        this.quoteXUsedQuoteForStats = quoteXUsedQuoteForStats;
    }

    
    public int getQuoteM2Loses() {
        return quoteM2Loses;
    }

    
    public void setQuoteM2Loses(int quoteM2Loses) {
        this.quoteM2Loses = quoteM2Loses;
    }

    
    public float getQuoteM2UsedQuoteForStats() {
        return quoteM2UsedQuoteForStats;
    }

    
    public void setQuoteM2UsedQuoteForStats(float quoteM2UsedQuoteForStats) {
        this.quoteM2UsedQuoteForStats = quoteM2UsedQuoteForStats;
    }

    


    


  

}
