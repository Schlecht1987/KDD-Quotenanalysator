package mapping;



import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonProperty;







// TODO: Auto-generated Javadoc
/**
 * The Class Begegnung.
 */
@Entity
@Table(name="BEGEGNUNG" )
public class Begegnung {

    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int        id;

    /** The datum. */
    @Temporal(TemporalType.TIMESTAMP)
    private Date       datum;
    
    /** The spieltyp. */
    @ManyToOne
    private Spieltyp spieltyp ;
    

    /** The mannschaft_1. */
    @ManyToOne
    private Mannschaft mannschaft_1;
    

    /** The mannschaft_2. */
    @ManyToOne
    private Mannschaft mannschaft_2;
    
    /** The quote. */
    @OneToMany (mappedBy = "begegnung")
    private Collection<Quote> quote = new ArrayList<Quote>();

    
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
     * Gets the spieltyp.
     *
     * @return the spieltyp
     */
    public Spieltyp getSpieltyp() {
        return spieltyp;
    }

    
    /**
     * Sets the spieltyp.
     *
     * @param spieltyp the new spieltyp
     */
    public void setSpieltyp(Spieltyp spieltyp) {
        this.spieltyp = spieltyp;
    }

    
  

    
    /**
     * Gets the quote.
     *
     * @return the quote
     */
    public Collection<Quote> getQuote() {
        return quote;
    }

    
    /**
     * Sets the quote.
     *
     * @param quote the new quote
     */
    public void setQuote(Collection<Quote> quote) {
        this.quote = quote;
    }


    
    public Mannschaft getMannschaft_1() {
        return mannschaft_1;
    }


    
    public void setMannschaft_1(Mannschaft mannschaft_1) {
        this.mannschaft_1 = mannschaft_1;
    }


    
    public Mannschaft getMannschaft_2() {
        return mannschaft_2;
    }


    
    public void setMannschaft_2(Mannschaft mannschaft_2) {
        this.mannschaft_2 = mannschaft_2;
    }

}
