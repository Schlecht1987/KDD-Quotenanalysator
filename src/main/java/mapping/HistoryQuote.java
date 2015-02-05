package mapping;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

// TODO: Auto-generated Javadoc
/**
 * The Class HistoryQuote.
 */
@Entity
@Table (name="HISTORY_QUOTE")
public class HistoryQuote {
    
    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    /** The quote1. */
    private float quote1;
    
    /** The quote x. */
    private float quoteX;
    
    /** The quote2. */
    private float quote2;
    
    /** The datum. */
    @Temporal(TemporalType.TIMESTAMP)
    private Date       datum;
    
    /** The quote. */
    @ManyToOne
    @JoinColumn(name="quote_id")
    private Quote quote;
    
    /**
     * Gets the id.
     *
     * @return the id
     */
    public int getId() {
        return id;
    }
    
    /**
     * Sets the id.
     *
     * @param id the new id
     */
    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * Gets the quote1.
     *
     * @return the quote1
     */
    public float getQuote1() {
        return quote1;
    }
    
    /**
     * Sets the quote1.
     *
     * @param quote1 the new quote1
     */
    public void setQuote1(float quote1) {
        this.quote1 = quote1;
    }
    
    /**
     * Gets the quote x.
     *
     * @return the quote x
     */
    public float getQuoteX() {
        return quoteX;
    }
    
    /**
     * Sets the quote x.
     *
     * @param quoteX the new quote x
     */
    public void setQuoteX(float quoteX) {
        this.quoteX = quoteX;
    }
    
    /**
     * Gets the quote2.
     *
     * @return the quote2
     */
    public float getQuote2() {
        return quote2;
    }
    
    /**
     * Sets the quote2.
     *
     * @param quote2 the new quote2
     */
    public void setQuote2(float quote2) {
        this.quote2 = quote2;
    }
    
    /**
     * Gets the datum.
     *
     * @return the datum
     */
    public Date getDatum() {
        return datum;
    }
    
    /**
     * Sets the datum.
     *
     * @param datum the new datum
     */
    public void setDatum(Date datum) {
        this.datum = datum;
    }
    
    /**
     * Gets the quote.
     *
     * @return the quote
     */
    public Quote getQuote() {
        return quote;
    }
    
    /**
     * Sets the quote.
     *
     * @param quote the new quote
     */
    public void setQuote(Quote quote) {
        this.quote = quote;
    }
    
 

}
