package representation;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;


public class QuotenOverviewRepresentation {
    @JsonProperty
    private List<Float> quoten;
    @JsonProperty
    private List<Float> prozent;
    @JsonProperty
    private List<Integer> siege;
    @JsonProperty
    private List<Integer> niederlagen;
    @JsonProperty
    private List<Float> erwartungswert;
    
    public List<Float> getQuoten() {
        return quoten;
    }
    
    public void setQuoten(List<Float> quoten) {
        this.quoten = quoten;
    }
    
    public List<Float> getProzent() {
        return prozent;
    }
    
    public void setProzent(List<Float> prozent) {
        this.prozent = prozent;
    }
    
    public List<Integer> getSiege() {
        return siege;
    }
    
    public void setSiege(List<Integer> siege) {
        this.siege = siege;
    }
    
    public List<Integer> getNiederlagen() {
        return niederlagen;
    }
    
    public void setNiederlagen(List<Integer> niederlagen) {
        this.niederlagen = niederlagen;
    }

    
    public List<Float> getErwartungswert() {
        return erwartungswert;
    }

    
    public void setErwartungswert(List<Float> erwartungswert) {
        this.erwartungswert = erwartungswert;
    }

}
