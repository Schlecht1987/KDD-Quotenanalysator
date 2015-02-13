package test;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.slf4j.LoggerFactory;

import statistics.QuotenStatistik;
import mapping.Begegnung;
import mapping.Quote;
import analyser.DbManage;


public class HQLTest {
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(HQLTest.class);
    private String dateQuery = "";
    
    public HQLTest(){
        
        
    }
    
    public void quotenOverview() {
        String query = "select q.quoteM1, b.mannschaft_1, b.datum "
                +"from Begegnung b, Quote q "
                +"where b.id = q.begegnung "
               +"AND b.datum >= '2014-11-24' AND b.datum <= '2014-12-24' ";
        
        String query1 = "select distinct b "
                +"from Quote q, Begegnung b, Ergebnis e, Spieltyp s "
                +"where b.id = q.begegnung "
                +"AND b.id = e.begegnung "
                +"order by b.id ";
        List<Begegnung> l = (List<Begegnung>) DbManage.getQuery(query1);
  
        for( Begegnung arr : l){
            System.out.println(arr.getId());
        }
        System.out.println(l.size());
    }
    
    public void testQuery(){
        
        String query = "select q.quoteM1 "
                +"from Quote q, Begegnung b, Ergebnis e "
                +"where q.begegnung = b.id "
                +"and b.id = e.begegnung "
                +"and e.sieger != '1'";
        List<?> result =  DbManage.getQuery(query);

        
        for (Iterator iterator = result.iterator(); iterator.hasNext();) {
            Object[] row = (Object[]) iterator.next();
            System.out.println((Float)row[0]);
        }
      
    }
}

/*select b.datum, b.mannschaft_1, b.mannschaft_2, s.name as spieltyp, q.quoteM1, q.quoteX, q.quoteM2, e.m1_h_tore, e.m1_tore, e.m2_h_tore, e.m2_tore, e.sieger
from old_fussballquoten.BEGEGNUNG as b, old_fussballquoten.SPIELTYP as s, old_fussballquoten.QUOTE as q, old_fussballquoten.ERGEBNIS as e
where b.spieltyp_id = s.id AND b.id = q.begegnung_id AND e.begenung_id = b.id
*/