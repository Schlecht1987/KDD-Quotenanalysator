/*
 * 
 */
package representation;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;


// TODO: Auto-generated Javadoc
/**
 * The Class QuotenOverviewRepresentation.
 */
public class QuotenOverviewRepresentation {
    
    /** The quoten. */
    @JsonProperty
    private List<Float> quoten;
    
    /** The prozent. */
    @JsonProperty
    private List<Float> prozent;
    
    /** The siege. */
    @JsonProperty
    private List<Integer> siege;
    
    /** The niederlagen. */
    @JsonProperty
    private List<Integer> niederlagen;
    
    /** The erwartungswert. */
    @JsonProperty
    private List<Float> erwartungswert;
    
    /**
     * Gets the quoten.
     *
     * @return the quoten
     */
    public List<Float> getQuoten() {
        return quoten;
    }
    
    /**
     * Sets the quoten.
     *
     * @param quoten the new quoten
     */
    public void setQuoten(List<Float> quoten) {
        this.quoten = quoten;
    }
    
    /**
     * Gets the prozent.
     *
     * @return the prozent
     */
    public List<Float> getProzent() {
        return prozent;
    }
    
    /**
     * Sets the prozent.
     *
     * @param prozent the new prozent
     */
    public void setProzent(List<Float> prozent) {
        this.prozent = prozent;
    }
    
    /**
     * Gets the siege.
     *
     * @return the siege
     */
    public List<Integer> getSiege() {
        return siege;
    }
    
    /**
     * Sets the siege.
     *
     * @param siege the new siege
     */
    public void setSiege(List<Integer> siege) {
        this.siege = siege;
    }
    
    /**
     * Gets the niederlagen.
     *
     * @return the niederlagen
     */
    public List<Integer> getNiederlagen() {
        return niederlagen;
    }
    
    /**
     * Sets the niederlagen.
     *
     * @param niederlagen the new niederlagen
     */
    public void setNiederlagen(List<Integer> niederlagen) {
        this.niederlagen = niederlagen;
    }

    
    /**
     * Gets the erwartungswert.
     *
     * @return the erwartungswert
     */
    public List<Float> getErwartungswert() {
        return erwartungswert;
    }

    
    /**
     * Sets the erwartungswert.
     *
     * @param erwartungswert the new erwartungswert
     */
    public void setErwartungswert(List<Float> erwartungswert) {
        this.erwartungswert = erwartungswert;
    }

}
