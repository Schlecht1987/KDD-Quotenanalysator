/*
 * 
 */
package mapping;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

// TODO: Auto-generated Javadoc
/**
 * The Class Ergebnis.
 */
@Entity
@Table (name="ERGEBNIS")
public class Ergebnis {
    
    /** The id. */
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    
    /** The m1_tore. */
    @JoinColumn(name="m1_tore")
    private int m1_tore;
    
    /** The m2_tore. */
    @JoinColumn(name="m2_tore")
    private int m2_tore;
    
    /** The m1_h_tore. */
    @JoinColumn(name="m1_h_tore")
    private int m1_h_tore;
    
    /** The m2_h_tore. */
    @JoinColumn(name="m2_h_tore")
    private int m2_h_tore;
    
    /** The sieger. */
    @JoinColumn(name="sieger")
    private String sieger;
    
    /** The begegnung. */
    @OneToOne
    @JoinColumn(name="begenung_id")
    private Begegnung begegnung;

    
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
     * Gets the m1_tore.
     *
     * @return the m1_tore
     */
    public int getM1_tore() {
        return m1_tore;
    }

    
    /**
     * Sets the m1_tore.
     *
     * @param m1_tore the new m1_tore
     */
    public void setM1_tore(int m1_tore) {
        this.m1_tore = m1_tore;
    }

    
    /**
     * Gets the m2_tore.
     *
     * @return the m2_tore
     */
    public int getM2_tore() {
        return m2_tore;
    }

    
    /**
     * Sets the m2_tore.
     *
     * @param m2_tore the new m2_tore
     */
    public void setM2_tore(int m2_tore) {
        this.m2_tore = m2_tore;
    }

    
    /**
     * Gets the m1_h_tore.
     *
     * @return the m1_h_tore
     */
    public int getM1_h_tore() {
        return m1_h_tore;
    }

    
    /**
     * Sets the m1_h_tore.
     *
     * @param m1_h_tore the new m1_h_tore
     */
    public void setM1_h_tore(int m1_h_tore) {
        this.m1_h_tore = m1_h_tore;
    }

    
    /**
     * Gets the m2_h_tore.
     *
     * @return the m2_h_tore
     */
    public int getM2_h_tore() {
        return m2_h_tore;
    }

    
    /**
     * Sets the m2_h_tore.
     *
     * @param m2_h_tore the new m2_h_tore
     */
    public void setM2_h_tore(int m2_h_tore) {
        this.m2_h_tore = m2_h_tore;
    }

    
    /**
     * Gets the sieger.
     *
     * @return the sieger
     */
    public String getSieger() {
        return sieger;
    }

    
    /**
     * Sets the sieger.
     *
     * @param sieger the new sieger
     */
    public void setSieger(String sieger) {
        this.sieger = sieger;
    }

    
    /**
     * Gets the begegnung.
     *
     * @return the begegnung
     */
    public Begegnung getBegegnung() {
        return begegnung;
    }

    
    /**
     * Sets the begegnung.
     *
     * @param begegnung the new begegnung
     */
    public void setBegegnung(Begegnung begegnung) {
        this.begegnung = begegnung;
    }

    
   


}
