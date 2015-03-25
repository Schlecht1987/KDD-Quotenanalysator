/*
 * 
 */
package statistics;

import org.slf4j.LoggerFactory;

// TODO: Auto-generated Javadoc
/**
 * The Class QuotenInfo.
 */
public class QuotenInfo implements Comparable<QuotenInfo> {

    /** The quote. */
    private float quote;
    
    /** The siege. */
    private int   siege       = 0;
    
    /** The niederlagen. */
    private int   niederlagen = 0;   
    
    /** The has values. */
    private boolean hasValues = false;
    
    
    
    /**
     * Instantiates a new quoten info.
     *
     * @param quote the quote
     */
    public QuotenInfo(float quote) {
        this.quote = quote;
    }

    /**
     * Gets the quote.
     *
     * @return the quote
     */
    public float getQuote() {
        return quote;
    }

    /**
     * Sets the quote.
     *
     * @param quote the new quote
     */
    public void setQuote(float quote) {
        this.quote = quote;
    }

    /**
     * Gets the siege.
     *
     * @return the siege
     */
    public int getSiege() {
        return siege;
    }

    /**
     * Sets the siege.
     *
     * @param siege the new siege
     */
    public void setSiege(int siege) {
hasValues = true;

        this.siege = siege;
    }

    /**
     * Gets the niederlagen.
     *
     * @return the niederlagen
     */
    public int getNiederlagen() {
        return niederlagen;
    }

    /**
     * Sets the niederlagen.
     *
     * @param niederlagen the new niederlagen
     */
    public void setNiederlagen(int niederlagen) {

            hasValues = true;
       
        this.niederlagen = niederlagen;
    }

    /**
     * Prints the quoten info.
     *
     * @return the string
     */
    public String printQuotenInfo() {
        return "Quote: " + quote + " Siege: " + siege + " Niederlagen: " + niederlagen;
    }

    /* (non-Javadoc)
     * @see java.lang.Comparable#compareTo(java.lang.Object)
     */
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

    
    /**
     * Checks if is checks for values.
     *
     * @return true, if is checks for values
     */
    public boolean isHasValues() {
        return hasValues;
    }

    
    /**
     * Sets the checks for values.
     *
     * @param hasValues the new checks for values
     */
    public void setHasValues(boolean hasValues) {
        this.hasValues = hasValues;
    }

}
