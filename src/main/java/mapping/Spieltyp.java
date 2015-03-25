/*
 * 
 */
package mapping;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

// TODO: Auto-generated Javadoc
/**
 * The Class Spieltyp.
 */
@Entity
@Table(name="SPIELTYP")
public class Spieltyp {
    
    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int        id;
    
    /** The name. */
    @Column(name="name")
    private String name;
    
    /** The begegnung. */
    @OneToMany (mappedBy = "spieltyp")
    private Collection<Begegnung> begegnung = new ArrayList<Begegnung>();

    /**
     * Instantiates a new spieltyp.
     */
    public Spieltyp(){
        
    }
    
    /**
     * Instantiates a new spieltyp.
     *
     * @param name the name
     */
    public Spieltyp(String name){
        this.name = name;
    }
    
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
     * Gets the name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    
    /**
     * Sets the name.
     *
     * @param name the new name
     */
    public void setName(String name) {
        this.name = name;
    }

    
    /**
     * Gets the begegnung.
     *
     * @return the begegnung
     */
    public Collection<Begegnung> getBegegnung() {
        return begegnung;
    }

    
    /**
     * Sets the begegnung.
     *
     * @param begegnung the new begegnung
     */
    public void setBegegnung(Collection<Begegnung> begegnung) {
        this.begegnung = begegnung;
    }
    


}
