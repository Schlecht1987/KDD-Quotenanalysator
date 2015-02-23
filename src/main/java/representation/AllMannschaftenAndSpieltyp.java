package representation;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class AllMannschaftenAndSpieltyp {
    
    @JsonProperty
    private List<String> mannschaft;
    @JsonProperty
    private List<String> spieltyp;
    
    public List<String> getMannschaft() {
        return mannschaft;
    }
    
    public void setMannschaft(List<String> mannschaft) {
        this.mannschaft = mannschaft;
    }
    
    public List<String> getSpieltyp() {
        return spieltyp;
    }
    
    public void setSpieltyp(List<String> spieltyp) {
        this.spieltyp = spieltyp;
    }
    


}
