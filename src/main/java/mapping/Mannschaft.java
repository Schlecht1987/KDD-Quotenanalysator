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

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;


// TODO: Auto-generated Javadoc
/**
 * The Class Mannschaft.
 */
@Entity
@Table(name="MANNSCHAFT")
public class Mannschaft {
    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int        id;
    
    /** The name. */
    @Column(name="name")
    private String name;
    

    /** The mannschaft_1. */
    @OneToMany (mappedBy = "mannschaft_1")
    @Cascade({CascadeType.SAVE_UPDATE})
    private Collection<Begegnung> mannschaft_1 = new ArrayList<Begegnung>();
    
    /** The mannschaft_2. */
    @OneToMany (mappedBy = "mannschaft_2")
    @Cascade({CascadeType.SAVE_UPDATE})
    private Collection<Begegnung> mannschaft_2 = new ArrayList<Begegnung>();

    
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
     * Gets the mannschaft_1.
     *
     * @return the mannschaft_1
     */
    public Collection<Begegnung> getMannschaft_1() {
        return mannschaft_1;
    }

    
    /**
     * Sets the mannschaft_1.
     *
     * @param mannschaft_1 the new mannschaft_1
     */
    public void setMannschaft_1(Collection<Begegnung> mannschaft_1) {
        this.mannschaft_1 = mannschaft_1;
    }

    
    /**
     * Gets the mannschaft_2.
     *
     * @return the mannschaft_2
     */
    public Collection<Begegnung> getMannschaft_2() {
        return mannschaft_2;
    }

    
    /**
     * Sets the mannschaft_2.
     *
     * @param mannschaft_2 the new mannschaft_2
     */
    public void setMannschaft_2(Collection<Begegnung> mannschaft_2) {
        this.mannschaft_2 = mannschaft_2;
    }
}
