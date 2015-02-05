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
    
    @JoinColumn(name="m1_tore")
    private int m1_tore;
    
    @JoinColumn(name="m2_tore")
    private int m2_tore;
    
    @JoinColumn(name="m1_h_tore")
    private int m1_h_tore;
    
    @JoinColumn(name="m2_h_tore")
    private int m2_h_tore;
    
    @JoinColumn(name="sieger")
    private String sieger;
    
    @OneToOne
    @JoinColumn(name="begenung_id")
    private Begegnung begegnung;

    
    public int getId() {
        return id;
    }

    
    public void setId(int id) {
        this.id = id;
    }

    
    public int getM1_tore() {
        return m1_tore;
    }

    
    public void setM1_tore(int m1_tore) {
        this.m1_tore = m1_tore;
    }

    
    public int getM2_tore() {
        return m2_tore;
    }

    
    public void setM2_tore(int m2_tore) {
        this.m2_tore = m2_tore;
    }

    
    public int getM1_h_tore() {
        return m1_h_tore;
    }

    
    public void setM1_h_tore(int m1_h_tore) {
        this.m1_h_tore = m1_h_tore;
    }

    
    public int getM2_h_tore() {
        return m2_h_tore;
    }

    
    public void setM2_h_tore(int m2_h_tore) {
        this.m2_h_tore = m2_h_tore;
    }

    
    public String getSieger() {
        return sieger;
    }

    
    public void setSieger(String sieger) {
        this.sieger = sieger;
    }

    
    public Begegnung getBegegnung() {
        return begegnung;
    }

    
    public void setBegegnung(Begegnung begegnung) {
        this.begegnung = begegnung;
    }

    
   


}
