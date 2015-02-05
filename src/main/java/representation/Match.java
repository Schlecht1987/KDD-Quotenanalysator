package representation;





import com.fasterxml.jackson.annotation.JsonProperty;



public class Match {
    @JsonProperty
    private int        id;
    @JsonProperty
    private String       datum;   
    @JsonProperty
    private String spieltyp ;
    @JsonProperty
    private String mannschaft_1;    
    @JsonProperty
    private String mannschaft_2;
    @JsonProperty
    private Boolean ergebnis;

    
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



}
