package statistics;

import org.slf4j.LoggerFactory;

public class QuotenInfo implements Comparable<QuotenInfo> {

    private float quote;
    private int   siege       = 0;
    private int   niederlagen = 0;
    
    private boolean hasValues = false;

    public QuotenInfo(float quote) {
        this.quote = quote;
    }

    public float getQuote() {
        return quote;
    }

    public void setQuote(float quote) {
        this.quote = quote;
    }

    public int getSiege() {
        return siege;
    }

    public void setSiege(int siege) {
hasValues = true;

        this.siege = siege;
    }

    public int getNiederlagen() {
        return niederlagen;
    }

    public void setNiederlagen(int niederlagen) {

            hasValues = true;
       
        this.niederlagen = niederlagen;
    }

    public String printQuotenInfo() {
        return "Quote: " + quote + " Siege: " + siege + " Niederlagen: " + niederlagen;
    }

    @Override
    public int compareTo(QuotenInfo q) {
        if (q.getQuote() < this.getQuote()) {
            return 1;
        }
        if (q.getQuote() > this.getQuote()) {
            return -1;
        }
        // TODO Auto-generated method stub
        return 0;
    }

    
    public boolean isHasValues() {
        return hasValues;
    }

    
    public void setHasValues(boolean hasValues) {
        this.hasValues = hasValues;
    }

}
