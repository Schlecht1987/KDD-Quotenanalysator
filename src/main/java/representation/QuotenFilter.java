package representation;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class QuotenFilter {
    @JsonProperty
    private String from;
    @JsonProperty
    private String until;
    @JsonProperty
    private String spieltyp;
    @JsonProperty
    private String wettanbieter;
    @JsonProperty
    private float quotenRange;
    
    public String getFrom() {
        return from;
    }
    
    public void setFrom(String from) {
        this.from = from;
    }
    
    public String getUntil() {
        return until;
    }
    
    public void setUntil(String until) {
        this.until = until;
    }
    
    public String getSpieltyp() {
        return spieltyp;
    }
    
    public void setSpieltyp(String spieltyp) {
        this.spieltyp = spieltyp;
    }
    
    public String getWettanbieter() {
        return wettanbieter;
    }
    
    public void setWettanbieter(String wettanbieter) {
        this.wettanbieter = wettanbieter;
    }
    
    public float getQuotenRange() {
        return quotenRange;
    }
    
    public void setQuotenRange(float quotenRange) {
        this.quotenRange = quotenRange;
    }

}
