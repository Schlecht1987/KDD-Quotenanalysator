/*
 * 
 */
package representation;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

// TODO: Auto-generated Javadoc
/**
 * The Class TeamsAndGametypes.
 */
@JsonInclude(Include.NON_NULL)
public class TeamsAndGametypes {
    
    /** The mannschaft. */
    @JsonProperty
    private List<String> mannschaft;
    
    /** The spieltyp. */
    @JsonProperty
    private List<String> spieltyp;
    
    /**
     * Gets the mannschaft.
     *
     * @return the mannschaft
     */
    public List<String> getMannschaft() {
        return mannschaft;
    }
    
    /**
     * Sets the mannschaft.
     *
     * @param mannschaft the new mannschaft
     */
    public void setMannschaft(List<String> mannschaft) {
        this.mannschaft = mannschaft;
    }
    
    /**
     * Gets the spieltyp.
     *
     * @return the spieltyp
     */
    public List<String> getSpieltyp() {
        return spieltyp;
    }
    
    /**
     * Sets the spieltyp.
     *
     * @param spieltyp the new spieltyp
     */
    public void setSpieltyp(List<String> spieltyp) {
        this.spieltyp = spieltyp;
    }
    


}
