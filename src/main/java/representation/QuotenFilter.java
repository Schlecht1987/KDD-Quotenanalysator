package representation;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class QuotenFilter {

    /**
     * 1= Alle 2= Heim 3 = Unentschieden 4= Gast
     */
    @JsonProperty
    private int      quotenTyp;
    @JsonProperty
    private String   dateFrom;
    @JsonProperty
    private String   dateUntil;
    @JsonProperty
    private float    quotengenauigkeit;
    @JsonProperty
    private float    quotenRangemin;
    @JsonProperty
    private float    quotenRangeMax;
    @JsonProperty
    private boolean  extendedFilter;
    @JsonProperty
    private String[] spieltyp;
    @JsonProperty
    private String[] mannschaft;

    public String getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }

    public String getDateUntil() {
        return dateUntil;
    }

    public void setDateUntil(String dateUntil) {
        this.dateUntil = dateUntil;
    }

    public float getQuotengenauigkeit() {
        return quotengenauigkeit;
    }

    public void setQuotengenauigkeit(float quotengenauigkeit) {
        this.quotengenauigkeit = quotengenauigkeit;
    }

    public float getQuotenRangemin() {
        return quotenRangemin;
    }

    public void setQuotenRangemin(float quotenRangemin) {
        this.quotenRangemin = quotenRangemin;
    }

    public float getQuotenRangeMax() {
        return quotenRangeMax;
    }

    public void setQuotenRangeMax(float quotenRangeMax) {
        this.quotenRangeMax = quotenRangeMax;
    }

    public boolean isExtendedFilter() {
        return extendedFilter;
    }

    public void setExtendedFilter(boolean extendedFilter) {
        this.extendedFilter = extendedFilter;
    }

    public String[] getSpieltyp() {
        return spieltyp;
    }

    public void setSpieltyp(String[] spieltyp) {
        this.spieltyp = spieltyp;
    }

    public String[] getMannschaft() {
        return mannschaft;
    }

    public void setMannschaft(String[] mannschaft) {
        this.mannschaft = mannschaft;
    }

    public void print() {
        String print = "Quotentyp: "+this.quotenTyp+" Datum von: " + this.getDateFrom() + " bis " + this.getDateUntil() + " Quotengenauigkeit: " + this.quotengenauigkeit
                + " Min Range: " + this.quotenRangemin + " Max Range: " + this.quotenRangeMax + " Extended Filter an: "
                + this.extendedFilter + "  Anzhal Mannschaften: " + mannschaft.length + " ";
        for (int i = 0; i < mannschaft.length; i++) {
            print += "Mannschaft " + (i + 1) + " " + mannschaft[i] + " ";
        }
        print += " Anzahl Spieltyp: " + spieltyp.length + " ";
        for (int i = 0; i < spieltyp.length; i++) {
            print += "spieltyp " + (i + 1) + " " + spieltyp[i] + " ";
        }
        System.out.println(print);
    }

    
    public int getQuotenTyp() {
        return quotenTyp;
    }

    
    public void setQuotenTyp(int quotenTyp) {
        this.quotenTyp = quotenTyp;
    }
}
