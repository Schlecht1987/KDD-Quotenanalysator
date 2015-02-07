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
    

    @OneToMany (mappedBy = "mannschaft_1")
    @Cascade({CascadeType.SAVE_UPDATE})
    private Collection<Begegnung> mannschaft_1 = new ArrayList<Begegnung>();
    
    @OneToMany (mappedBy = "mannschaft_2")
    @Cascade({CascadeType.SAVE_UPDATE})
    private Collection<Begegnung> mannschaft_2 = new ArrayList<Begegnung>();

    
    public int getId() {
        return id;
    }

    
    public void setId(int id) {
        this.id = id;
    }

    
    public String getName() {
        return name;
    }

    
    public void setName(String name) {
        this.name = name;
    }

    
    public Collection<Begegnung> getMannschaft_1() {
        return mannschaft_1;
    }

    
    public void setMannschaft_1(Collection<Begegnung> mannschaft_1) {
        this.mannschaft_1 = mannschaft_1;
    }

    
    public Collection<Begegnung> getMannschaft_2() {
        return mannschaft_2;
    }

    
    public void setMannschaft_2(Collection<Begegnung> mannschaft_2) {
        this.mannschaft_2 = mannschaft_2;
    }
}
