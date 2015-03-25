/*
 * 
 */
package representation;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

// TODO: Auto-generated Javadoc
/**
 * The Class QuotenFilter.
 */
@JsonInclude(Include.NON_NULL)
public class QuotenFilter {

    /** 1= Alle| 2= Heim   3 = Unentschieden 4= Gast. */
    @JsonProperty
    private int      oddsTyp;
    
    /** The date from. */
    @JsonProperty
    private String   dateFrom;
    
    /** The date until. */
    @JsonProperty
    private String   dateUntil;
    
    /** The odds accuracy. */
    @JsonProperty
    private float    oddsAccuracy;
    
    /** The odds range min. */
    @JsonProperty
    private float    oddsRangeMin;
    
    /** The odds range max. */
    @JsonProperty
    private float    oddsRangeMax;
    
    /** The extended filter. */
    @JsonProperty
    private boolean  extendedFilter;
    
    /** The game type. */
    @JsonProperty
    private String[] gameType;
    
    /** The team. */
    @JsonProperty
    private String[] team;

    

    /**
     * Prints the.
     */
    public void print() {
        String print = "Quotentyp: "+this.oddsTyp+" Datum von: " + this.getDateFrom() + " bis " + this.getDateUntil() + " Quotengenauigkeit: " + this.oddsAccuracy
                + " Min Range: " + this.oddsRangeMin + " Max Range: " + this.oddsRangeMax + " Extended Filter an: "
                + this.extendedFilter + "  Anzhal Mannschaften: " + team.length + " ";
        for (int i = 0; i < team.length; i++) {
            print += "Mannschaft " + (i + 1) + " " + team[i] + " ";
        }
        print += " Anzahl Spieltyp: " + gameType.length + " ";
        for (int i = 0; i < gameType.length; i++) {
            print += "spieltyp " + (i + 1) + " " + gameType[i] + " ";
        }
        System.out.println(print);
    }



    
    /**
     * Gets the odds typ.
     *
     * @return the odds typ
     */
    public int getOddsTyp() {
        return oddsTyp;
    }



    
    /**
     * Sets the odds typ.
     *
     * @param oddsTyp the new odds typ
     */
    public void setOddsTyp(int oddsTyp) {
        this.oddsTyp = oddsTyp;
    }



    
    /**
     * Gets the date from.
     *
     * @return the date from
     */
    public String getDateFrom() {
        return dateFrom;
    }



    
    /**
     * Sets the date from.
     *
     * @param dateFrom the new date from
     */
    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }



    
    /**
     * Gets the date until.
     *
     * @return the date until
     */
    public String getDateUntil() {
        return dateUntil;
    }



    
    /**
     * Sets the date until.
     *
     * @param dateUntil the new date until
     */
    public void setDateUntil(String dateUntil) {
        this.dateUntil = dateUntil;
    }



    
    /**
     * Gets the odds accuracy.
     *
     * @return the odds accuracy
     */
    public float getOddsAccuracy() {
        return oddsAccuracy;
    }



    
    /**
     * Sets the odds accuracy.
     *
     * @param oddsAccuracy the new odds accuracy
     */
    public void setOddsAccuracy(float oddsAccuracy) {
        this.oddsAccuracy = oddsAccuracy;
    }



    
    /**
     * Gets the odds range min.
     *
     * @return the odds range min
     */
    public float getOddsRangeMin() {
        return oddsRangeMin;
    }



    
    /**
     * Sets the odds range min.
     *
     * @param oddsRangeMin the new odds range min
     */
    public void setOddsRangeMin(float oddsRangeMin) {
        this.oddsRangeMin = oddsRangeMin;
    }



    
    /**
     * Gets the odds range max.
     *
     * @return the odds range max
     */
    public float getOddsRangeMax() {
        return oddsRangeMax;
    }



    
    /**
     * Sets the odds range max.
     *
     * @param oddsRangeMax the new odds range max
     */
    public void setOddsRangeMax(float oddsRangeMax) {
        this.oddsRangeMax = oddsRangeMax;
    }



    
    /**
     * Checks if is extended filter.
     *
     * @return true, if is extended filter
     */
    public boolean isExtendedFilter() {
        return extendedFilter;
    }



    
    /**
     * Sets the extended filter.
     *
     * @param extendedFilter the new extended filter
     */
    public void setExtendedFilter(boolean extendedFilter) {
        this.extendedFilter = extendedFilter;
    }



    
    /**
     * Gets the game type.
     *
     * @return the game type
     */
    public String[] getGameType() {
        return gameType;
    }



    
    /**
     * Sets the game type.
     *
     * @param gameType the new game type
     */
    public void setGameType(String[] gameType) {
        this.gameType = gameType;
    }



    
    /**
     * Gets the team.
     *
     * @return the team
     */
    public String[] getTeam() {
        return team;
    }



    
    /**
     * Sets the team.
     *
     * @param team the new team
     */
    public void setTeam(String[] team) {
        this.team = team;
    }

    
   
}
